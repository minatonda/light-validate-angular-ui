import { __decorate, __metadata } from 'tslib';
import { Input, Output, EventEmitter, Directive, ElementRef, NgModule } from '@angular/core';
import { validate } from 'light-validate';

var UiLightValidateDirective = /** @class */ (function () {
    function UiLightValidateDirective(elementRef) {
        this.elementRef = elementRef;
        this.uiLightOnValidate = new EventEmitter();
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
                validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                    .then(function () { return onValidateThen(); })
                    .catch(function (errors) { return onValidateCatch(errors); })
                    .finally(function () { return onValidateFinally(); });
            };
        }
        if (this.isValidateOnChangeEnabled(el)) {
            el.onchange = function (event) {
                firstTrigger = false;
                validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                    .then(function () { return onValidateThen(); })
                    .catch(function (errors) { return onValidateCatch(errors); })
                    .finally(function () { return onValidateFinally(); });
            };
        }
        if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
            el.onkeyup = function (event) {
                var isKeydown = el.getAttribute('modal-rule-keydown');
                if (!firstTrigger || isKeydown) {
                    validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
                        .then(function () { return onValidateThen(); })
                        .catch(function (errors) { return onValidateCatch(errors); })
                        .finally(function () { return onValidateFinally(); });
                }
            };
        }
        else if (this.isValidateOnKeyUpEnabled(el)) {
            el.onkeyup = function (event) {
                validate(_this.uiLightTarget, _this.uiLightValidate, _this.uiLightProperty)
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
        Input('UiLightValidate'),
        __metadata("design:type", Object)
    ], UiLightValidateDirective.prototype, "uiLightValidate", void 0);
    __decorate([
        Input('UiLightProperty'),
        __metadata("design:type", String)
    ], UiLightValidateDirective.prototype, "uiLightProperty", void 0);
    __decorate([
        Input('UiLightTarget'),
        __metadata("design:type", Object)
    ], UiLightValidateDirective.prototype, "uiLightTarget", void 0);
    __decorate([
        Output('UiLightOnValidate'),
        __metadata("design:type", EventEmitter)
    ], UiLightValidateDirective.prototype, "uiLightOnValidate", void 0);
    UiLightValidateDirective = __decorate([
        Directive({
            selector: '[UiLightValidate]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], UiLightValidateDirective);
    return UiLightValidateDirective;
}());

var UiLightValidateModule = /** @class */ (function () {
    function UiLightValidateModule() {
    }
    UiLightValidateModule = __decorate([
        NgModule({
            declarations: [UiLightValidateDirective],
            exports: [UiLightValidateDirective]
        })
    ], UiLightValidateModule);
    return UiLightValidateModule;
}());

export { UiLightValidateDirective, UiLightValidateModule };
//# sourceMappingURL=light-validate-angular-ui.js.map
