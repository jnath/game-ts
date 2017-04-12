!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[m][e]}})}function r(e){var t;if(e&&e.__esModule){t={};for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.__useDefault&&delete t.__useDefault,t.__esModule=!0}else{if("[object Module]"===Object.prototype.toString.call(e)||"undefined"!=typeof System&&System.isModule&&System.isModule(e))return e;t={default:e,__useDefault:!0}}return new o(t)}function o(e){Object.defineProperty(this,m,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(v(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return d(t,r),a(t,r,[]),t.module}function d(e,t){if(!t.depLoads){t.declare&&i(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&d(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function i(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,d=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var d=0;d<n.length;d++)n[d](o);return u=!1,t}},{id:t.key});"function"!=typeof d?(r.setters=d.setters,r.execute=d.execute):(r.setters=[],r.execute=d)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:{},__useDefault:!0},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,d=t[n],i=d.linkRecord;return u=i?-1===r.indexOf(d)?a(d,i,r):i.moduleObj:d.module,u.__useDefault?u.default:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var d=0;d<r.deps.length;d++){var i=r.depLoads[d],l=i.linkRecord;l&&-1===n.indexOf(i)&&(u=a(i,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=e},get:function(){return c.default}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var d=0;d<r.deps.length;d++)p(r.deps[d]);var m=r.execute.call(e,p,c.default,f);if(void 0!==m?c.default=m:f.exports!==c.default&&(c.default=f.exports),c.default&&c.default.__esModule)for(var v in c.default)Object.hasOwnProperty.call(c.default,v)&&"default"!==v&&(c[v]=c.default[v])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var d=0;d<t.importerSetters.length;d++)t.importerSetters[d](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},m="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,d){return function(i){i(function(i){var s={_nodeRequire:v,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));d(s);var m=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?m.default:(m instanceof o&&Object.defineProperty(m,"__esModule",{value:!0}),m)})}}}("undefined"!=typeof self?self:global)

(["a"], ["10","e"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("b", ["c", "d", "e"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var Padding_1, Layout_1, textfield_1, Stat, Button;
    return {
        setters: [function (Padding_1_1) {
            Padding_1 = Padding_1_1;
        }, function (Layout_1_1) {
            Layout_1 = Layout_1_1;
        }, function (textfield_1_1) {
            textfield_1 = textfield_1_1;
        }],
        execute: function () {
            (function (Stat) {
                Stat[Stat["default"] = 0] = "default";
                Stat[Stat["down"] = 1] = "down";
                Stat[Stat["up"] = 2] = "up";
                Stat[Stat["over"] = 3] = "over";
                Stat[Stat["out"] = 4] = "out";
                Stat[Stat["disabled"] = 5] = "disabled";
            })(Stat || (Stat = {}));
            exports_1("Stat", Stat);
            Button = function (_super) {
                __extends(Button, _super);
                function Button(stats, padding) {
                    var _this = _super.call(this) || this;
                    _this.stats = {};
                    _this._defaultTextStyle = {};
                    _this._padding = new Padding_1.default(20, 20, 20, 20);
                    _this.stats = stats;
                    _this._defaultTextStyle = _this.stats[Stat[Stat.default]].textStyle;
                    _this._padding = padding || _this._padding;
                    _this.interactive = true;
                    _this.buttonMode = true;
                    _this.on('mousedown', function () {
                        return _this.stat = Stat.down;
                    });
                    _this.on('mouseup', function () {
                        return _this.stat = Stat.up;
                    });
                    _this.on('mouseover', function () {
                        return _this.stat = Stat.over;
                    });
                    _this.on('mouseout', function () {
                        return _this.stat = Stat.out;
                    });
                    for (var key in _this.stats) {
                        if (!_this.stats[key]) {
                            continue;
                        }
                        _this.stats[key].background.visible = false;
                        _this.addChild(_this.stats[key].background);
                    }
                    _this.stat = Stat.default;
                    _this.on('resize', function () {
                        return _this.onResize();
                    });
                    return _this;
                }
                Button.prototype.onResize = function () {
                    for (var key in this.stats) {
                        this.stats[key].background.width = this._width;
                        this.stats[key].background.height = this._height;
                    }
                };
                Object.defineProperty(Button.prototype, "defaultTextStyle", {
                    get: function () {
                        return this._defaultTextStyle;
                    },
                    set: function (value) {
                        var _this = this;
                        this._defaultTextStyle = value;
                        this.textfield.once('updated', function () {
                            return _this.updateResize();
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Button.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        var _this = this;
                        this._text = value;
                        if (!this.textfield) {
                            this.addTextField();
                        }
                        this.textfield.once('updated', function () {
                            return _this.updateResize();
                        });
                        this.textfield.text = this._text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Button.prototype.updateResize = function () {
                    this.resize(this.textfield.width + this._padding.left + this._padding.right, this.textfield.height + this._padding.top + this._padding.bottom);
                };
                Object.defineProperty(Button.prototype, "disabled", {
                    get: function () {
                        return this._disabled;
                    },
                    set: function (value) {
                        this._disabled = value;
                        this.setStat(this._disabled ? Stat.disabled : this.stat);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Button.prototype, "stat", {
                    get: function () {
                        return this._stat;
                    },
                    set: function (value) {
                        this._stat = value;
                        if (this.currentStat === this._stat) {
                            return;
                        }
                        this.setStat(this._stat);
                    },
                    enumerable: true,
                    configurable: true
                });
                Button.prototype.setStat = function (stat) {
                    var _this = this;
                    var lastStat = stat;
                    if (this.stats[Stat[this.currentStat]]) {
                        this.stats[Stat[this.currentStat]].background.visible = false;
                    }
                    this.currentStat = stat;
                    if (!this.stats[Stat[this.currentStat]]) {
                        return this.stat = Stat.default;
                    }
                    this.stats[Stat[this.currentStat]].background.visible = true;
                    if (this.stats[Stat[this.currentStat]].textStyle && !this.textfield) {
                        this.addTextField();
                    }
                    this.textfield.once('updated', function () {
                        return _this.updateResize();
                    });
                    this.textfield.styles = Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle);
                    this.emit('updateStat', { lastStat: lastStat, currentStat: this.currentStat });
                };
                Button.prototype.addTextField = function () {
                    var _this = this;
                    this.textfield = new textfield_1.default(' ', Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
                    this.textfield.dock = Layout_1.Dock.CENTER | Layout_1.Dock.MIDDLE;
                    this.addChild(this.textfield);
                    setTimeout(function () {
                        return _this.setStat(_this.currentStat);
                    }, 0);
                };
                Button.prototype.add = function (stat, texture, textStyle) {
                    texture.visible = false;
                    this.stats[Stat[stat]].background = texture;
                    this.stats[Stat[stat]].textStyle = textStyle;
                    this.addChild(texture);
                };
                return Button;
            }(Layout_1.default);
            exports_1("default", Button);
        }
    };
});
$__System.register("f", ["10", "11", "d"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Layout_1, Panel;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }, function (Scale9Grid_1_1) {
            Scale9Grid_1 = Scale9Grid_1_1;
        }, function (Layout_1_1) {
            Layout_1 = Layout_1_1;
        }],
        execute: function () {
            Panel = function (_super) {
                __extends(Panel, _super);
                function Panel(foreground, background) {
                    var _this = _super.call(this) || this;
                    _this.background = new Scale9Grid_1.default(background, new pixi_js_1.Rectangle(20, 20, background.width - 40, background.height - 40));
                    _this.addChild(_this.background);
                    _this.foreground = new Scale9Grid_1.default(foreground, new pixi_js_1.Rectangle(20, 20, background.width - 40, background.height - 40));
                    _this.addChild(_this.foreground);
                    _this.on('resize', function () {
                        return _this.onResize();
                    });
                    _this.resize(Math.max(_this.background.width, _this.foreground.width), Math.max(_this.background.height, _this.foreground.height));
                    return _this;
                }
                Panel.prototype.onResize = function () {
                    this.foreground.width = this.width;
                    this.foreground.height = this.height;
                    this.background.width = this._width;
                    this.background.height = this._height;
                };
                return Panel;
            }(Layout_1.default);
            exports_1("default", Panel);
        }
    };
});
$__System.register("c", ["10"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, EventEmitter, Padding;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }],
        execute: function () {
            EventEmitter = pixi_js_1.utils.EventEmitter;
            Padding = function (_super) {
                __extends(Padding, _super);
                function Padding(top, bottom, left, right) {
                    if (top === void 0) {
                        top = 0;
                    }
                    if (bottom === void 0) {
                        bottom = 0;
                    }
                    if (left === void 0) {
                        left = 0;
                    }
                    if (right === void 0) {
                        right = 0;
                    }
                    var _this = _super.call(this) || this;
                    _this._top = top;
                    _this._bottom = bottom + top;
                    _this._left = left;
                    _this._right = right + left;
                    return _this;
                }
                Object.defineProperty(Padding.prototype, "top", {
                    get: function () {
                        return this._top;
                    },
                    set: function (value) {
                        this._top = value;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "bottom", {
                    get: function () {
                        return this._bottom;
                    },
                    set: function (value) {
                        this._bottom = value + this._top;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "left", {
                    get: function () {
                        return this._left;
                    },
                    set: function (value) {
                        this._left = value;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "right", {
                    get: function () {
                        return this._right;
                    },
                    set: function (value) {
                        this._right = value + this.right;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                return Padding;
            }(EventEmitter);
            exports_1("default", Padding);
        }
    };
});
$__System.register("12", ["10", "11", "c"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Padding_1, ProgressBar;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }, function (Scale9Grid_1_1) {
            Scale9Grid_1 = Scale9Grid_1_1;
        }, function (Padding_1_1) {
            Padding_1 = Padding_1_1;
        }],
        execute: function () {
            ProgressBar = function (_super) {
                __extends(ProgressBar, _super);
                function ProgressBar(padding) {
                    if (padding === void 0) {
                        padding = new Padding_1.default();
                    }
                    var _this = _super.call(this) || this;
                    _this.padding = padding;
                    _this._percent = 0;
                    _this.masker = new pixi_js_1.Graphics();
                    _this.bg = pixi_js_1.Sprite.fromImage('progress-bg');
                    _this.addChild(_this.bg);
                    _this.progress = new Scale9Grid_1.default(pixi_js_1.Texture.fromImage('progress-percent'));
                    _this.addChild(_this.progress);
                    // this.progress.mask = this.masker;
                    // this.progress.addChild(this.masker);
                    _this.padding.on('update', function () {
                        return _this.updatePosition();
                    });
                    _this.updatePosition();
                    return _this;
                }
                Object.defineProperty(ProgressBar.prototype, "percent", {
                    get: function () {
                        return this._percent;
                    },
                    set: function (value) {
                        this._percent = value;
                        if (this._percent > 1) {
                            this._percent = 1;
                            return;
                        }
                        this.progress.scaleX = this._percent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ProgressBar.prototype.updatePosition = function () {
                    this.progress.x = this.padding.left;
                    this.progress.y = this.padding.top;
                    this.progress.width = this.width - this.padding.right;
                    this.progress.height = this.height - this.padding.bottom;
                    this.masker.clear();
                    this.masker.beginFill(0x000000, 0);
                    this.masker.drawRect(0, 0, this.progress.width, this.progress.height);
                    this.masker.endFill();
                };
                return ProgressBar;
            }(pixi_js_1.Container);
            exports_1("default", ProgressBar);
        }
    };
});
$__System.register("d", ["10"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Dock, Layout;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }],
        execute: function () {
            (function (Dock) {
                Dock[Dock["NONE"] = 1] = "NONE";
                Dock[Dock["TOP"] = 2] = "TOP";
                Dock[Dock["BOTTOM"] = 4] = "BOTTOM";
                Dock[Dock["LEFT"] = 8] = "LEFT";
                Dock[Dock["RIGHT"] = 16] = "RIGHT";
                Dock[Dock["CENTER"] = 32] = "CENTER";
                Dock[Dock["MIDDLE"] = 64] = "MIDDLE";
            })(Dock || (Dock = {}));
            exports_1("Dock", Dock);
            pixi_js_1.Container.prototype.dock = Dock.NONE;
            pixi_js_1.Container.prototype.dockPivot = function (x, y) {
                this.pivot.x = x;
                this.pivot.y = y;
                this.dockX = this.pivot.x;
                this.dockY = this.pivot.y;
            };
            // Container.prototype['_dockX'] = 0;
            // Object.defineProperty(Container.prototype, 'dockX', {
            //     get: function () { return this._dockX; },
            //     set: function (value) {
            //         this._dockX = value;
            //         if (this.parent && this.parent.childDock){
            //           this.parent.childDock(this);
            //         }
            //     },
            //     enumerable: true,
            //     configurable: true
            // });
            // Container.prototype['_dockY'] = 0;
            // Object.defineProperty(Container.prototype, 'dockY', {
            //     get: function () { return this._dockX; },
            //     set: function (value) {
            //         this._dockY = value;
            //         if (this.parent && this.parent.childDock){
            //           this.parent.childDock(this);
            //         }
            //     },
            //     enumerable: true,
            //     configurable: true
            // });
            Layout = function (_super) {
                __extends(Layout, _super);
                function Layout() {
                    var _this = _super.call(this) || this;
                    _this._scaleX = 1;
                    _this._scaleY = 1;
                    _this._scaleXY = 1;
                    _this.on('updatePosition', function () {
                        return _this.childPositioning();
                    });
                    _this.onChildrenChange = function () {
                        return _this.childPositioning();
                    };
                    return _this;
                }
                Layout.prototype.childDock = function (child) {
                    if ((child.dock & Dock.NONE) === Dock.NONE) {
                        return;
                    }
                    if ((child.dock & Dock.TOP) === Dock.TOP) {
                        child.y = 0;
                    }
                    if ((child.dock & Dock.BOTTOM) === Dock.BOTTOM) {
                        child.y = this._height * this._scaleY - (child.height || 0);
                    }
                    if ((child.dock & Dock.LEFT) === Dock.LEFT) {
                        child.x = 0;
                    }
                    if ((child.dock & Dock.RIGHT) === Dock.RIGHT) {
                        child.x = this._width * this._scaleX - (child.width || 0);
                    }
                    if ((child.dock & Dock.CENTER) === Dock.CENTER) {
                        child.x = (this._width * this._scaleX - (child.width || 0)) / 2;
                    }
                    if ((child.dock & Dock.MIDDLE) === Dock.MIDDLE) {
                        child.y = (this._height * this._scaleY - (child.height || 0)) / 2;
                    }
                    child.x += child.dockX || 0;
                    child.y += child.dockY || 0;
                };
                Layout.prototype.childPositioning = function () {
                    var _this = this;
                    this.emit('resize');
                    this.children.forEach(function (child) {
                        return _this.childDock(child);
                    });
                    if (this.parent && this.parent instanceof Layout) {
                        this.parent.childDock(this);
                    }
                };
                Layout.prototype.resize = function (width, height) {
                    this._width = width;
                    this._height = height;
                    this.emit('updatePosition');
                };
                Object.defineProperty(Layout.prototype, "width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        this.resize(value, this._height);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Layout.prototype, "height", {
                    get: function () {
                        return this._height;
                    },
                    set: function (value) {
                        this.resize(this._width, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Layout.prototype, "scaleX", {
                    get: function () {
                        return this._scaleX;
                    },
                    set: function (value) {
                        this._scaleX = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "scaleY", {
                    get: function () {
                        return this._scaleY;
                    },
                    set: function (value) {
                        this._scaleY = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "scaleXY", {
                    get: function () {
                        return this._scaleXY;
                    },
                    set: function (value) {
                        this._scaleXY = value;
                        this._scaleX = value;
                        this._scaleY = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                return Layout;
            }(pixi_js_1.Container);
            exports_1("default", Layout);
        }
    };
});
$__System.register("11", ["10", "d"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Layout_1, Scale9Grid;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }, function (Layout_1_1) {
            Layout_1 = Layout_1_1;
        }],
        execute: function () {
            Scale9Grid = function (_super) {
                __extends(Scale9Grid, _super);
                function Scale9Grid(texture, grid9) {
                    var _this = _super.call(this) || this;
                    grid9 = grid9 ? grid9 : new pixi_js_1.Rectangle(10, 10, texture.width - 20, texture.height - 20);
                    var frameTl = new pixi_js_1.Rectangle(0, 0, grid9.top, grid9.left);
                    _this._tl = new pixi_js_1.Sprite(_this.crop(texture, frameTl));
                    _this._tl.dock = Layout_1.Dock.TOP | Layout_1.Dock.LEFT;
                    _this.addChild(_this._tl);
                    var frameTr = new pixi_js_1.Rectangle(grid9.right, 0, texture.width - grid9.right, grid9.top);
                    _this._tr = new pixi_js_1.Sprite(_this.crop(texture, frameTr));
                    _this._tr.dock = Layout_1.Dock.TOP | Layout_1.Dock.RIGHT;
                    _this.addChild(_this._tr);
                    var frameBl = new pixi_js_1.Rectangle(0, grid9.bottom, grid9.top, texture.height - grid9.bottom);
                    _this._bl = new pixi_js_1.Sprite(_this.crop(texture, frameBl));
                    _this._bl.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.LEFT;
                    _this.addChild(_this._bl);
                    var frameBr = new pixi_js_1.Rectangle(grid9.right, grid9.bottom, texture.width - grid9.right, texture.height - grid9.bottom);
                    _this._br = new pixi_js_1.Sprite(_this.crop(texture, frameBr));
                    _this._br.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.RIGHT;
                    _this.addChild(_this._br);
                    var frameMl = new pixi_js_1.Rectangle(0, grid9.top, grid9.left, grid9.bottom - grid9.top);
                    _this._ml = new pixi_js_1.Sprite(_this.crop(texture, frameMl));
                    _this._ml.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.LEFT;
                    _this.addChild(_this._ml);
                    var frameMr = new pixi_js_1.Rectangle(grid9.right, grid9.top, texture.width - grid9.right, grid9.bottom - grid9.top);
                    _this._mr = new pixi_js_1.Sprite(_this.crop(texture, frameMr));
                    _this._mr.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.RIGHT;
                    _this.addChild(_this._mr);
                    var frameTc = new pixi_js_1.Rectangle(grid9.left, 0, grid9.right - grid9.left, grid9.top);
                    _this._tc = new pixi_js_1.Sprite(_this.crop(texture, frameTc));
                    _this._tc.dock = Layout_1.Dock.TOP | Layout_1.Dock.CENTER;
                    _this.addChild(_this._tc);
                    var frameBc = new pixi_js_1.Rectangle(grid9.left, grid9.bottom, grid9.right - grid9.left, texture.height - grid9.bottom);
                    _this._bc = new pixi_js_1.Sprite(_this.crop(texture, frameBc));
                    _this._bc.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.CENTER;
                    _this.addChild(_this._bc);
                    _this._mc = new pixi_js_1.Sprite(_this.crop(texture, grid9));
                    _this._mc.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    _this.addChild(_this._mc);
                    _this.on('resize', function () {
                        return _this.resizeHandler();
                    });
                    _this.resize(texture.width, texture.height);
                    return _this;
                }
                Scale9Grid.prototype.resizeHandler = function () {
                    this._tc.width = this._width * this._scaleX - (this._tl.width + this._tr.width);
                    this._bc.width = this.width * this._scaleX - (this._bl.width + this._br.width);
                    this._ml.height = this.height * this._scaleY - (this._tl.height + this._bl.height);
                    this._mr.height = this.height * this._scaleY - (this._tr.height + this._br.height);
                    this._mc.width = this.width * this._scaleX - (this._ml.width + this._mr.width);
                    this._mc.height = this.height * this._scaleY - (this._tc.height + this._bc.height);
                };
                Scale9Grid.prototype.crop = function (texture, rect) {
                    var trim = new pixi_js_1.Rectangle(0, 0, rect.width, rect.height);
                    return new pixi_js_1.Texture(texture.baseTexture, rect, rect, trim);
                };
                return Scale9Grid;
            }(Layout_1.default);
            exports_1("default", Scale9Grid);
        }
    };
});
$__System.register("a", ["b", "d", "c", "f", "12", "11"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Button_1_1) {
            exports_1({
                "Button": Button_1_1["default"]
            });
        }, function (Layout_1_1) {
            exports_1({
                "Layout": Layout_1_1["default"]
            });
        }, function (Padding_1_1) {
            exports_1({
                "Padding": Padding_1_1["default"]
            });
        }, function (Panel_1_1) {
            exports_1({
                "Panel": Panel_1_1["default"]
            });
        }, function (ProgressBar_1_1) {
            exports_1({
                "ProgressBar": ProgressBar_1_1["default"]
            });
        }, function (Scale9Grid_1_1) {
            exports_1({
                "Scale9Grid": Scale9Grid_1_1["default"]
            });
        }],
        execute: function () {}
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["pixi.js","textfield"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("pixi.js"), require("textfield"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bundle.js.map