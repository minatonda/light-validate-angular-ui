import { __decorate, __metadata } from 'tslib';
import { EventEmitter, Input, Output, Directive, ElementRef, NgModule } from '@angular/core';
import { validate } from 'light-validate';

let UiLightValidateDirective = class UiLightValidateDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.uiLightOnValidate = new EventEmitter();
    }
    ngOnInit() {
        this.initialize(this.elementRef.nativeElement);
    }
    initialize(el) {
        // criar span que irá conter o erro.
        const htmlErrorElement = this.getHtmlErrorElement(el);
        if (this.isIconEnabled(el)) {
            // criar div que irá conter o icone referente a validação
            const htmlIconElement = this.getHtmlIconElement(el);
            !el.parentNode.contains(htmlIconElement) && el.parentNode.insertBefore(htmlIconElement, el);
        }
        const onValidateThen = () => {
            //remover span com classe 'error' referente ao campo do DOM...caso já esteja presente
            el.parentNode.contains(htmlErrorElement) && el.parentNode.removeChild(htmlErrorElement);
            el.parentElement.classList.remove(this.getElementInvalidClass(el));
            el.parentElement.classList.add(this.getElementValidClass(el));
            //disparar callback externo onValidate
            this.uiLightOnValidate.emit(null);
        };
        const onValidateCatch = (errors) => {
            const error = errors.shift();
            if (error) {
                //setar texto do span com classe 'error' referente ao campo do DOM...
                htmlErrorElement.innerHTML = error.code;
                //adicionar span com classe 'error' referente ao campo do DOM...caso já não esteja presente
                !el.parentNode.contains(htmlErrorElement) && el.parentNode.appendChild(htmlErrorElement);
                el.parentElement.classList.add(this.getElementInvalidClass(el));
                el.parentElement.classList.remove(this.getElementValidClass(el));
                //disparar callback externo onValidate
                this.uiLightOnValidate.emit(error);
            }
            else {
                onValidateThen();
            }
        };
        const onValidateFinally = () => {
        };
        let firstTrigger = true;
        if (this.isValidateOnBlurEnabled(el)) {
            el.onblur = (event) => {
                firstTrigger = false;
                validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        if (this.isValidateOnChangeEnabled(el)) {
            el.onchange = (event) => {
                firstTrigger = false;
                validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
            el.onkeyup = (event) => {
                const isKeydown = el.getAttribute('modal-rule-keydown');
                if (!firstTrigger || isKeydown) {
                    validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
                        .then(() => onValidateThen())
                        .catch((errors) => onValidateCatch(errors))
                        .finally(() => onValidateFinally());
                }
            };
        }
        else if (this.isValidateOnKeyUpEnabled(el)) {
            el.onkeyup = (event) => {
                validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
    }
    isValidateOnBlurEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-blur', true);
    }
    isValidateOnChangeEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-change', true);
    }
    isValidateOnKeyUpEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-keyup', true);
    }
    isIconEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-icon-enabled', false);
    }
    getElementInvalidClass(el) {
        return el.getAttribute('ui-light-validate-invalid-class') || 'light-invalid';
    }
    getElementValidClass(el) {
        return el.getAttribute('ui-light-validate-valid-class') || 'light-valid';
    }
    getElementMessageClass(el) {
        return el.getAttribute('ui-light-validate-message-class') || 'light-message';
    }
    getBoolValueFromAttr(el, attr, defaultValue) {
        if ((el.getAttribute(attr) === undefined || el.getAttribute(attr) === '' || el.getAttribute(attr) === null)) {
            return defaultValue;
        }
        else {
            return (el.getAttribute(attr) == 'true');
        }
    }
    getHtmlIconElement(el) {
        const htmlDivIconElement = document.createElement('div');
        htmlDivIconElement.setAttribute('class', 'light-valid-icon');
        const htmlIconElement = document.createElement('i');
        htmlDivIconElement.appendChild(htmlIconElement);
        return htmlDivIconElement;
    }
    getHtmlErrorElement(el) {
        const htmlSpanElement = document.createElement('span');
        const htmlSpanElementClass = this.getElementMessageClass(el);
        htmlSpanElement.setAttribute('class', htmlSpanElementClass);
        return htmlSpanElement;
    }
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

let UiLightValidateModule = class UiLightValidateModule {
};
UiLightValidateModule = __decorate([
    NgModule({
        declarations: [UiLightValidateDirective],
        exports: [UiLightValidateDirective]
    })
], UiLightValidateModule);

export { UiLightValidateDirective, UiLightValidateModule };
//# sourceMappingURL=light-validate-angular-ui.js.map
