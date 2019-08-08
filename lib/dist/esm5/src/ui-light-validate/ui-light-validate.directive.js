import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
        ;
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
    return UiLightValidateDirective;
}());
export { UiLightValidateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBa0IsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUQ7SUFjRSxrQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUZuQyxzQkFBaUIsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUk1RSxDQUFDO0lBRU0sMkNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sNkNBQVUsR0FBakIsVUFBa0IsRUFBZTtRQUFqQyxpQkF1RkM7UUFwRkMsb0NBQW9DO1FBQ3BDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMxQix5REFBeUQ7WUFDekQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdGO1FBRUQsSUFBTSxjQUFjLEdBQUc7WUFDckIscUZBQXFGO1lBQ3JGLEVBQUUsQ0FBQyxV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Qix3QkFBd0IsQ0FzS3BDO0lBQUQsK0JBQUM7Q0FBQSxBQXRLRCxJQXNLQztTQXRLWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlnaHRFeGNlcHRpb24sIHZhbGlkYXRlIH0gZnJvbSAnbGlnaHQtdmFsaWRhdGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbVWlMaWdodFZhbGlkYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ1VpTGlnaHRWYWxpZGF0ZScpXG4gIHB1YmxpYyB1aUxpZ2h0VmFsaWRhdGU6IGFueTtcblxuICBASW5wdXQoJ1VpTGlnaHRQcm9wZXJ0eScpXG4gIHB1YmxpYyB1aUxpZ2h0UHJvcGVydHk6IHN0cmluZztcblxuICBASW5wdXQoJ1VpTGlnaHRUYXJnZXQnKVxuICBwdWJsaWMgdWlMaWdodFRhcmdldDogYW55O1xuXG4gIEBPdXRwdXQoJ1VpTGlnaHRPblZhbGlkYXRlJylcbiAgcHVibGljIHVpTGlnaHRPblZhbGlkYXRlOiBFdmVudEVtaXR0ZXI8TGlnaHRFeGNlcHRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKGVsOiBIVE1MRWxlbWVudCkge1xuXG5cbiAgICAvLyBjcmlhciBzcGFuIHF1ZSBpcsOhIGNvbnRlciBvIGVycm8uXG4gICAgY29uc3QgaHRtbEVycm9yRWxlbWVudCA9IHRoaXMuZ2V0SHRtbEVycm9yRWxlbWVudChlbCk7XG5cbiAgICBpZiAodGhpcy5pc0ljb25FbmFibGVkKGVsKSkge1xuICAgICAgLy8gY3JpYXIgZGl2IHF1ZSBpcsOhIGNvbnRlciBvIGljb25lIHJlZmVyZW50ZSBhIHZhbGlkYcOnw6NvXG4gICAgICBjb25zdCBodG1sSWNvbkVsZW1lbnQgPSB0aGlzLmdldEh0bWxJY29uRWxlbWVudChlbCk7XG4gICAgICAhZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sSWNvbkVsZW1lbnQpICYmIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGh0bWxJY29uRWxlbWVudCwgZWwpO1xuICAgIH1cblxuICAgIGNvbnN0IG9uVmFsaWRhdGVUaGVuID0gKCkgPT4ge1xuICAgICAgLy9yZW1vdmVyIHNwYW4gY29tIGNsYXNzZSAnZXJyb3InIHJlZmVyZW50ZSBhbyBjYW1wbyBkbyBET00uLi5jYXNvIGrDoSBlc3RlamEgcHJlc2VudGVcbiAgICAgIGVsLnBhcmVudE5vZGUuY29udGFpbnMoaHRtbEVycm9yRWxlbWVudCkgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChodG1sRXJyb3JFbGVtZW50KTtcblxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RWxlbWVudEludmFsaWRDbGFzcyhlbCkpO1xuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWwpKTtcblxuICAgICAgLy9kaXNwYXJhciBjYWxsYmFjayBleHRlcm5vIG9uVmFsaWRhdGVcbiAgICAgIHRoaXMudWlMaWdodE9uVmFsaWRhdGUuZW1pdChudWxsKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25WYWxpZGF0ZUNhdGNoID0gKGVycm9yczogTGlnaHRFeGNlcHRpb25bXSkgPT4ge1xuICAgICAgY29uc3QgZXJyb3IgPSBlcnJvcnMuc2hpZnQoKTtcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIC8vc2V0YXIgdGV4dG8gZG8gc3BhbiBjb20gY2xhc3NlICdlcnJvcicgcmVmZXJlbnRlIGFvIGNhbXBvIGRvIERPTS4uLlxuICAgICAgICBodG1sRXJyb3JFbGVtZW50LmlubmVySFRNTCA9IGVycm9yLmNvZGU7XG4gICAgICAgIC8vYWRpY2lvbmFyIHNwYW4gY29tIGNsYXNzZSAnZXJyb3InIHJlZmVyZW50ZSBhbyBjYW1wbyBkbyBET00uLi5jYXNvIGrDoSBuw6NvIGVzdGVqYSBwcmVzZW50ZVxuICAgICAgICAhZWwucGFyZW50Tm9kZS5jb250YWlucyhodG1sRXJyb3JFbGVtZW50KSAmJiBlbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGh0bWxFcnJvckVsZW1lbnQpO1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRFbGVtZW50SW52YWxpZENsYXNzKGVsKSk7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldEVsZW1lbnRWYWxpZENsYXNzKGVsKSk7XG5cbiAgICAgICAgLy9kaXNwYXJhciBjYWxsYmFjayBleHRlcm5vIG9uVmFsaWRhdGVcbiAgICAgICAgdGhpcy51aUxpZ2h0T25WYWxpZGF0ZS5lbWl0KGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBvblZhbGlkYXRlVGhlbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblZhbGlkYXRlRmluYWxseSA9ICgpID0+IHtcblxuICAgIH1cblxuXG4gICAgbGV0IGZpcnN0VHJpZ2dlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuaXNWYWxpZGF0ZU9uQmx1ckVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZmlyc3RUcmlnZ2VyID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMudWlMaWdodFRhcmdldCwgdGhpcy51aUxpZ2h0VmFsaWRhdGUsIHRoaXMudWlMaWdodFByb3BlcnR5KVxuICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcnMpID0+IG9uVmFsaWRhdGVDYXRjaChlcnJvcnMpKVxuICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNWYWxpZGF0ZU9uQ2hhbmdlRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9uY2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGZpcnN0VHJpZ2dlciA9IGZhbHNlO1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLnVpTGlnaHRUYXJnZXQsIHRoaXMudWlMaWdodFZhbGlkYXRlLCB0aGlzLnVpTGlnaHRQcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3JzKSA9PiBvblZhbGlkYXRlQ2F0Y2goZXJyb3JzKSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiBvblZhbGlkYXRlRmluYWxseSgpKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNWYWxpZGF0ZU9uQmx1ckVuYWJsZWQoZWwpIHx8IHRoaXMuaXNWYWxpZGF0ZU9uQ2hhbmdlRW5hYmxlZChlbCkpIHtcbiAgICAgIGVsLm9ua2V5dXAgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaXNLZXlkb3duID0gZWwuZ2V0QXR0cmlidXRlKCdtb2RhbC1ydWxlLWtleWRvd24nKTtcbiAgICAgICAgaWYgKCFmaXJzdFRyaWdnZXIgfHwgaXNLZXlkb3duKSB7XG4gICAgICAgICAgdmFsaWRhdGUodGhpcy51aUxpZ2h0VGFyZ2V0LCB0aGlzLnVpTGlnaHRWYWxpZGF0ZSwgdGhpcy51aUxpZ2h0UHJvcGVydHkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBvblZhbGlkYXRlVGhlbigpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcnMpID0+IG9uVmFsaWRhdGVDYXRjaChlcnJvcnMpKVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gb25WYWxpZGF0ZUZpbmFsbHkoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5pc1ZhbGlkYXRlT25LZXlVcEVuYWJsZWQoZWwpKSB7XG4gICAgICBlbC5vbmtleXVwID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMudWlMaWdodFRhcmdldCwgdGhpcy51aUxpZ2h0VmFsaWRhdGUsIHRoaXMudWlMaWdodFByb3BlcnR5KVxuICAgICAgICAgIC50aGVuKCgpID0+IG9uVmFsaWRhdGVUaGVuKCkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcnMpID0+IG9uVmFsaWRhdGVDYXRjaChlcnJvcnMpKVxuICAgICAgICAgIC5maW5hbGx5KCgpID0+IG9uVmFsaWRhdGVGaW5hbGx5KCkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgaXNWYWxpZGF0ZU9uQmx1ckVuYWJsZWQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm9vbFZhbHVlRnJvbUF0dHIoZWwsICd1aS1saWdodC12YWxpZGF0ZS1vbi1ibHVyJywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNWYWxpZGF0ZU9uQ2hhbmdlRW5hYmxlZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb29sVmFsdWVGcm9tQXR0cihlbCwgJ3VpLWxpZ2h0LXZhbGlkYXRlLW9uLWNoYW5nZScsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGlzVmFsaWRhdGVPbktleVVwRW5hYmxlZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb29sVmFsdWVGcm9tQXR0cihlbCwgJ3VpLWxpZ2h0LXZhbGlkYXRlLW9uLWtleXVwJywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNJY29uRW5hYmxlZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb29sVmFsdWVGcm9tQXR0cihlbCwgJ3VpLWxpZ2h0LXZhbGlkYXRlLWljb24tZW5hYmxlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50SW52YWxpZENsYXNzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3VpLWxpZ2h0LXZhbGlkYXRlLWludmFsaWQtY2xhc3MnKSB8fCAnbGlnaHQtaW52YWxpZCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudFZhbGlkQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtdmFsaWQtY2xhc3MnKSB8fCAnbGlnaHQtdmFsaWQnO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnRNZXNzYWdlQ2xhc3MoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgndWktbGlnaHQtdmFsaWRhdGUtbWVzc2FnZS1jbGFzcycpIHx8ICdsaWdodC1tZXNzYWdlJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb29sVmFsdWVGcm9tQXR0cihlbDogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKChlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT09IHVuZGVmaW5lZCB8fCBlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT09ICcnIHx8IGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUoYXR0cikgPT0gJ3RydWUnKVxuICAgIH1cbiAgfVxuXG5cblxuICBwdWJsaWMgZ2V0SHRtbEljb25FbGVtZW50KGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGh0bWxEaXZJY29uRWxlbWVudDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBodG1sRGl2SWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsaWdodC12YWxpZC1pY29uJyk7XG4gICAgY29uc3QgaHRtbEljb25FbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBodG1sRGl2SWNvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbEljb25FbGVtZW50KTtcbiAgICByZXR1cm4gaHRtbERpdkljb25FbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGdldEh0bWxFcnJvckVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaHRtbFNwYW5FbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaHRtbFNwYW5FbGVtZW50Q2xhc3MgPSB0aGlzLmdldEVsZW1lbnRNZXNzYWdlQ2xhc3MoZWwpO1xuICAgIGh0bWxTcGFuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgaHRtbFNwYW5FbGVtZW50Q2xhc3MpO1xuICAgIHJldHVybiBodG1sU3BhbkVsZW1lbnQ7XG4gIH1cblxuXG59XG5cblxuIl19