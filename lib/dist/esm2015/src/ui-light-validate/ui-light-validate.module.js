var UiLightValidateModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER } from './ui-light-validate.injection-tokens';
const ɵ0 = undefined;
let UiLightValidateModule = UiLightValidateModule_1 = class UiLightValidateModule {
    static forRoot(resolver) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: resolver }
            ]
        };
    }
};
UiLightValidateModule = UiLightValidateModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [UiLightValidateDirective],
        exports: [UiLightValidateDirective],
        providers: [
            { provide: RESOLVER, useValue: ɵ0 }
        ]
    })
], UiLightValidateModule);
export { UiLightValidateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7V0FPN0IsU0FBUztBQUc1QyxJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBcUI7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FDbkIsUUFBaUM7UUFFakMsT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO2FBQzFDO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBWFkscUJBQXFCO0lBUGpDLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ25DLFNBQVMsRUFBRTtZQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLElBQVcsRUFBRTtTQUMzQztLQUNGLENBQUM7R0FDVyxxQkFBcUIsQ0FXakM7U0FYWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUkVTT0xWRVIgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLmluamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgVWlMaWdodFZhbGlkYXRlUmVzb2x2ZXIgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLnJlc29sdmVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1VpTGlnaHRWYWxpZGF0ZURpcmVjdGl2ZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogUkVTT0xWRVIsIHVzZVZhbHVlOiB1bmRlZmluZWQgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFVpTGlnaHRWYWxpZGF0ZU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChcbiAgICByZXNvbHZlcjogVWlMaWdodFZhbGlkYXRlUmVzb2x2ZXJcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBVaUxpZ2h0VmFsaWRhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBSRVNPTFZFUiwgdXNlVmFsdWU6IHJlc29sdmVyIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==