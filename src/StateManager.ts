
export interface Middleware {
  (data: MiddlewareData, next: (err?: Error) => void): void;
}

export interface MiddlewareData {
  currentState: string;
  nextState: string;
  [index: string]: any;
}

export interface StateConfig {
  name: string;
  next?: string;
}

export interface StatesConfig {
  states: Array<StateConfig>;
}

export interface MiddlewareFilter {
  currentState?: string;
  nextState?: string;
  [index: string]: any;
}

export default class StateManager {

  static initState: StateConfig = { name: 'init' };

  private static _instance: StateManager;

  private _current: number = 0;

  private _middlewares: Array<Middleware> = [];

  private _config: StatesConfig = {states: []};

  private _initState: StateConfig;

  constructor(initState: StateConfig) {
    if (StateManager._instance) {
      throw new Error('Error: Instantiation failed: Use StateManager.getInstance() instead of new.');
    }
    this._initState = initState;
  }

  public static getInstance(): StateManager {
    StateManager._instance = StateManager._instance || new StateManager(StateManager.initState);
    return StateManager._instance;
  }

  get current(){
    return this._config.states[this._current].name;
  }

  configuration(config: StatesConfig): this {
    this._config = config;
    this._config.states = [this._initState].concat(this._config.states);
    return this;
  }

  private runMiddleware(data: MiddlewareData, done: (err?: Error) => void) {
    if (!this._middlewares || this._middlewares.length === 0) {
        done();
    }else {
        this.runNextMiddleWare(data, 0, done);
    }
  }

  private filter(filter: MiddlewareFilter, data: MiddlewareData): boolean {
    let found: boolean = false;
    let dataKeys: Array<string> = Object.keys(data);
    for (let i in dataKeys) {
      let key: string = dataKeys[i];
      if (filter[key] && filter[key] === data[key]) {
        found = true;
        break;
      }
    }
    return found;
  }

  private runNextMiddleWare(data: MiddlewareData, i: number, done: (err?: Error) => void) {
    if (i >= this._middlewares.length) {
      return done && done();
    }


    let next: (err?: Error) => void = (err?: Error) => {
      if (err) {
        done && done(err);
      }else {
        this.runNextMiddleWare(data, i + 1, done);
      }
    };

    let middleware: Middleware = this._middlewares[i];
    if (middleware['filter']) {
      let found: boolean = this.filter(middleware['filter'], data);
      if (!found) {
        return next();
      }
    }

    try {
      middleware(data, next);
    }catch (e) {
      next(e);
    }
  }

  use(middleware: Middleware, filter?: MiddlewareFilter): this {
    if (filter) {
      middleware['filter'] = filter;
    }
    this._middlewares.push(middleware);
    return this;
  }

  start(done?: (err: Error) => void) {
    this.next(done);
  }

  next(done?: (err: Error) => void) {
    let nextState: string;
    if (this._config.states[this._current].next) {
      nextState = this._config.states[this._current].next;
    }else if (this._config.states[this._current + 1]) {
      nextState = this._config.states[this._current + 1].name;
    }else {
      nextState = this._config.states[0].name;
    }

    this.goto(nextState, done);
  }


  goto(state: string, done?: (err: Error) => void) {
    console.log(this._config);
    let data: MiddlewareData = {
      currentState: this._config.states[this._current].name,
      nextState: state
    };
    let stateConfig: StateConfig = this._config.states.filter((stateConfig: StateConfig) => stateConfig.name === state).shift();
    if (stateConfig) {
      this._current = this._config.states.indexOf(stateConfig);
      return this.runMiddleware(data, done);
    }
    done(Error(`Cannot find name ${state} in config.states`));
  }

}