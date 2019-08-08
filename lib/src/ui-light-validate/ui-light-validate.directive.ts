import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { LightException, validate } from 'light-validate';

@Directive({
  selector: '[UiLightValidate]'
})
export class UiLightValidateDirective {

  @Input('UiLightValidate')
  public uiLightValidate: any;

  @Input('UiLightProperty')
  public uiLightProperty: string;

  @Input('UiLightTarget')
  public uiLightTarget: any;

  @Output('UiLightOnValidate')
  public uiLightOnValidate: EventEmitter<LightException> = new EventEmitter();

  constructor(private elementRef: ElementRef) {

  }

  public ngOnInit() {
    this.initialize(this.elementRef.nativeElement);
  }

  public initialize(el: HTMLElement) {


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

    const onValidateCatch = (errors: LightException[]) => {
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

    }


    let firstTrigger: boolean = true;
    if (this.isValidateOnBlurEnabled(el)) {
      el.onblur = (event) => {
        firstTrigger = false;
        validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
          .then(() => onValidateThen())
          .catch((errors) => onValidateCatch(errors))
          .finally(() => onValidateFinally());
      };
    };

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
      }
    }
    else if (this.isValidateOnKeyUpEnabled(el)) {
      el.onkeyup = (event) => {
        validate(this.uiLightTarget, this.uiLightValidate, this.uiLightProperty)
          .then(() => onValidateThen())
          .catch((errors) => onValidateCatch(errors))
          .finally(() => onValidateFinally());
      }
    };
  }

  public isValidateOnBlurEnabled(el: HTMLElement) {
    return this.getBoolValueFromAttr(el, 'ui-light-validate-on-blur', true);
  }

  public isValidateOnChangeEnabled(el: HTMLElement) {
    return this.getBoolValueFromAttr(el, 'ui-light-validate-on-change', true);
  }

  public isValidateOnKeyUpEnabled(el: HTMLElement) {
    return this.getBoolValueFromAttr(el, 'ui-light-validate-on-keyup', true);
  }

  public isIconEnabled(el: HTMLElement) {
    return this.getBoolValueFromAttr(el, 'ui-light-validate-icon-enabled', false);
  }

  public getElementInvalidClass(el: HTMLElement) {
    return el.getAttribute('ui-light-validate-invalid-class') || 'light-invalid';
  }

  public getElementValidClass(el: HTMLElement) {
    return el.getAttribute('ui-light-validate-valid-class') || 'light-valid';
  }

  public getElementMessageClass(el: HTMLElement) {
    return el.getAttribute('ui-light-validate-message-class') || 'light-message';
  }

  public getBoolValueFromAttr(el: HTMLElement, attr: string, defaultValue: boolean) {
    if ((el.getAttribute(attr) === undefined || el.getAttribute(attr) === '' || el.getAttribute(attr) === null)) {
      return defaultValue;
    }
    else {
      return (el.getAttribute(attr) == 'true')
    }
  }



  public getHtmlIconElement(el: HTMLElement) {
    const htmlDivIconElement: HTMLDivElement = document.createElement('div');
    htmlDivIconElement.setAttribute('class', 'light-valid-icon');
    const htmlIconElement: HTMLElement = document.createElement('i');
    htmlDivIconElement.appendChild(htmlIconElement);
    return htmlDivIconElement;
  }

  public getHtmlErrorElement(el: HTMLElement) {
    const htmlSpanElement: HTMLSpanElement = document.createElement('span');
    const htmlSpanElementClass = this.getElementMessageClass(el);
    htmlSpanElement.setAttribute('class', htmlSpanElementClass);
    return htmlSpanElement;
  }


}


