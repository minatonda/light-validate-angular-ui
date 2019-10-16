import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output, Inject } from '@angular/core';
import { validate } from 'light-validate';
import { RESOLVER } from './ui-light-validate.injection-tokens';
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
        tslib_1.__param(0, Inject(RESOLVER))
    ], UiLightValidateDirective);
    return UiLightValidateDirective;
}());
export { UiLightValidateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQWtCLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU1oRTtJQWNFLGtDQUVVLFFBQWlDLEVBQ2pDLEVBQWM7UUFEZCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBTGpCLGVBQVUsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU9yRSxDQUFDO0lBRU0sMkNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sNkNBQVUsR0FBakIsVUFBa0IsRUFBZTtRQUFqQyxpQkF1RkM7UUFwRkMsb0NBQW9DO1FBQ3BDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMxQix5REFBeUQ7WUFDekQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZ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O1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzhEQUNEO0lBR3hCO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzs0REFDSjtJQUduQjtRQURDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztnRUFDeUM7SUFaMUQsd0JBQXdCO1FBSHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQztRQWdCRyxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7T0FmUix3QkFBd0IsQ0F5S3BDO0lBQUQsK0JBQUM7Q0FBQSxBQXpLRCxJQXlLQztTQXpLWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaWdodEV4Y2VwdGlvbiwgdmFsaWRhdGUgfSBmcm9tICdsaWdodC12YWxpZGF0ZSc7XG5pbXBvcnQgeyBSRVNPTFZFUiB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUuaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQgeyBVaUxpZ2h0VmFsaWRhdGVSZXNvbHZlciB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUucmVzb2x2ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbVWlMaWdodFZhbGlkYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ1VpTGlnaHRWYWxpZGF0ZScpXG4gIHB1YmxpYyB2YWxpZGF0ZTogYW55O1xuXG4gIEBJbnB1dCgnVWlMaWdodFByb3BlcnR5JylcbiAgcHVibGljIHByb3BlcnR5OiBzdHJpbmc7XG5cbiAgQElucHV0KCdVaUxpZ2h0VGFyZ2V0JylcbiAgcHVibGljIHRhcmdldDogYW55O1xuXG4gIEBPdXRwdXQoJ1VpTGlnaHRPblZhbGlkYXRlJylcbiAgcHVibGljIG9uVmFsaWRhdGU6IEV2ZW50RW1pdHRlcjxMaWdodEV4Y2VwdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChSRVNPTFZFUilcbiAgICBwcml2YXRlIHJlc29sdmVyOiBVaUxpZ2h0VmFsaWRhdGVSZXNvbHZlcixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUoZWw6IEhUTUxFbGVtZW50KSB7XG5cblxuICAgIC8vIGNyaWFyIHNwYW4gcXVlIGlyw6EgY29udGVyIG8gZXJyby5cbiAgICBjb25zdCBodG1sRXJyb3JFbGVtZW50ID0gdGhpcy5nZXRIdG1sRXJyb3JFbGVtZW50KGVsKTtcblxuICAgIGlmICh0aGlzLmlzSWNvbkVuYWJsZWQoZWwpKSB7XG4gICAgICAvLyBjcmlhciBkaXYgcXVlIGlyw6EgY29udGVyIG8gaWNvbmUgcmVmZXJlbnRlIGEgdmFsaWRhw6fDo29cbiAgICAgIGNvbnN0IGh0bWxJY29uRWxlbWVudCA9IHRoaXMuZ2V0SHRtbEljb25FbGVtZW50KGVsKTtcbiAgICAgICFlbC5wYXJlbnROb2RlLmNvbnRhaW5zKGh0bWxJY29uRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaHRtbEljb25FbGVtZW50LCBlbCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25WYWxpZGF0ZVRoZW4gPSAoKSA9PiB7XG4gICAgICAvL3JlbW92ZXIgc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLmNhc28gasOhIGVzdGVqYSBwcmVzZW50ZVxuICAgICAgZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sRXJyb3JFbGVtZW50KSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGh0bWxFcnJvckVsZW1lbnQpO1xuXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRFbGVtZW50SW52YWxpZENsYXNzKGVsKSk7XG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRFbGVtZW50VmFsaWRDbGFzcyhlbCkpO1xuXG4gICAgICAvL2Rpc3BhcmFyIGNhbGxiYWNrIGV4dGVybm8gb25WYWxpZGF0ZVxuICAgICAgdGhpcy5vblZhbGlkYXRlLmVtaXQobnVsbCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVmFsaWRhdGVDYXRjaCA9IChleGNlcHRpb25zOiBMaWdodEV4Y2VwdGlvbltdKSA9PiB7XG4gICAgICBjb25zdCBleGNlcHRpb24gPSBleGNlcHRpb25zLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChleGNlcHRpb24pIHtcbiAgICAgICAgLy9zZXRhciB0ZXh0byBkbyBzcGFuIGNvbSBjbGFzc2UgJ2Vycm9yJyByZWZlcmVudGUgYW8gY2FtcG8gZG8gRE9NLi4uXG4gICAgICAgIGh0bWxFcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5yZXNvbHZlciA/IHRoaXMucmVzb2x2ZXIubGFiZWwoZXhjZXB0aW9uKSA6IGV4Y2VwdGlvbi5jb2RlO1xuICAgICAgICAvL2FkaWNpb25hciBzcGFuIGNvbSBjbGFzc2UgJ2Vycm9yJyByZWZlcmVudGUgYW8gY2FtcG8gZG8gRE9NLi4uY2FzbyBqw6EgbsOjbyBlc3RlamEgcHJlc2VudGVcbiAgICAgICAgIWVsLnBhcmVudE5vZGUuY29udGFpbnMoaHRtbEVycm9yRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChodG1sRXJyb3JFbGVtZW50KTtcbiAgICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RWxlbWVudEludmFsaWRDbGFzcyhlbCkpO1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRFbGVtZW50VmFsaWRDbGFzcyhlbCkpO1xuXG4gICAgICAgIC8vZGlzcGFyYXIgY2FsbGJhY2sgZXh0ZXJubyBvblZhbGlkYXRlXG4gICAgICAgIHRoaXMub25WYWxpZGF0ZS5lbWl0KGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb25WYWxpZGF0ZVRoZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25WYWxpZGF0ZUZpbmFsbHkgPSAoKSA9PiB7XG5cbiAgICB9XG5cblxuICAgIGxldCBmaXJzdFRyaWdnZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25ibHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGZpcnN0VHJpZ2dlciA9IGZhbHNlO1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLnRhcmdldCwgdGhpcy52YWxpZGF0ZSwgdGhpcy5wcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBmaXJzdFRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGUodGhpcy50YXJnZXQsIHRoaXMudmFsaWRhdGUsIHRoaXMucHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsKSB8fCB0aGlzLmlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmtleXVwID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGlzS2V5ZG93biA9IGVsLmdldEF0dHJpYnV0ZSgnbW9kYWwtcnVsZS1rZXlkb3duJyk7XG4gICAgICAgIGlmICghZmlyc3RUcmlnZ2VyIHx8IGlzS2V5ZG93bikge1xuICAgICAgICAgIHZhbGlkYXRlKHRoaXMudGFyZ2V0LCB0aGlzLnZhbGlkYXRlLCB0aGlzLnByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuaXNWYWxpZGF0ZU9uS2V5VXBFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25rZXl1cCA9IChldmVudCkgPT4ge1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLnRhcmdldCwgdGhpcy52YWxpZGF0ZSwgdGhpcy5wcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24tYmx1cicsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1vbi1jaGFuZ2UnLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25LZXlVcEVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1vbi1rZXl1cCcsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGlzSWNvbkVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1pY29uLWVuYWJsZWQnLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudEludmFsaWRDbGFzcyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCd1aS1saWdodC12YWxpZGF0ZS1pbnZhbGlkLWNsYXNzJykgfHwgJ2xpZ2h0LWludmFsaWQnO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnRWYWxpZENsYXNzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3VpLWxpZ2h0LXZhbGlkYXRlLXZhbGlkLWNsYXNzJykgfHwgJ2xpZ2h0LXZhbGlkJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50TWVzc2FnZUNsYXNzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3VpLWxpZ2h0LXZhbGlkYXRlLW1lc3NhZ2UtY2xhc3MnKSB8fCAnbGlnaHQtbWVzc2FnZSc7XG4gIH1cblxuICBwdWJsaWMgZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWw6IEhUTUxFbGVtZW50LCBhdHRyOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogYm9vbGVhbikge1xuICAgIGlmICgoZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09PSB1bmRlZmluZWQgfHwgZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09PSAnJyB8fCBlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT09IG51bGwpKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09ICd0cnVlJylcbiAgICB9XG4gIH1cblxuXG5cbiAgcHVibGljIGdldEh0bWxJY29uRWxlbWVudChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBodG1sRGl2SWNvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaHRtbERpdkljb25FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGlnaHQtdmFsaWQtaWNvbicpO1xuICAgIGNvbnN0IGh0bWxJY29uRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgaHRtbERpdkljb25FbGVtZW50LmFwcGVuZENoaWxkKGh0bWxJY29uRWxlbWVudCk7XG4gICAgcmV0dXJuIGh0bWxEaXZJY29uRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRXJyb3JFbGVtZW50KGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGh0bWxTcGFuRWxlbWVudDogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGh0bWxTcGFuRWxlbWVudENsYXNzID0gdGhpcy5nZXRFbGVtZW50TWVzc2FnZUNsYXNzKGVsKTtcbiAgICBodG1sU3BhbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIGh0bWxTcGFuRWxlbWVudENsYXNzKTtcbiAgICByZXR1cm4gaHRtbFNwYW5FbGVtZW50O1xuICB9XG5cblxufVxuXG5cbiJdfQ==