(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('light-validate')) :
    typeof define === 'function' && define.amd ? define('light-validate-angular-ui', ['exports', '@angular/core', 'light-validate'], factory) :
    (global = global || self, factory(global['light-validate-angular-ui'] = {}, global.ng.core, global.lightValidate));
}(this, function (exports, core, lightValidate) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var RESOLVER = new core.InjectionToken('ui-light-validate.resolver');
    var MAPPINGS = new core.InjectionToken('ui-light-validate.mappings');

    var UiLightValidateDirective = /** @class */ (function () {
        function UiLightValidateDirective(resolver, mappings, el) {
            this.resolver = resolver;
            this.mappings = mappings;
            this.el = el;
            this.onValidate = new core.EventEmitter();
        }
        UiLightValidateDirective.prototype.ngOnInit = function () {
            this.initialize(this.el.nativeElement);
        };
        UiLightValidateDirective.prototype.initialize = function (el) {
            var _this = this;
            // criar span que irá conter o erro.
            var htmlErrorElement = this.getHtmlErrorElement(el);
            if (this.isIconEnabled(el)) {
                // criar div que irá conter o icone referente a validação
                var htmlIconElement = this.getHtmlIconElement(el);
                !el.parentNode.contains(htmlIconElement) && el.parentNode.insertBefore(htmlIconElement, el);
            }
            var onValidateThen = function () {
                //remover span com classe 'error' referente ao campo do DOM...caso já esteja presente
                el.parentNode.contains(htmlErrorElement) && el.parentNode.removeChild(htmlErrorElement);
                el.parentElement.classList.remove(_this.getElementInvalidClass(el));
                el.parentElement.classList.add(_this.getElementValidClass(el));
                //disparar callback externo onValidate
                _this.onValidate.emit(null);
            };
            var onValidateCatch = function (exceptions) {
                var exception = exceptions.shift();
                if (exception) {
                    //setar texto do span com classe 'error' referente ao campo do DOM...
                    htmlErrorElement.innerHTML = _this.resolver ? _this.resolver.label(exception) : exception.code;
                    //adicionar span com classe 'error' referente ao campo do DOM...caso já não esteja presente
                    !el.parentNode.contains(htmlErrorElement) && el.parentNode.appendChild(htmlErrorElement);
                    el.parentElement.classList.add(_this.getElementInvalidClass(el));
                    el.parentElement.classList.remove(_this.getElementValidClass(el));
                    //disparar callback externo onValidate
                    _this.onValidate.emit(exception);
                }
                else {
                    onValidateThen();
                }
            };
            var onValidateFinally = function () {
            };
            var firstTrigger = true;
            if (this.isValidateOnBlurEnabled(el)) {
                el.onblur = function (event) {
                    firstTrigger = false;
                    lightValidate.validate(_this.target, _this.validate, _this.property)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
            ;
            if (this.isValidateOnChangeEnabled(el)) {
                el.onchange = function (event) {
                    firstTrigger = false;
                    lightValidate.validate(_this.target, _this.validate, _this.property)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
            if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
                el.onkeyup = function (event) {
                    var isKeydown = el.getAttribute('modal-rule-keydown');
                    if (!firstTrigger || isKeydown) {
                        lightValidate.validate(_this.target, _this.validate, _this.property)
                            .then(function () { return onValidateThen(); })
                            .catch(function (errors) { return onValidateCatch(errors); })
                            .finally(function () { return onValidateFinally(); });
                    }
                };
            }
            else if (this.isValidateOnKeyUpEnabled(el)) {
                el.onkeyup = function (event) {
                    lightValidate.validate(_this.target, _this.validate, _this.property)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
            ;
        };
        UiLightValidateDirective.prototype.isValidateOnBlurEnabled = function (el) {
            return this.getBoolValueFromAttr(el, 'ui-light-validate-on-blur', true);
        };
        UiLightValidateDirective.prototype.isValidateOnChangeEnabled = function (el) {
            return this.getBoolValueFromAttr(el, 'ui-light-validate-on-change', true);
        };
        UiLightValidateDirective.prototype.isValidateOnKeyUpEnabled = function (el) {
            return this.getBoolValueFromAttr(el, 'ui-light-validate-on-keyup', true);
        };
        UiLightValidateDirective.prototype.isIconEnabled = function (el) {
            return this.getBoolValueFromAttr(el, 'ui-light-validate-icon-enabled', false);
        };
        UiLightValidateDirective.prototype.getMapping = function (mapping, mappings) {
            if (mappings === void 0) { mappings = []; }
            return typeof mapping === 'string' ? mappings.find(function (m) { return m.name === mapping; }) : mapping;
        };
        UiLightValidateDirective.prototype.getElementInvalidClass = function (el) {
            return el.getAttribute('ui-light-validate-invalid-class') || 'light-invalid';
        };
        UiLightValidateDirective.prototype.getElementValidClass = function (el) {
            return el.getAttribute('ui-light-validate-valid-class') || 'light-valid';
        };
        UiLightValidateDirective.prototype.getElementMessageClass = function (el) {
            return el.getAttribute('ui-light-validate-message-class') || 'light-message';
        };
        UiLightValidateDirective.prototype.getBoolValueFromAttr = function (el, attr, defaultValue) {
            if ((el.getAttribute(attr) === undefined || el.getAttribute(attr) === '' || el.getAttribute(attr) === null)) {
                return defaultValue;
            }
            else {
                return (el.getAttribute(attr) == 'true');
            }
        };
        UiLightValidateDirective.prototype.getHtmlIconElement = function (el) {
            var htmlDivIconElement = document.createElement('div');
            htmlDivIconElement.setAttribute('class', 'light-valid-icon');
            var htmlIconElement = document.createElement('i');
            htmlDivIconElement.appendChild(htmlIconElement);
            return htmlDivIconElement;
        };
        UiLightValidateDirective.prototype.getHtmlErrorElement = function (el) {
            var htmlSpanElement = document.createElement('span');
            var htmlSpanElementClass = this.getElementMessageClass(el);
            htmlSpanElement.setAttribute('class', htmlSpanElementClass);
            return htmlSpanElement;
        };
        UiLightValidateDirective.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [RESOLVER,] }] },
            { type: Array, decorators: [{ type: core.Inject, args: [MAPPINGS,] }] },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input('UiLightValidate')
        ], UiLightValidateDirective.prototype, "validate", void 0);
        __decorate([
            core.Input('UiLightProperty')
        ], UiLightValidateDirective.prototype, "property", void 0);
        __decorate([
            core.Input('UiLightTarget')
        ], UiLightValidateDirective.prototype, "target", void 0);
        __decorate([
            core.Output('UiLightOnValidate')
        ], UiLightValidateDirective.prototype, "onValidate", void 0);
        UiLightValidateDirective = __decorate([
            core.Directive({
                selector: '[UiLightValidate]'
            }),
            __param(0, core.Inject(RESOLVER)),
            __param(1, core.Inject(MAPPINGS))
        ], UiLightValidateDirective);
        return UiLightValidateDirective;
    }());

    var ɵ0 = undefined, ɵ1 = undefined;
    var UiLightValidateModule = /** @class */ (function () {
        function UiLightValidateModule() {
        }
        UiLightValidateModule_1 = UiLightValidateModule;
        UiLightValidateModule.forRoot = function (config) {
            return {
                ngModule: UiLightValidateModule_1,
                providers: [
                    { provide: RESOLVER, useValue: config.resolver },
                    { provide: MAPPINGS, useValue: config.mappings }
                ]
            };
        };
        var UiLightValidateModule_1;
        UiLightValidateModule = UiLightValidateModule_1 = __decorate([
            core.NgModule({
                declarations: [UiLightValidateDirective],
                exports: [UiLightValidateDirective],
                providers: [
                    { provide: RESOLVER, useValue: ɵ0 },
                    { provide: MAPPINGS, useValue: ɵ1 }
                ]
            })
        ], UiLightValidateModule);
        return UiLightValidateModule;
    }());

    exports.UiLightValidateDirective = UiLightValidateDirective;
    exports.UiLightValidateModule = UiLightValidateModule;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵa = RESOLVER;
    exports.ɵb = MAPPINGS;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=light-validate-angular-ui.umd.js.map
