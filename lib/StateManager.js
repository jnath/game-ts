System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StateManager;
    return {
        setters:[],
        execute: function() {
            StateManager = (function () {
                function StateManager(initState) {
                    this._current = 0;
                    this._middlewares = [];
                    this._config = { states: [] };
                    if (StateManager._instance) {
                        throw new Error('Error: Instantiation failed: Use StateManager.getInstance() instead of new.');
                    }
                    this._initState = initState;
                }
                StateManager.getInstance = function () {
                    StateManager._instance = StateManager._instance || new StateManager(StateManager.initState);
                    return StateManager._instance;
                };
                Object.defineProperty(StateManager.prototype, "current", {
                    get: function () {
                        return this._config.states[this._current].name;
                    },
                    enumerable: true,
                    configurable: true
                });
                StateManager.prototype.configuration = function (config) {
                    this._config = config;
                    this._config.states = [this._initState].concat(this._config.states);
                    return this;
                };
                StateManager.prototype.runMiddleware = function (data, done) {
                    if (!this._middlewares || this._middlewares.length === 0) {
                        done();
                    }
                    else {
                        this.runNextMiddleWare(data, 0, done);
                    }
                };
                StateManager.prototype.filter = function (filter, data) {
                    var found = false;
                    var dataKeys = Object.keys(data);
                    for (var i in dataKeys) {
                        var key = dataKeys[i];
                        if (filter[key] && filter[key] === data[key]) {
                            found = true;
                            break;
                        }
                    }
                    return found;
                };
                StateManager.prototype.runNextMiddleWare = function (data, i, done) {
                    var _this = this;
                    if (i >= this._middlewares.length) {
                        return done && done();
                    }
                    var next = function (err) {
                        if (err) {
                            done && done(err);
                        }
                        else {
                            _this.runNextMiddleWare(data, i + 1, done);
                        }
                    };
                    var middleware = this._middlewares[i];
                    if (middleware['filter']) {
                        var found = this.filter(middleware['filter'], data);
                        if (!found) {
                            return next();
                        }
                    }
                    try {
                        middleware(data, next);
                    }
                    catch (e) {
                        next(e);
                    }
                };
                StateManager.prototype.use = function (middleware, filter) {
                    if (filter) {
                        middleware['filter'] = filter;
                    }
                    this._middlewares.push(middleware);
                    return this;
                };
                StateManager.prototype.start = function (done) {
                    this.next(done);
                };
                StateManager.prototype.next = function (done) {
                    var nextState;
                    if (this._config.states[this._current].next) {
                        nextState = this._config.states[this._current].next;
                    }
                    else if (this._config.states[this._current + 1]) {
                        nextState = this._config.states[this._current + 1].name;
                    }
                    else {
                        nextState = this._config.states[0].name;
                    }
                    this.goto(nextState, done);
                };
                StateManager.prototype.goto = function (state, done) {
                    console.log(this._config);
                    var data = {
                        currentState: this._config.states[this._current].name,
                        nextState: state
                    };
                    var stateConfig = this._config.states.filter(function (stateConfig) { return stateConfig.name === state; }).shift();
                    if (stateConfig) {
                        this._current = this._config.states.indexOf(stateConfig);
                        return this.runMiddleware(data, done);
                    }
                    done(Error("Cannot find name " + state + " in config.states"));
                };
                StateManager.initState = { name: 'init' };
                return StateManager;
            }());
            exports_1("default", StateManager);
        }
    }
});
