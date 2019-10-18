import { UiLightValidateResolver } from './ui-light-validate.resolver';
import { InjectionToken } from '@angular/core';

export const RESOLVER = new InjectionToken<UiLightValidateResolver>('ui-light-validate.resolver');
export const MAPPINGS = new InjectionToken<UiLightValidateResolver>('ui-light-validate.mappings');
