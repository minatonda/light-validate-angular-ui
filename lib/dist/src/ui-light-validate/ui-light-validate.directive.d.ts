import { ElementRef, EventEmitter } from '@angular/core';
import { LightException } from 'light-validate';
import { UiLightValidateResolver } from './ui-light-validate.resolver';
export declare class UiLightValidateDirective {
    private resolver;
    private mappings;
    private el;
    validate: any;
    property: string;
    target: any;
    onValidate: EventEmitter<LightException>;
    constructor(resolver: UiLightValidateResolver, mappings: Array<any>, el: ElementRef);
    ngOnInit(): void;
    initialize(el: HTMLElement): void;
    isValidateOnBlurEnabled(el: HTMLElement): boolean;
    isValidateOnChangeEnabled(el: HTMLElement): boolean;
    isValidateOnKeyUpEnabled(el: HTMLElement): boolean;
    isIconEnabled(el: HTMLElement): boolean;
    getMapping(mapping: any, mappings?: Array<any>): any;
    getElementInvalidClass(el: HTMLElement): string;
    getElementValidClass(el: HTMLElement): string;
    getElementMessageClass(el: HTMLElement): string;
    getBoolValueFromAttr(el: HTMLElement, attr: string, defaultValue: boolean): boolean;
    getHtmlIconElement(el: HTMLElement): HTMLDivElement;
    getHtmlErrorElement(el: HTMLElement): HTMLSpanElement;
}
