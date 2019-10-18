import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER, MAPPINGS } from './ui-light-validate.injection-tokens';
var ɵ0 = undefined, ɵ1 = undefined;
var UiLightValidateModule = /** @class */ (function () {
    function UiLightValidateModule() {
    }
    UiLightValidateModule_1 = UiLightValidateModule;
    UiLightValidateModule.forRoot = function (config) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: config.resolver },
                { provide: MAPPINGS, useValue: config.mappings }
            ]
        };
    };
    var UiLightValidateModule_1;
    UiLightValidateModule = UiLightValidateModule_1 = tslib_1.__decorate([
        NgModule({
            declarations: [UiLightValidateDirective],
            exports: [UiLightValidateDirective],
            providers: [
                { provide: RESOLVER, useValue: ɵ0 },
                { provide: MAPPINGS, useValue: ɵ1 }
            ]
        })
    ], UiLightValidateModule);
    return UiLightValidateModule;
}());
export { UiLightValidateModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7U0FRdkMsU0FBUyxPQUNULFNBQVM7QUFHNUM7SUFBQTtJQVlBLENBQUM7OEJBWlkscUJBQXFCO0lBQ2xCLDZCQUFPLEdBQXJCLFVBQ0UsTUFBc0M7UUFFdEMsT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDaEQsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFO2FBQ2pEO1NBQ0YsQ0FBQTtJQUNILENBQUM7O0lBWFUscUJBQXFCO1FBUmpDLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ25DLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFXLEVBQUU7Z0JBQzFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLElBQVcsRUFBRTthQUMzQztTQUNGLENBQUM7T0FDVyxxQkFBcUIsQ0FZakM7SUFBRCw0QkFBQztDQUFBLEFBWkQsSUFZQztTQVpZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVaUxpZ2h0VmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSRVNPTFZFUiwgTUFQUElOR1MgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLmluamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgVWlMaWdodFZhbGlkYXRlUmVzb2x2ZXIgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLnJlc29sdmVyJztcbmltcG9ydCB7IFVpTGlnaHRWYWxpZGF0ZUNvbmZpZyB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUuY29vbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1VpTGlnaHRWYWxpZGF0ZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtVaUxpZ2h0VmFsaWRhdGVEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IFJFU09MVkVSLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyBwcm92aWRlOiBNQVBQSU5HUywgdXNlVmFsdWU6IHVuZGVmaW5lZCB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVWlMaWdodFZhbGlkYXRlTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KFxuICAgIGNvbmZpZzogUGFydGlhbDxVaUxpZ2h0VmFsaWRhdGVDb25maWc+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVWlMaWdodFZhbGlkYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogUkVTT0xWRVIsIHVzZVZhbHVlOiBjb25maWcucmVzb2x2ZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBNQVBQSU5HUywgdXNlVmFsdWU6IGNvbmZpZy5tYXBwaW5ncyB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=