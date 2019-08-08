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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    var UiLightValidateDirective = /** @class */ (function () {
        function UiLightValidateDirective(elementRef) {
            this.elementRef = elementRef;
            this.uiLightOnValidate = new core.EventEmitter();
        }
        UiLightValidateDirective.prototype.ngOnInit = function () {
            this.initialize(this.elementRef.nativeElement);
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
                _this.uiLightOnValidate.emit(null);
            };
            var onValidateCatch = function (errors) {
                var error = errors.shift();
                if (error) {
                    //setar texto do span com classe 'error' referente ao campo do DOM...
                    htmlErrorElement.innerHTML = error.code;
                    //adicionar span com classe 'error' referente ao campo do DOM...caso já não esteja presente
                    !el.parentNode.contains(htmlErrorElement) && el.parentNode.appendChild(htmlErrorElement);
                    el.parentElement.classList.add(_this.getElementInvalidClass(el));
                    el.parentElement.classList.remove(_this.getElementValidClass(el));
                    //disparar callback externo onValidate
                    _this.uiLightOnValidate.emit(error);
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
                    lightValidate.validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
            if (this.isValidateOnChangeEnabled(el)) {
                el.onchange = function (event) {
                    firstTrigger = false;
                    lightValidate.validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
            if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
                el.onkeyup = function (event) {
                    var isKeydown = el.getAttribute('modal-rule-keydown');
                    if (!firstTrigger || isKeydown) {
                        lightValidate.validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                            .then(function () { return onValidateThen(); })
                            .catch(function (errors) { return onValidateCatch(errors); })
                            .finally(function () { return onValidateFinally(); });
                    }
                };
            }
            else if (this.isValidateOnKeyUpEnabled(el)) {
                el.onkeyup = function (event) {
                    lightValidate.validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                };
            }
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
        __decorate([
            core.Input('UiLightValidate'),
            __metadata("design:type", Object)
        ], UiLightValidateDirective.prototype, "uiLightValidate", void 0);
        __decorate([
            core.Input('UiLightProperty'),
            __metadata("design:type", String)
        ], UiLightValidateDirective.prototype, "uiLightProperty", void 0);
        __decorate([
            core.Input('UiLightTarget'),
            __metadata("design:type", Object)
        ], UiLightValidateDirective.prototype, "uiLightTarget", void 0);
        __decorate([
            core.Output('UiLightOnValidate'),
            __metadata("design:type", core.EventEmitter)
        ], UiLightValidateDirective.prototype, "uiLightOnValidate", void 0);
        UiLightValidateDirective = __decorate([
            core.Directive({
                selector: '[UiLightValidate]'
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], UiLightValidateDirective);
        return UiLightValidateDirective;
    }());

    var UiLightValidateModule = /** @class */ (function () {
        function UiLightValidateModule() {
        }
        UiLightValidateModule = __decorate([
            core.NgModule({
                declarations: [UiLightValidateDirective],
                exports: [UiLightValidateDirective]
            })
        ], UiLightValidateModule);
        return UiLightValidateModule;
    }());

    exports.UiLightValidateDirective = UiLightValidateDirective;
    exports.UiLightValidateModule = UiLightValidateModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=light-validate-angular-ui.umd.js.map
