import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output, Inject } from '@angular/core';
import { validate } from 'light-validate';
import { RESOLVER, MAPPINGS } from './ui-light-validate.injection-tokens';
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
tslib_1.__decorate([
    Input('UiLightValidate')
], UiLightValidateDirective.prototype, "validate", void 0);
tslib_1.__decorate([
    Input('UiLightProperty')
], UiLightValidateDirective.prototype, "property", void 0);
tslib_1.__decorate([
    Input('UiLightTarget')
], UiLightValidateDirective.prototype, "target", void 0);
tslib_1.__decorate([
    Output('UiLightOnValidate')
], UiLightValidateDirective.prototype, "onValidate", void 0);
UiLightValidateDirective = tslib_1.__decorate([
    Directive({
        selector: '[UiLightValidate]'
    }),
    tslib_1.__param(0, Inject(RESOLVER)),
    tslib_1.__param(1, Inject(MAPPINGS))
], UiLightValidateDirective);
export { UiLightValidateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQWtCLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFNMUUsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFjbkMsWUFDNEIsUUFBaUMsRUFDakMsUUFBb0IsRUFDdEMsRUFBYztRQUZJLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUxqQixlQUFVLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUFPckUsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxFQUFlO1FBRy9CLG9DQUFvQztRQUNwQyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV0RCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDMUIseURBQXlEO1lBQ3pELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDLEVBQUUsQ0FBQyxVQUFVLENB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ZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUM1RCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0NBR0YsQ0FBQTs7NENBOUpJLE1BQU0sU0FBQyxRQUFRO1lBQ29CLEtBQUssdUJBQXhDLE1BQU0sU0FBQyxRQUFRO1lBQ0osVUFBVTs7QUFkeEI7SUFEQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7MERBQ0o7QUFHckI7SUFEQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7MERBQ0Q7QUFHeEI7SUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDO3dEQUNKO0FBR25CO0lBREMsTUFBTSxDQUFDLG1CQUFtQixDQUFDOzREQUN5QztBQVoxRCx3QkFBd0I7SUFIcEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBZ0JHLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoQixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7R0FoQlIsd0JBQXdCLENBNktwQztTQTdLWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaWdodEV4Y2VwdGlvbiwgdmFsaWRhdGUgfSBmcm9tICdsaWdodC12YWxpZGF0ZSc7XG5pbXBvcnQgeyBSRVNPTFZFUiwgTUFQUElOR1MgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLmluamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgVWlMaWdodFZhbGlkYXRlUmVzb2x2ZXIgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLnJlc29sdmVyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW1VpTGlnaHRWYWxpZGF0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFVpTGlnaHRWYWxpZGF0ZURpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdVaUxpZ2h0VmFsaWRhdGUnKVxuICBwdWJsaWMgdmFsaWRhdGU6IGFueTtcblxuICBASW5wdXQoJ1VpTGlnaHRQcm9wZXJ0eScpXG4gIHB1YmxpYyBwcm9wZXJ0eTogc3RyaW5nO1xuXG4gIEBJbnB1dCgnVWlMaWdodFRhcmdldCcpXG4gIHB1YmxpYyB0YXJnZXQ6IGFueTtcblxuICBAT3V0cHV0KCdVaUxpZ2h0T25WYWxpZGF0ZScpXG4gIHB1YmxpYyBvblZhbGlkYXRlOiBFdmVudEVtaXR0ZXI8TGlnaHRFeGNlcHRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUkVTT0xWRVIpIHByaXZhdGUgcmVzb2x2ZXI6IFVpTGlnaHRWYWxpZGF0ZVJlc29sdmVyLFxuICAgIEBJbmplY3QoTUFQUElOR1MpIHByaXZhdGUgbWFwcGluZ3M6IEFycmF5PGFueT4sXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKGVsOiBIVE1MRWxlbWVudCkge1xuXG5cbiAgICAvLyBjcmlhciBzcGFuIHF1ZSBpcsOhIGNvbnRlciBvIGVycm8uXG4gICAgY29uc3QgaHRtbEVycm9yRWxlbWVudCA9IHRoaXMuZ2V0SHRtbEVycm9yRWxlbWVudChlbCk7XG5cbiAgICBpZiAodGhpcy5pc0ljb25FbmFibGVkKGVsKSkge1xuICAgICAgLy8gY3JpYXIgZGl2IHF1ZSBpcsOhIGNvbnRlciBvIGljb25lIHJlZmVyZW50ZSBhIHZhbGlkYcOnw6NvXG4gICAgICBjb25zdCBodG1sSWNvbkVsZW1lbnQgPSB0aGlzLmdldEh0bWxJY29uRWxlbWVudChlbCk7XG4gICAgICAhZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sSWNvbkVsZW1lbnQpICYmIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGh0bWxJY29uRWxlbWVudCwgZWwpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uVmFsaWRhdGVUaGVuID0gKCkgPT4ge1xuICAgICAgLy9yZW1vdmVyIHNwYW4gY29tIGNsYXNzZSAnZXJyb3InIHJlZmVyZW50ZSBhbyBjYW1wbyBkbyBET00uLi5jYXNvIGrDoSBlc3RlamEgcHJlc2VudGVcbiAgICAgIGVsLnBhcmVudE5vZGUuY29udGFpbnMoaHRtbEVycm9yRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChodG1sRXJyb3JFbGVtZW50KTtcblxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RWxlbWVudEludmFsaWRDbGFzcyhlbCkpO1xuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWwpKTtcblxuICAgICAgLy9kaXNwYXJhciBjYWxsYmFjayBleHRlcm5vIG9uVmFsaWRhdGVcbiAgICAgIHRoaXMub25WYWxpZGF0ZS5lbWl0KG51bGwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblZhbGlkYXRlQ2F0Y2ggPSAoZXhjZXB0aW9uczogTGlnaHRFeGNlcHRpb25bXSkgPT4ge1xuICAgICAgY29uc3QgZXhjZXB0aW9uID0gZXhjZXB0aW9ucy5zaGlmdCgpO1xuXG4gICAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIC8vc2V0YXIgdGV4dG8gZG8gc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLlxuICAgICAgICBodG1sRXJyb3JFbGVtZW50LmlubmVySFRNTCA9IHRoaXMucmVzb2x2ZXIgPyB0aGlzLnJlc29sdmVyLmxhYmVsKGV4Y2VwdGlvbikgOiBleGNlcHRpb24uY29kZTtcbiAgICAgICAgLy9hZGljaW9uYXIgc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLmNhc28gasOhIG7Do28gZXN0ZWphIHByZXNlbnRlXG4gICAgICAgICFlbC5wYXJlbnROb2RlLmNvbnRhaW5zKGh0bWxFcnJvckVsZW1lbnQpICYmIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoaHRtbEVycm9yRWxlbWVudCk7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldEVsZW1lbnRJbnZhbGlkQ2xhc3MoZWwpKTtcbiAgICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWwpKTtcblxuICAgICAgICAvL2Rpc3BhcmFyIGNhbGxiYWNrIGV4dGVybm8gb25WYWxpZGF0ZVxuICAgICAgICB0aGlzLm9uVmFsaWRhdGUuZW1pdChleGNlcHRpb24pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG9uVmFsaWRhdGVUaGVuKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVmFsaWRhdGVGaW5hbGx5ID0gKCkgPT4ge1xuXG4gICAgfVxuXG5cbiAgICBsZXQgZmlyc3RUcmlnZ2VyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9uYmx1ciA9IChldmVudCkgPT4ge1xuICAgICAgICBmaXJzdFRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGUodGhpcy50YXJnZXQsIHRoaXMudmFsaWRhdGUsIHRoaXMucHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25jaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZmlyc3RUcmlnZ2VyID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMudGFyZ2V0LCB0aGlzLnZhbGlkYXRlLCB0aGlzLnByb3BlcnR5KVxuICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcnMpID0+IG9uVmFsaWRhdGVDYXRjaChlcnJvcnMpKVxuICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbCkgfHwgdGhpcy5pc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25rZXl1cCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBpc0tleWRvd24gPSBlbC5nZXRBdHRyaWJ1dGUoJ21vZGFsLXJ1bGUta2V5ZG93bicpO1xuICAgICAgICBpZiAoIWZpcnN0VHJpZ2dlciB8fCBpc0tleWRvd24pIHtcbiAgICAgICAgICB2YWxpZGF0ZSh0aGlzLnRhcmdldCwgdGhpcy52YWxpZGF0ZSwgdGhpcy5wcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmlzVmFsaWRhdGVPbktleVVwRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9ua2V5dXAgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFsaWRhdGUodGhpcy50YXJnZXQsIHRoaXMudmFsaWRhdGUsIHRoaXMucHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb29sVmFsdWVGcm9tQXR0cihlbCwgJ3VpLWxpZ2h0LXZhbGlkYXRlLW9uLWJsdXInLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24tY2hhbmdlJywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNWYWxpZGF0ZU9uS2V5VXBFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24ta2V5dXAnLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ljb25FbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtaWNvbi1lbmFibGVkJywgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldE1hcHBpbmcobWFwcGluZzogYW55LCBtYXBwaW5nczogQXJyYXk8YW55PiA9IFtdKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBtYXBwaW5nID09PSAnc3RyaW5nJyA/IG1hcHBpbmdzLmZpbmQobSA9PiBtLm5hbWUgPT09IG1hcHBpbmcpIDogbWFwcGluZztcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50SW52YWxpZENsYXNzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3VpLWxpZ2h0LXZhbGlkYXRlLWludmFsaWQtY2xhc3MnKSB8fCAnbGlnaHQtaW52YWxpZCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtdmFsaWQtY2xhc3MnKSB8fCAnbGlnaHQtdmFsaWQnO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnRNZXNzYWdlQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtbWVzc2FnZS1jbGFzcycpIHx8ICdsaWdodC1tZXNzYWdlJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb29sVmFsdWVGcm9tQXR0cihlbDogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKChlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT09IHVuZGVmaW5lZCB8fCBlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT09ICcnIHx8IGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT0gJ3RydWUnKVxuICAgIH1cbiAgfVxuXG5cblxuICBwdWJsaWMgZ2V0SHRtbEljb25FbGVtZW50KGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGh0bWxEaXZJY29uRWxlbWVudDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBodG1sRGl2SWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsaWdodC12YWxpZC1pY29uJyk7XG4gICAgY29uc3QgaHRtbEljb25FbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBodG1sRGl2SWNvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbEljb25FbGVtZW50KTtcbiAgICByZXR1cm4gaHRtbERpdkljb25FbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGdldEh0bWxFcnJvckVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaHRtbFNwYW5FbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaHRtbFNwYW5FbGVtZW50Q2xhc3MgPSB0aGlzLmdldEVsZW1lbnRNZXNzYWdlQ2xhc3MoZWwpO1xuICAgIGh0bWxTcGFuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgaHRtbFNwYW5FbGVtZW50Q2xhc3MpO1xuICAgIHJldHVybiBodG1sU3BhbkVsZW1lbnQ7XG4gIH1cblxuXG59XG5cblxuIl19