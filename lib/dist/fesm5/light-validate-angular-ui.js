import { __decorate, __param } from 'tslib';
import { InjectionToken, EventEmitter, Inject, ElementRef, Input, Output, Directive, NgModule } from '@angular/core';
import { validate } from 'light-validate';

var RESOLVER = new InjectionToken('ui-light-validate.resolver');

var UiLightValidateDirective = /** @class */ (function () {
    function UiLightValidateDirective(resolver, el) {
        this.resolver = resolver;
        this.el = el;
        this.onValidate = new EventEmitter();
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
                validate(_this.target, _this.validate, _this.property)
                    .then(function () { return onValidateThen(); })
                    .catch(function (errors) { return onValidateCatch(errors); })
                    .finally(function () { return onValidateFinally(); });
            };
        }
        ;
        if (this.isValidateOnChangeEnabled(el)) {
            el.onchange = function (event) {
                firstTrigger = false;
                validate(_this.target, _this.validate, _this.property)
                    .then(function () { return onValidateThen(); })
                    .catch(function (errors) { return onValidateCatch(errors); })
                    .finally(function () { return onValidateFinally(); });
            };
        }
        if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
            el.onkeyup = function (event) {
                var isKeydown = el.getAttribute('modal-rule-keydown');
                if (!firstTrigger || isKeydown) {
                    validate(_this.target, _this.validate, _this.property)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                }
            };
        }
        else if (this.isValidateOnKeyUpEnabled(el)) {
            el.onkeyup = function (event) {
                validate(_this.target, _this.validate, _this.property)
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
        { type: undefined, decorators: [{ type: Inject, args: [RESOLVER,] }] },
        { type: ElementRef }
    ]; };
    __decorate([
        Input('UiLightValidate')
    ], UiLightValidateDirective.prototype, "validate", void 0);
    __decorate([
        Input('UiLightProperty')
    ], UiLightValidateDirective.prototype, "property", void 0);
    __decorate([
        Input('UiLightTarget')
    ], UiLightValidateDirective.prototype, "target", void 0);
    __decorate([
        Output('UiLightOnValidate')
    ], UiLightValidateDirective.prototype, "onValidate", void 0);
    UiLightValidateDirective = __decorate([
        Directive({
            selector: '[UiLightValidate]'
        }),
        __param(0, Inject(RESOLVER))
    ], UiLightValidateDirective);
    return UiLightValidateDirective;
}());

var ɵ0 = undefined;
var UiLightValidateModule = /** @class */ (function () {
    function UiLightValidateModule() {
    }
    UiLightValidateModule_1 = UiLightValidateModule;
    UiLightValidateModule.forRoot = function (resolver) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: resolver }
            ]
        };
    };
    var UiLightValidateModule_1;
    UiLightValidateModule = UiLightValidateModule_1 = __decorate([
        NgModule({
            declarations: [UiLightValidateDirective],
            exports: [UiLightValidateDirective],
            providers: [
                { provide: RESOLVER, useValue: ɵ0 }
            ]
        })
    ], UiLightValidateModule);
    return UiLightValidateModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { UiLightValidateDirective, UiLightValidateModule, ɵ0, RESOLVER as ɵa };
//# sourceMappingURL=light-validate-angular-ui.js.map
