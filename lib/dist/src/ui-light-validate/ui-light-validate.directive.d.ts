import { ElementRef, EventEmitter } from '@angular/core';
import { LightException } from 'light-validate';
export declare class UiLightValidateDirective {
    private elementRef;
    uiLightValidate: any;
    uiLightProperty: string;
    uiLightTarget: any;
    uiLightOnValidate: EventEmitter<LightException>;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    initialize(el: HTMLElement): void;
    isValidateOnBlurEnabled(el: HTMLElement): boolean;
    isValidateOnChangeEnabled(el: HTMLElement): boolean;
    isValidateOnKeyUpEnabled(el: HTMLElement): boolean;
    isIconEnabled(el: HTMLElement): boolean;
    getElementInvalidClass(el: HTMLElement): string;
    getElementValidClass(el: HTMLElement): string;
    getElementMessageClass(el: HTMLElement): string;
    getBoolValueFromAttr(el: HTMLElement, attr: string, defaultValue: boolean): boolean;
    getHtmlIconElement(el: HTMLElement): HTMLDivElement;
    getHtmlErrorElement(el: HTMLElement): HTMLSpanElement;
}
