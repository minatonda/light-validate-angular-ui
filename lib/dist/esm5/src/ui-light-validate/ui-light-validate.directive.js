import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output, Inject } from '@angular/core';
import { validate } from 'light-validate';
import { RESOLVER, MAPPINGS } from './ui-light-validate.injection-tokens';
var UiLightValidateDirective = /** @class */ (function () {
    function UiLightValidateDirective(resolver, mappings, el) {
        this.resolver = resolver;
        this.mappings = mappings;
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
        { type: undefined, decorators: [{ type: Inject, args: [RESOLVER,] }] },
        { type: Array, decorators: [{ type: Inject, args: [MAPPINGS,] }] },
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
        tslib_1.__param(0, Inject(RESOLVER)),
        tslib_1.__param(1, Inject(MAPPINGS))
    ], UiLightValidateDirective);
    return UiLightValidateDirective;
}());
export { UiLightValidateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQWtCLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFNMUU7SUFjRSxrQ0FDNEIsUUFBaUMsRUFDakMsUUFBb0IsRUFDdEMsRUFBYztRQUZJLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUxqQixlQUFVLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUFPckUsQ0FBQztJQUVNLDJDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLDZDQUFVLEdBQWpCLFVBQWtCLEVBQWU7UUFBakMsaUJBdUZDO1FBcEZDLG9DQUFvQztRQUNwQyxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV0RCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDMUIseURBQXlEO1lBQ3pELElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMs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SUFBTSxlQUFlLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEUsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0QsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUM1RCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOztnREEzSkUsTUFBTSxTQUFDLFFBQVE7Z0JBQ29CLEtBQUssdUJBQXhDLE1BQU0sU0FBQyxRQUFRO2dCQUNKLFVBQVU7O0lBZHhCO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzhEQUNKO0lBR3JCO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzhEQUNEO0lBR3hCO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzs0REFDSjtJQUduQjtRQURDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztnRUFDeUM7SUFaMUQsd0JBQXdCO1FBSHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQztRQWdCRyxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEIsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BaEJSLHdCQUF3QixDQTZLcEM7SUFBRCwrQkFBQztDQUFBLEFBN0tELElBNktDO1NBN0tZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpZ2h0RXhjZXB0aW9uLCB2YWxpZGF0ZSB9IGZyb20gJ2xpZ2h0LXZhbGlkYXRlJztcbmltcG9ydCB7IFJFU09MVkVSLCBNQVBQSU5HUyB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUuaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQgeyBVaUxpZ2h0VmFsaWRhdGVSZXNvbHZlciB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUucmVzb2x2ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbVWlMaWdodFZhbGlkYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ1VpTGlnaHRWYWxpZGF0ZScpXG4gIHB1YmxpYyB2YWxpZGF0ZTogYW55O1xuXG4gIEBJbnB1dCgnVWlMaWdodFByb3BlcnR5JylcbiAgcHVibGljIHByb3BlcnR5OiBzdHJpbmc7XG5cbiAgQElucHV0KCdVaUxpZ2h0VGFyZ2V0JylcbiAgcHVibGljIHRhcmdldDogYW55O1xuXG4gIEBPdXRwdXQoJ1VpTGlnaHRPblZhbGlkYXRlJylcbiAgcHVibGljIG9uVmFsaWRhdGU6IEV2ZW50RW1pdHRlcjxMaWdodEV4Y2VwdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChSRVNPTFZFUikgcHJpdmF0ZSByZXNvbHZlcjogVWlMaWdodFZhbGlkYXRlUmVzb2x2ZXIsXG4gICAgQEluamVjdChNQVBQSU5HUykgcHJpdmF0ZSBtYXBwaW5nczogQXJyYXk8YW55PixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUoZWw6IEhUTUxFbGVtZW50KSB7XG5cblxuICAgIC8vIGNyaWFyIHNwYW4gcXVlIGlyw6EgY29udGVyIG8gZXJyby5cbiAgICBjb25zdCBodG1sRXJyb3JFbGVtZW50ID0gdGhpcy5nZXRIdG1sRXJyb3JFbGVtZW50KGVsKTtcblxuICAgIGlmICh0aGlzLmlzSWNvbkVuYWJsZWQoZWwpKSB7XG4gICAgICAvLyBjcmlhciBkaXYgcXVlIGlyw6EgY29udGVyIG8gaWNvbmUgcmVmZXJlbnRlIGEgdmFsaWRhw6fDo29cbiAgICAgIGNvbnN0IGh0bWxJY29uRWxlbWVudCA9IHRoaXMuZ2V0SHRtbEljb25FbGVtZW50KGVsKTtcbiAgICAgICFlbC5wYXJlbnROb2RlLmNvbnRhaW5zKGh0bWxJY29uRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaHRtbEljb25FbGVtZW50LCBlbCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25WYWxpZGF0ZVRoZW4gPSAoKSA9PiB7XG4gICAgICAvL3JlbW92ZXIgc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLmNhc28gasOhIGVzdGVqYSBwcmVzZW50ZVxuICAgICAgZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sRXJyb3JFbGVtZW50KSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGh0bWxFcnJvckVsZW1lbnQpO1xuXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRFbGVtZW50SW52YWxpZENsYXNzKGVsKSk7XG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRFbGVtZW50VmFsaWRDbGFzcyhlbCkpO1xuXG4gICAgICAvL2Rpc3BhcmFyIGNhbGxiYWNrIGV4dGVybm8gb25WYWxpZGF0ZVxuICAgICAgdGhpcy5vblZhbGlkYXRlLmVtaXQobnVsbCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVmFsaWRhdGVDYXRjaCA9IChleGNlcHRpb25zOiBMaWdodEV4Y2VwdGlvbltdKSA9PiB7XG4gICAgICBjb25zdCBleGNlcHRpb24gPSBleGNlcHRpb25zLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChleGNlcHRpb24pIHtcbiAgICAgICAgLy9zZXRhciB0ZXh0byBkbyBzcGFuIGNvbSBjbGFzc2UgJ2Vycm9yJyByZWZlcmVudGUgYW8gY2FtcG8gZG8gRE9NLi4uXG4gICAgICAgIGh0bWxFcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5yZXNvbHZlciA/IHRoaXMucmVzb2x2ZXIubGFiZWwoZXhjZXB0aW9uKSA6IGV4Y2VwdGlvbi5jb2RlO1xuICAgICAgICAvL2FkaWNpb25hciBzcGFuIGNvbSBjbGFzc2UgJ2Vycm9yJyByZWZlcmVudGUgYW8gY2FtcG8gZG8gRE9NLi4uY2FzbyBqw6EgbsOjbyBlc3RlamEgcHJlc2VudGVcbiAgICAgICAgIWVsLnBhcmVudE5vZGUuY29udGFpbnMoaHRtbEVycm9yRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChodG1sRXJyb3JFbGVtZW50KTtcbiAgICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RWxlbWVudEludmFsaWRDbGFzcyhlbCkpO1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRFbGVtZW50VmFsaWRDbGFzcyhlbCkpO1xuXG4gICAgICAgIC8vZGlzcGFyYXIgY2FsbGJhY2sgZXh0ZXJubyBvblZhbGlkYXRlXG4gICAgICAgIHRoaXMub25WYWxpZGF0ZS5lbWl0KGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb25WYWxpZGF0ZVRoZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25WYWxpZGF0ZUZpbmFsbHkgPSAoKSA9PiB7XG5cbiAgICB9XG5cblxuICAgIGxldCBmaXJzdFRyaWdnZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25ibHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGZpcnN0VHJpZ2dlciA9IGZhbHNlO1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLnRhcmdldCwgdGhpcy52YWxpZGF0ZSwgdGhpcy5wcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBmaXJzdFRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGUodGhpcy50YXJnZXQsIHRoaXMudmFsaWRhdGUsIHRoaXMucHJvcGVydHkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9ycykgPT4gb25WYWxpZGF0ZUNhdGNoKGVycm9ycykpXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsKSB8fCB0aGlzLmlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmtleXVwID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGlzS2V5ZG93biA9IGVsLmdldEF0dHJpYnV0ZSgnbW9kYWwtcnVsZS1rZXlkb3duJyk7XG4gICAgICAgIGlmICghZmlyc3RUcmlnZ2VyIHx8IGlzS2V5ZG93bikge1xuICAgICAgICAgIHZhbGlkYXRlKHRoaXMudGFyZ2V0LCB0aGlzLnZhbGlkYXRlLCB0aGlzLnByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gb25WYWxpZGF0ZVRoZW4oKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuaXNWYWxpZGF0ZU9uS2V5VXBFbmFibGVkKGVsKSkge1xuICAgICAgZWwub25rZXl1cCA9IChldmVudCkgPT4ge1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLnRhcmdldCwgdGhpcy52YWxpZGF0ZSwgdGhpcy5wcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGlzVmFsaWRhdGVPbkJsdXJFbmFibGVkKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvb2xWYWx1ZUZyb21BdHRyKGVsLCAndWktbGlnaHQtdmFsaWRhdGUtb24tYmx1cicsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGlzVmFsaWRhdGVPbkNoYW5nZUVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1vbi1jaGFuZ2UnLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkYXRlT25LZXlVcEVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1vbi1rZXl1cCcsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGlzSWNvbkVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1pY29uLWVuYWJsZWQnLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWFwcGluZyhtYXBwaW5nOiBhbnksIG1hcHBpbmdzOiBBcnJheTxhbnk+ID0gW10pIHtcbiAgICByZXR1cm4gdHlwZW9mIG1hcHBpbmcgPT09ICdzdHJpbmcnID8gbWFwcGluZ3MuZmluZChtID0+IG0ubmFtZSA9PT0gbWFwcGluZykgOiBtYXBwaW5nO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnRJbnZhbGlkQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtaW52YWxpZC1jbGFzcycpIHx8ICdsaWdodC1pbnZhbGlkJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50VmFsaWRDbGFzcyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCd1aS1saWdodC12YWxpZGF0ZS12YWxpZC1jbGFzcycpIHx8ICdsaWdodC12YWxpZCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudE1lc3NhZ2VDbGFzcyhlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCd1aS1saWdodC12YWxpZGF0ZS1tZXNzYWdlLWNsYXNzJykgfHwgJ2xpZ2h0LW1lc3NhZ2UnO1xuICB9XG5cbiAgcHVibGljIGdldEJvb2xWYWx1ZUZyb21BdHRyKGVsOiBIVE1MRWxlbWVudCwgYXR0cjogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gdW5kZWZpbmVkIHx8IGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gJycgfHwgZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09PSBudWxsKSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PSAndHJ1ZScpXG4gICAgfVxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRIdG1sSWNvbkVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaHRtbERpdkljb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGh0bWxEaXZJY29uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xpZ2h0LXZhbGlkLWljb24nKTtcbiAgICBjb25zdCBodG1sSWNvbkVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGh0bWxEaXZJY29uRWxlbWVudC5hcHBlbmRDaGlsZChodG1sSWNvbkVsZW1lbnQpO1xuICAgIHJldHVybiBodG1sRGl2SWNvbkVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVycm9yRWxlbWVudChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBodG1sU3BhbkVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBodG1sU3BhbkVsZW1lbnRDbGFzcyA9IHRoaXMuZ2V0RWxlbWVudE1lc3NhZ2VDbGFzcyhlbCk7XG4gICAgaHRtbFNwYW5FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBodG1sU3BhbkVsZW1lbnRDbGFzcyk7XG4gICAgcmV0dXJuIGh0bWxTcGFuRWxlbWVudDtcbiAgfVxuXG5cbn1cblxuXG4iXX0=