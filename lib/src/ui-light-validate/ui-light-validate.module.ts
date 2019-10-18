import { ModuleWithProviders, NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER, MAPPINGS } from './ui-light-validate.injection-tokens';
import { UiLightValidateResolver } from './ui-light-validate.resolver';
import { UiLightValidateConfig } from './ui-light-validate.coonfig';

@NgModule({
  declarations: [UiLightValidateDirective],
  exports: [UiLightValidateDirective],
  providers: [
    { provide: RESOLVER, useValue: undefined },
    { provide: MAPPINGS, useValue: undefined }
  ]
})
export class UiLightValidateModule {
  public static forRoot(
    config: Partial<UiLightValidateConfig>
  ): ModuleWithProviders {
    return {
      ngModule: UiLightValidateModule,
      providers: [
        { provide: RESOLVER, useValue: config.resolver },
        { provide: MAPPINGS, useValue: config.mappings }
      ]
    }
  }
}
