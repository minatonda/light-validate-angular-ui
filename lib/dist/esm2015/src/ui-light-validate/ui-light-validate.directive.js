import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
        ;
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
tslib_1.__decorate([
    Input('UiLightValidate'),
    tslib_1.__metadata("design:type", Object)
], UiLightValidateDirective.prototype, "uiLightValidate", void 0);
tslib_1.__decorate([
    Input('UiLightProperty'),
    tslib_1.__metadata("design:type", String)
], UiLightValidateDirective.prototype, "uiLightProperty", void 0);
tslib_1.__decorate([
    Input('UiLightTarget'),
    tslib_1.__metadata("design:type", Object)
], UiLightValidateDirective.prototype, "uiLightTarget", void 0);
tslib_1.__decorate([
    Output('UiLightOnValidate'),
    tslib_1.__metadata("design:type", EventEmitter)
], UiLightValidateDirective.prototype, "uiLightOnValidate", void 0);
UiLightValidateDirective = tslib_1.__decorate([
    Directive({
        selector: '[UiLightValidate]'
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], UiLightValidateDirective);
export { UiLightValidateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBa0IsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFjbkMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUZuQyxzQkFBaUIsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUk1RSxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sVUFBVSxDQUFDLEVBQWU7UUFHL0Isb0NBQW9DO1FBQ3BDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMxQix5REFBeUQ7WUFDekQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdGO1FBRUQsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFO1lBQzFCLHFGQUFxRjtZQUNy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bWVudFJlZiwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaWdodEV4Y2VwdGlvbiwgdmFsaWRhdGUgfSBmcm9tICdsaWdodC12YWxpZGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tVaUxpZ2h0VmFsaWRhdGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBVaUxpZ2h0VmFsaWRhdGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnVWlMaWdodFZhbGlkYXRlJylcbiAgcHVibGljIHVpTGlnaHRWYWxpZGF0ZTogYW55O1xuXG4gIEBJbnB1dCgnVWlMaWdodFByb3BlcnR5JylcbiAgcHVibGljIHVpTGlnaHRQcm9wZXJ0eTogc3RyaW5nO1xuXG4gIEBJbnB1dCgnVWlMaWdodFRhcmdldCcpXG4gIHB1YmxpYyB1aUxpZ2h0VGFyZ2V0OiBhbnk7XG5cbiAgQE91dHB1dCgnVWlMaWdodE9uVmFsaWRhdGUnKVxuICBwdWJsaWMgdWlMaWdodE9uVmFsaWRhdGU6IEV2ZW50RW1pdHRlcjxMaWdodEV4Y2VwdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUoZWw6IEhUTUxFbGVtZW50KSB7XG5cblxuICAgIC8vIGNyaWFyIHNwYW4gcXVlIGlyw6EgY29udGVyIG8gZXJyby5cbiAgICBjb25zdCBodG1sRXJyb3JFbGVtZW50ID0gdGhpcy5nZXRIdG1sRXJyb3JFbGVtZW50KGVsKTtcblxuICAgIGlmICh0aGlzLmlzSWNvbkVuYWJsZWQoZWwpKSB7XG4gICAgICAvLyBjcmlhciBkaXYgcXVlIGlyw6EgY29udGVyIG8gaWNvbmUgcmVmZXJlbnRlIGEgdmFsaWRhw6fDo29cbiAgICAgIGNvbnN0IGh0bWxJY29uRWxlbWVudCA9IHRoaXMuZ2V0SHRtbEljb25FbGVtZW50KGVsKTtcbiAgICAgICFlbC5wYXJlbnROb2RlLmNvbnRhaW5zKGh0bWxJY29uRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaHRtbEljb25FbGVtZW50LCBlbCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25WYWxpZGF0ZVRoZW4gPSAoKSA9PiB7XG4gICAgICAvL3JlbW92ZXIgc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLmNhc28gasOhIGVzdGVqYSBwcmVzZW50ZVxuICAgICAgZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sRXJyb3JFbGVtZW50KSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGh0bWxFcnJvckVsZW1lbnQpO1xuXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRFbGVtZW50SW52YWxpZENsYXNzKGVsKSk7XG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRFbGVtZW50VmFsaWRDbGFzcyhlbCkpO1xuXG4gICAgICAvL2Rpc3BhcmFyIGNhbGxiYWNrIGV4dGVybm8gb25WYWxpZGF0ZVxuICAgICAgdGhpcy51aUxpZ2h0T25WYWxpZGF0ZS5lbWl0KG51bGwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblZhbGlkYXRlQ2F0Y2ggPSAoZXJyb3JzOiBMaWdodEV4Y2VwdGlvbltdKSA9PiB7XG4gICAgICBjb25zdCBlcnJvciA9IGVycm9ycy5zaGlmdCgpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy9zZXRhciB0ZXh0byBkbyBzcGFuIGNvbSBjbGFzc2UgJ2Vycm9yJyByZWZlcmVudGUgYW8gY2FtcG8gZG8gRE9NLi4uXG4gICAgICAgIGh0bWxFcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gZXJyb3IuY29kZTtcbiAgICAgICAgLy9hZGljaW9uYXIgc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLmNhc28gasOhIG7Do28gZXN0ZWphIHByZXNlbnRlXG4gICAgICAgICFlbC5wYXJlbnROb2RlLmNvbnRhaW5zKGh0bWxFcnJvckVsZW1lbnQpICYmIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoaHRtbEVycm9yRWxlbWVudCk7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldEVsZW1lbnRJbnZhbGlkQ2xhc3MoZWwpKTtcbiAgICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWwpKTtcblxuICAgICAgICAvL2Rpc3BhcmFyIGNhbGxiYWNrIGV4dGVybm8gb25WYWxpZGF0ZVxuICAgICAgICB0aGlzLnVpTGlnaHRPblZhbGlkYXRlLmVtaXQoZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG9uVmFsaWRhdGVUaGVuKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVmFsaWRhdGVGaW5hbGx5ID0gKCkgPT4ge1xuXG4gICAgfVxuXG5cbiAgICBsZXQgZmlyc3RUcmlnZ2VyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9uYmx1ciA9IChldmVudCkgPT4ge1xuICAgICAgICBmaXJzdFRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGUodGhpcy51aUxpZ2h0VGFyZ2V0LCB0aGlzLnVpTGlnaHRWYWxpZGF0ZSwgdGhpcy51aUxpZ2h0UHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25jaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZmlyc3RUcmlnZ2VyID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMudWlMaWdodFRhcmdldCwgdGhpcy51aUxpZ2h0VmFsaWRhdGUsIHRoaXMudWlMaWdodFByb3BlcnR5KVxuICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcnMpID0+IG9uVmFsaWRhdGVDYXRjaChlcnJvcnMpKVxuICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbCkgfHwgdGhpcy5pc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25rZXl1cCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBpc0tleWRvd24gPSBlbC5nZXRBdHRyaWJ1dGUoJ21vZGFsLXJ1bGUta2V5ZG93bicpO1xuICAgICAgICBpZiAoIWZpcnN0VHJpZ2dlciB8fCBpc0tleWRvd24pIHtcbiAgICAgICAgICB2YWxpZGF0ZSh0aGlzLnVpTGlnaHRUYXJnZXQsIHRoaXMudWlMaWdodFZhbGlkYXRlLCB0aGlzLnVpTGlnaHRQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmlzVmFsaWRhdGVPbktleVVwRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9ua2V5dXAgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFsaWRhdGUodGhpcy51aUxpZ2h0VGFyZ2V0LCB0aGlzLnVpTGlnaHRWYWxpZGF0ZSwgdGhpcy51aUxpZ2h0UHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25CbHVyRW5hYmxlZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb29sVmFsdWVGcm9tQXR0cihlbCwgJ3VpLWxpZ2h0LXZhbGlkYXRlLW9uLWJsdXInLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25DaGFuZ2VFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24tY2hhbmdlJywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNWYWxpZGF0ZU9uS2V5VXBFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24ta2V5dXAnLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ljb25FbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtaWNvbi1lbmFibGVkJywgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnRJbnZhbGlkQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtaW52YWxpZC1jbGFzcycpIHx8ICdsaWdodC1pbnZhbGlkJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50VmFsaWRDbGFzcyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCd1aS1saWdodC12YWxpZGF0ZS12YWxpZC1jbGFzcycpIHx8ICdsaWdodC12YWxpZCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudE1lc3NhZ2VDbGFzcyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCd1aS1saWdodC12YWxpZGF0ZS1tZXNzYWdlLWNsYXNzJykgfHwgJ2xpZ2h0LW1lc3NhZ2UnO1xuICB9XG5cbiAgcHVibGljIGdldEJvb2xWYWx1ZUZyb21BdHRyKGVsOiBIVE1MRWxlbWVudCwgYXR0cjogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gdW5kZWZpbmVkIHx8IGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gJycgfHwgZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09PSBudWxsKSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PSAndHJ1ZScpXG4gICAgfVxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRIdG1sSWNvbkVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaHRtbERpdkljb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGh0bWxEaXZJY29uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xpZ2h0LXZhbGlkLWljb24nKTtcbiAgICBjb25zdCBodG1sSWNvbkVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGh0bWxEaXZJY29uRWxlbWVudC5hcHBlbmRDaGlsZChodG1sSWNvbkVsZW1lbnQpO1xuICAgIHJldHVybiBodG1sRGl2SWNvbkVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVycm9yRWxlbWVudChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBodG1sU3BhbkVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBodG1sU3BhbkVsZW1lbnRDbGFzcyA9IHRoaXMuZ2V0RWxlbWVudE1lc3NhZ2VDbGFzcyhlbCk7XG4gICAgaHRtbFNwYW5FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBodG1sU3BhbkVsZW1lbnRDbGFzcyk7XG4gICAgcmV0dXJuIGh0bWxTcGFuRWxlbWVudDtcbiAgfVxuXG5cbn1cblxuXG4iXX0=