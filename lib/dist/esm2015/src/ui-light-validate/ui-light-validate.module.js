var UiLightValidateModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER, MAPPINGS } from './ui-light-validate.injection-tokens';
const ɵ0 = undefined, ɵ1 = undefined;
let UiLightValidateModule = UiLightValidateModule_1 = class UiLightValidateModule {
    static forRoot(config) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: config.resolver },
                { provide: MAPPINGS, useValue: config.mappings }
            ]
        };
    }
};
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
export { UiLightValidateModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO1dBUXZDLFNBQVMsT0FDVCxTQUFTO0FBRzVDLElBQWEscUJBQXFCLDZCQUFsQyxNQUFhLHFCQUFxQjtJQUN6QixNQUFNLENBQUMsT0FBTyxDQUNuQixNQUFzQztRQUV0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUFxQjtZQUMvQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7YUFDakQ7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFaWSxxQkFBcUI7SUFSakMsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDbkMsU0FBUyxFQUFFO1lBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBVyxFQUFFO1lBQzFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLElBQVcsRUFBRTtTQUMzQztLQUNGLENBQUM7R0FDVyxxQkFBcUIsQ0FZakM7U0FaWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUkVTT0xWRVIsIE1BUFBJTkdTIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IFVpTGlnaHRWYWxpZGF0ZVJlc29sdmVyIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5yZXNvbHZlcic7XG5pbXBvcnQgeyBVaUxpZ2h0VmFsaWRhdGVDb25maWcgfSBmcm9tICcuL3VpLWxpZ2h0LXZhbGlkYXRlLmNvb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtVaUxpZ2h0VmFsaWRhdGVEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVWlMaWdodFZhbGlkYXRlRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBSRVNPTFZFUiwgdXNlVmFsdWU6IHVuZGVmaW5lZCB9LFxuICAgIHsgcHJvdmlkZTogTUFQUElOR1MsIHVzZVZhbHVlOiB1bmRlZmluZWQgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFVpTGlnaHRWYWxpZGF0ZU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maWc6IFBhcnRpYWw8VWlMaWdodFZhbGlkYXRlQ29uZmlnPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFVpTGlnaHRWYWxpZGF0ZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFJFU09MVkVSLCB1c2VWYWx1ZTogY29uZmlnLnJlc29sdmVyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTUFQUElOR1MsIHVzZVZhbHVlOiBjb25maWcubWFwcGluZ3MgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19