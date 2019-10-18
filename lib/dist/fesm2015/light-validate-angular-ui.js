import { __decorate, __param } from 'tslib';
import { InjectionToken, EventEmitter, Inject, ElementRef, Input, Output, Directive, NgModule } from '@angular/core';
import { validate } from 'light-validate';

const RESOLVER = new InjectionToken('ui-light-validate.resolver');
const MAPPINGS = new InjectionToken('ui-light-validate.mappings');

let UiLightValidateDirective = class UiLightValidateDirective {
    constructor(resolver, mappings, el) {
        this.resolver = resolver;
        this.mappings = mappings;
        this.el = el;
        this.onValidate = new EventEmitter();
    }
    ngOnInit() {
        this.initialize(this.el.nativeElement);
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
            this.onValidate.emit(null);
        };
        const onValidateCatch = (exceptions) => {
            const exception = exceptions.shift();
            if (exception) {
                //setar texto do span com classe 'error' referente ao campo do DOM...
                htmlErrorElement.innerHTML = this.resolver ? this.resolver.label(exception) : exception.code;
                //adicionar span com classe 'error' referente ao campo do DOM...caso já não esteja presente
                !el.parentNode.contains(htmlErrorElement) && el.parentNode.appendChild(htmlErrorElement);
                el.parentElement.classList.add(this.getElementInvalidClass(el));
                el.parentElement.classList.remove(this.getElementValidClass(el));
                //disparar callback externo onValidate
                this.onValidate.emit(exception);
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
                validate(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        ;
        if (this.isValidateOnChangeEnabled(el)) {
            el.onchange = (event) => {
                firstTrigger = false;
                validate(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
            el.onkeyup = (event) => {
                const isKeydown = el.getAttribute('modal-rule-keydown');
                if (!firstTrigger || isKeydown) {
                    validate(this.target, this.validate, this.property)
                        .then(() => onValidateThen())
                        .catch((errors) => onValidateCatch(errors))
                        .finally(() => onValidateFinally());
                }
            };
        }
        else if (this.isValidateOnKeyUpEnabled(el)) {
            el.onkeyup = (event) => {
                validate(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        ;
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
    getMapping(mapping, mappings = []) {
        return typeof mapping === 'string' ? mappings.find(m => m.name === mapping) : mapping;
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
UiLightValidateDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [RESOLVER,] }] },
    { type: Array, decorators: [{ type: Inject, args: [MAPPINGS,] }] },
    { type: ElementRef }
];
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
    __param(0, Inject(RESOLVER)),
    __param(1, Inject(MAPPINGS))
], UiLightValidateDirective);

var UiLightValidateModule_1;
const ɵ0 = undefined, ɵ1 = undefined;
let UiLightValidateModule = UiLightValidateModule_1 = class UiLightValidateModule {
    static forRoot(config) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: config.resolver },
                { provide: MAPPINGS, useValue: config.mappings }
            ]
        };
    }
};
UiLightValidateModule = UiLightValidateModule_1 = __decorate([
    NgModule({
        declarations: [UiLightValidateDirective],
        exports: [UiLightValidateDirective],
        providers: [
            { provide: RESOLVER, useValue: ɵ0 },
            { provide: MAPPINGS, useValue: ɵ1 }
        ]
    })
], UiLightValidateModule);

/**
 * Generated bundle index. Do not edit.
 */

export { UiLightValidateDirective, UiLightValidateModule, ɵ0, ɵ1, RESOLVER as ɵa, MAPPINGS as ɵb };
//# sourceMappingURL=light-validate-angular-ui.js.map
