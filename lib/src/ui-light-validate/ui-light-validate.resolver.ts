import { LightException } from 'light-validate';

export interface UiLightValidateResolver {
  label: (exception: LightException) => string;
}
