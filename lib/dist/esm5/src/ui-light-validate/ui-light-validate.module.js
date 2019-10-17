import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UiLightValidateDirective } from './ui-light-validate.directive';
import { RESOLVER } from './ui-light-validate.injection-tokens';
var ɵ0 = undefined;
var UiLightValidateModule = /** @class */ (function () {
    function UiLightValidateModule() {
    }
    UiLightValidateModule_1 = UiLightValidateModule;
    UiLightValidateModule.forRoot = function (resolver) {
        return {
            ngModule: UiLightValidateModule_1,
            providers: [
                { provide: RESOLVER, useValue: resolver }
            ]
        };
    };
    var UiLightValidateModule_1;
    UiLightValidateModule = UiLightValidateModule_1 = tslib_1.__decorate([
        NgModule({
            declarations: [UiLightValidateDirective],
            exports: [UiLightValidateDirective],
            providers: [
                { provide: RESOLVER, useValue: ɵ0 }
            ]
        })
    ], UiLightValidateModule);
    return UiLightValidateModule;
}());
export { UiLightValidateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGlnaHQtdmFsaWRhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlnaHQtdmFsaWRhdGUtYW5ndWxhci11aS8iLCJzb3VyY2VzIjpbInNyYy91aS1saWdodC12YWxpZGF0ZS91aS1saWdodC12YWxpZGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztTQU83QixTQUFTO0FBRzVDO0lBQUE7SUFXQSxDQUFDOzhCQVhZLHFCQUFxQjtJQUNsQiw2QkFBTyxHQUFyQixVQUNFLFFBQWlDO1FBRWpDLE9BQU87WUFDTCxRQUFRLEVBQUUsdUJBQXFCO1lBQy9CLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTthQUMxQztTQUNGLENBQUE7SUFDSCxDQUFDOztJQVZVLHFCQUFxQjtRQVBqQyxRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNuQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBVyxFQUFFO2FBQzNDO1NBQ0YsQ0FBQztPQUNXLHFCQUFxQixDQVdqQztJQUFELDRCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVpTGlnaHRWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdWktbGlnaHQtdmFsaWRhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJFU09MVkVSIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IFVpTGlnaHRWYWxpZGF0ZVJlc29sdmVyIH0gZnJvbSAnLi91aS1saWdodC12YWxpZGF0ZS5yZXNvbHZlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1VpTGlnaHRWYWxpZGF0ZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtVaUxpZ2h0VmFsaWRhdGVEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IFJFU09MVkVSLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBVaUxpZ2h0VmFsaWRhdGVNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoXG4gICAgcmVzb2x2ZXI6IFVpTGlnaHRWYWxpZGF0ZVJlc29sdmVyXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVWlMaWdodFZhbGlkYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogUkVTT0xWRVIsIHVzZVZhbHVlOiByZXNvbHZlciB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=