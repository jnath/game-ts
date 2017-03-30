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
    static initState: StateConfig;
    private static _instance;
    private _current;
    private _middlewares;
    private _config;
    private _initState;
    constructor(initState: StateConfig);
    static getInstance(): StateManager;
    readonly current: string;
    configuration(config: StatesConfig): this;
    private runMiddleware(data, done);
    private filter(filter, data);
    private runNextMiddleWare(data, i, done);
    use(middleware: Middleware, filter?: MiddlewareFilter): this;
    start(done?: (err: Error) => void): void;
    next(done?: (err: Error) => void): void;
    goto(state: string, done?: (err: Error) => void): void;
}
