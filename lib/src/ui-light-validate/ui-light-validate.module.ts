import { ModuleWithProviders, NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER } from './ui-light-validate.injection-tokens';
import { UiLightValidateResolver } from './ui-light-validate.resolver';

@NgModule({
  declarations: [UiLightValidateDirective],
  exports: [UiLightValidateDirective],
  providers: [
    { provide: RESOLVER, useValue: undefined }
  ]
})
export class UiLightValidateModule {
  public static forRoot(
    resolver: UiLightValidateResolver
  ): ModuleWithProviders {
    return {
      ngModule: UiLightValidateModule,
      providers: [
        { provide: RESOLVER, useValue: resolver }
      ]
    }
  }
}
