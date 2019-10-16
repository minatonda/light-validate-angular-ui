(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./lib/dist/fesm2015/light-validate-angular-ui.js":
/*!********************************************************!*\
  !*** ./lib/dist/fesm2015/light-validate-angular-ui.js ***!
  \********************************************************/
/*! exports provided: UiLightValidateDirective, UiLightValidateModule, ɵ0, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiLightValidateDirective", function() { return UiLightValidateDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiLightValidateModule", function() { return UiLightValidateModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return RESOLVER; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var light_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! light-validate */ "./node_modules/light-validate/index.js");
/* harmony import */ var light_validate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(light_validate__WEBPACK_IMPORTED_MODULE_2__);




const RESOLVER = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('ui-light-validate.resolver');

let UiLightValidateDirective = class UiLightValidateDirective {
    constructor(resolver, el) {
        this.resolver = resolver;
        this.el = el;
        this.onValidate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        this.initialize(this.el.nativeElement);
    }
    initialize(el) {
        // criar span que irá conter o erro.
        const htmlErrorElement = this.getHtmlErrorElement(el);
        if (this.isIconEnabled(el)) {
            // criar div que irá conter o icone referente a validação
            const htmlIconElement = this.getHtmlIconElement(el);
            !el.parentNode.contains(htmlIconElement) && el.parentNode.insertBefore(htmlIconElement, el);
        }
        const onValidateThen = () => {
            //remover span com classe 'error' referente ao campo do DOM...caso já esteja presente
            el.parentNode.contains(htmlErrorElement) && el.parentNode.removeChild(htmlErrorElement);
            el.parentElement.classList.remove(this.getElementInvalidClass(el));
            el.parentElement.classList.add(this.getElementValidClass(el));
            //disparar callback externo onValidate
            this.onValidate.emit(null);
        };
        const onValidateCatch = (exceptions) => {
            const exception = exceptions.shift();
            if (exception) {
                //setar texto do span com classe 'error' referente ao campo do DOM...
                htmlErrorElement.innerHTML = this.resolver ? this.resolver.label(exception) : exception.code;
                //adicionar span com classe 'error' referente ao campo do DOM...caso já não esteja presente
                !el.parentNode.contains(htmlErrorElement) && el.parentNode.appendChild(htmlErrorElement);
                el.parentElement.classList.add(this.getElementInvalidClass(el));
                el.parentElement.classList.remove(this.getElementValidClass(el));
                //disparar callback externo onValidate
                this.onValidate.emit(exception);
            }
            else {
                onValidateThen();
            }
        };
        const onValidateFinally = () => {
        };
        let firstTrigger = true;
        if (this.isValidateOnBlurEnabled(el)) {
            el.onblur = (event) => {
                firstTrigger = false;
                Object(light_validate__WEBPACK_IMPORTED_MODULE_2__["validate"])(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        ;
        if (this.isValidateOnChangeEnabled(el)) {
            el.onchange = (event) => {
                firstTrigger = false;
                Object(light_validate__WEBPACK_IMPORTED_MODULE_2__["validate"])(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        if (this.isValidateOnBlurEnabled(el) || this.isValidateOnChangeEnabled(el)) {
            el.onkeyup = (event) => {
                const isKeydown = el.getAttribute('modal-rule-keydown');
                if (!firstTrigger || isKeydown) {
                    Object(light_validate__WEBPACK_IMPORTED_MODULE_2__["validate"])(this.target, this.validate, this.property)
                        .then(() => onValidateThen())
                        .catch((errors) => onValidateCatch(errors))
                        .finally(() => onValidateFinally());
                }
            };
        }
        else if (this.isValidateOnKeyUpEnabled(el)) {
            el.onkeyup = (event) => {
                Object(light_validate__WEBPACK_IMPORTED_MODULE_2__["validate"])(this.target, this.validate, this.property)
                    .then(() => onValidateThen())
                    .catch((errors) => onValidateCatch(errors))
                    .finally(() => onValidateFinally());
            };
        }
        ;
    }
    isValidateOnBlurEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-blur', true);
    }
    isValidateOnChangeEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-change', true);
    }
    isValidateOnKeyUpEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-on-keyup', true);
    }
    isIconEnabled(el) {
        return this.getBoolValueFromAttr(el, 'ui-light-validate-icon-enabled', false);
    }
    getElementInvalidClass(el) {
        return el.getAttribute('ui-light-validate-invalid-class') || 'light-invalid';
    }
    getElementValidClass(el) {
        return el.getAttribute('ui-light-validate-valid-class') || 'light-valid';
    }
    getElementMessageClass(el) {
        return el.getAttribute('ui-light-validate-message-class') || 'light-message';
    }
    getBoolValueFromAttr(el, attr, defaultValue) {
        if ((el.getAttribute(attr) === undefined || el.getAttribute(attr) === '' || el.getAttribute(attr) === null)) {
            return defaultValue;
        }
        else {
            return (el.getAttribute(attr) == 'true');
        }
    }
    getHtmlIconElement(el) {
        const htmlDivIconElement = document.createElement('div');
        htmlDivIconElement.setAttribute('class', 'light-valid-icon');
        const htmlIconElement = document.createElement('i');
        htmlDivIconElement.appendChild(htmlIconElement);
        return htmlDivIconElement;
    }
    getHtmlErrorElement(el) {
        const htmlSpanElement = document.createElement('span');
        const htmlSpanElementClass = this.getElementMessageClass(el);
        htmlSpanElement.setAttribute('class', htmlSpanElementClass);
        return htmlSpanElement;
    }
};
UiLightValidateDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [RESOLVER,] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('UiLightValidate')
], UiLightValidateDirective.prototype, "validate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('UiLightProperty')
], UiLightValidateDirective.prototype, "property", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('UiLightTarget')
], UiLightValidateDirective.prototype, "target", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('UiLightOnValidate')
], UiLightValidateDirective.prototype, "onValidate", void 0);
UiLightValidateDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[UiLightValidate]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RESOLVER))
], UiLightValidateDirective);

var UiLightValidateModule_1;
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
UiLightValidateModule = UiLightValidateModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [UiLightValidateDirective],
        exports: [UiLightValidateDirective],
        providers: [
            { provide: RESOLVER, useValue: ɵ0 }
        ]
    })
], UiLightValidateModule);

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=light-validate-angular-ui.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container-fluid pt-2\">\n  <div class=\"row\">\n    <div class=\"col-12 col-md-12 form-group\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-12 form-group\">\n              <label class=\"control-label\">Name</label>\n              <input class=\"form-control\" type=\"text\" placeholder=\"Name\" [(ngModel)]=\"appModel.name\"\n                [UiLightValidate]=\"lightRuleMapping\" UiLightProperty=\"name\" [UiLightTarget]=\"appModel\">\n            </div>\n            <div class=\"col-12 form-group\">\n              <label class=\"control-label\">UserName</label>\n              <input class=\"form-control\" type=\"text\" placeholder=\"Username\" [(ngModel)]=\"appModel.username\"\n                [UiLightValidate]=\"lightRuleMapping\" UiLightProperty=\"username\" [UiLightTarget]=\"appModel\">\n            </div>\n            <div class=\"col-12 form-group\">\n              <label class=\"control-label\">Password</label>\n              <input class=\"form-control\" type=\"number\" placeholder=\"Password\" [(ngModel)]=\"appModel.password\"\n                [UiLightValidate]=\"lightRuleMapping\" UiLightProperty=\"password\" [UiLightTarget]=\"appModel\">\n            </div>\n            <div class=\"col-12 form-group\">\n              <label class=\"control-label\">ConfirmPassword</label>\n              <input class=\"form-control\" type=\"number\" placeholder=\"Confirm Password\"\n                [(ngModel)]=\"appModel.confirmPassword\" [UiLightValidate]=\"lightRuleMapping\"\n                UiLightProperty=\"confirmPassword\" [UiLightTarget]=\"appModel\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-12 col-md-12 form-group\">\n      <b>See code below</b>\n      <hr>\n    </div>\n    <div class=\"col-12 col-md-12 form-group\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          component.ts\n        </div>\n        <div class=\"card-body\">\n          <pre>\n            <code>{{getHtmlComponent()}}</code>\n          </pre>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-12 col-md-12 form-group\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          model.light-mapping.ts\n        </div>\n        <div class=\"card-body\">\n          <pre>\n                <code>{{getHtmlLightMapping()}}</code>\n              </pre>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-12 col-md-12 form-group\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          component.html\n        </div>\n        <div class=\"card-body\">\n          <pre>\n              <code>{{getHtmlTemplate()}}</code>\n            </pre>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_light_validate_user_light_mapping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/light-validate/user.light-mapping */ "./src/light-validate/user.light-mapping.ts");



let AppComponent = class AppComponent {
    constructor() {
        this.title = 'light-validate-angular-ui';
        this.lightRuleMapping = src_light_validate_user_light_mapping__WEBPACK_IMPORTED_MODULE_2__["UserLightMapping"];
        this.appModel = {};
    }
    getHtmlTemplate() {
        return __webpack_require__(/*! ./template.json */ "./src/app/template.json");
    }
    getHtmlComponent() {
        return __webpack_require__(/*! ./component.json */ "./src/app/component.json");
    }
    getHtmlLightMapping() {
        return __webpack_require__(/*! ./lightmapping.json */ "./src/app/lightmapping.json");
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var light_validate_angular_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! light-validate-angular-ui */ "./lib/dist/fesm2015/light-validate-angular-ui.js");







let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            light_validate_angular_ui__WEBPACK_IMPORTED_MODULE_6__["UiLightValidateModule"].forRoot({
                label: (exception) => {
                    return `${exception.code} ${exception.property}`;
                }
            })
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/component.json":
/*!********************************!*\
  !*** ./src/app/component.json ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module) {

module.exports = JSON.parse("\"\\nexport class AppComponent {\\n\\n  constructor() { }\\n\\n  public lightRuleMapping = UserLightMapping;\\n  public appModel: Partial<UserLightMapping> = {};\\n\\n}\"");

/***/ }),

/***/ "./src/app/lightmapping.json":
/*!***********************************!*\
  !*** ./src/app/lightmapping.json ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module) {

module.exports = JSON.parse("\"\\nimport { LightValidate } from 'light-validate';\\nimport { LightRuleOnlyText } from './light-rule-only-text';\\nimport { LightRuleOnlyNumber } from './light-rule-only-number';\\nimport { LightRuleMustNotBeTheSame } from './light-rule-must-not-be-the-same';\\nimport { LightRuleMustBeTheSame } from './light-rule-must-be-the-same';\\nimport { LightRuleRequired } from './light-rule-required';\\n\\nexport class UserLightMapping {\\n\\n  @LightValidate(LightRuleRequired, LightRuleOnlyText)\\n  public name: string = undefined;\\n\\n  @LightValidate(LightRuleRequired, LightRuleOnlyText, LightRuleMustNotBeTheSame('name'))\\n  public username: string = undefined;\\n\\n  @LightValidate(LightRuleRequired, LightRuleOnlyNumber)\\n  public password: string = undefined;\\n\\n  @LightValidate(LightRuleRequired, LightRuleOnlyNumber, LightRuleMustBeTheSame('password'))\\n  public confirmPassword: string = undefined;\\n\\n}\\n\"");

/***/ }),

/***/ "./src/app/template.json":
/*!*******************************!*\
  !*** ./src/app/template.json ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module) {

module.exports = JSON.parse("\"\\n<div class=\\\"col-12 form-group\\\">\\n    <label class=\\\"control-label\\\">Name</label>\\n    <input class=\\\"form-control\\\" type=\\\"text\\\" placeholder=\\\"Name\\\" [(ngModel)]=\\\"appModel.name\\\" [UiLightValidate]=\\\"lightRuleMapping\\\" UiLightProperty=\\\"name\\\" [UiLightTarget]=\\\"appModel\\\">\\n</div>\\n<div class=\\\"col-12 form-group\\\">\\n    <label class=\\\"control-label\\\">UserName</label>\\n    <input class=\\\"form-control\\\" type=\\\"text\\\" placeholder=\\\"Username\\\" [(ngModel)]=\\\"appModel.username\\\" [UiLightValidate]=\\\"lightRuleMapping\\\" UiLightProperty=\\\"username\\\" [UiLightTarget]=\\\"appModel\\\">\\n</div>\\n<div class=\\\"col-12 form-group\\\">\\n    <label class=\\\"control-label\\\">Password</label>\\n    <input class=\\\"form-control\\\" type=\\\"number\\\" placeholder=\\\"Password\\\" [(ngModel)]=\\\"appModel.password\\\" [UiLightValidate]=\\\"lightRuleMapping\\\" UiLightProperty=\\\"password\\\" [UiLightTarget]=\\\"appModel\\\">\\n</div>\\n<div class=\\\"col-12 form-group\\\">\\n    <label class=\\\"control-label\\\">ConfirmPassword</label>\\n    <input class=\\\"form-control\\\" type=\\\"number\\\" placeholder=\\\"Confirm Password\\\" [(ngModel)]=\\\"appModel.confirmPassword\\\" [UiLightValidate]=\\\"lightRuleMapping\\\" UiLightProperty=\\\"confirmPassword\\\" [UiLightTarget]=\\\"appModel\\\">\\n</div>\"");

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/light-validate/light-rule-must-be-the-same.ts":
/*!***********************************************************!*\
  !*** ./src/light-validate/light-rule-must-be-the-same.ts ***!
  \***********************************************************/
/*! exports provided: LightRuleMustBeTheSame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightRuleMustBeTheSame", function() { return LightRuleMustBeTheSame; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const LightRuleMustBeTheSame = (property) => {
    const rule = (value, target) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
        if (value !== target[property]) {
            throw 'Value must be the same';
        }
    });
    return rule;
};


/***/ }),

/***/ "./src/light-validate/light-rule-must-not-be-the-same.ts":
/*!***************************************************************!*\
  !*** ./src/light-validate/light-rule-must-not-be-the-same.ts ***!
  \***************************************************************/
/*! exports provided: LightRuleMustNotBeTheSame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightRuleMustNotBeTheSame", function() { return LightRuleMustNotBeTheSame; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const LightRuleMustNotBeTheSame = (property) => {
    const rule = (value, target) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
        if (value === target[property]) {
            throw 'Value must not be the same';
        }
    });
    return rule;
};


/***/ }),

/***/ "./src/light-validate/light-rule-only-number.ts":
/*!******************************************************!*\
  !*** ./src/light-validate/light-rule-only-number.ts ***!
  \******************************************************/
/*! exports provided: LightRuleOnlyNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightRuleOnlyNumber", function() { return LightRuleOnlyNumber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const LightRuleOnlyNumber = (value, target) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    if ((typeof value) !== 'number') {
        throw 'Value is not a Number';
    }
});


/***/ }),

/***/ "./src/light-validate/light-rule-only-text.ts":
/*!****************************************************!*\
  !*** ./src/light-validate/light-rule-only-text.ts ***!
  \****************************************************/
/*! exports provided: LightRuleOnlyText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightRuleOnlyText", function() { return LightRuleOnlyText; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const LightRuleOnlyText = (value, target) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    if ((typeof value) !== 'string') {
        throw 'Value is not a Text';
    }
});


/***/ }),

/***/ "./src/light-validate/light-rule-required.ts":
/*!***************************************************!*\
  !*** ./src/light-validate/light-rule-required.ts ***!
  \***************************************************/
/*! exports provided: LightRuleRequired */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightRuleRequired", function() { return LightRuleRequired; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const LightRuleRequired = (value, target) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    if (!value) {
        throw 'Value must be not empty';
    }
});


/***/ }),

/***/ "./src/light-validate/user.light-mapping.ts":
/*!**************************************************!*\
  !*** ./src/light-validate/user.light-mapping.ts ***!
  \**************************************************/
/*! exports provided: UserLightMapping */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLightMapping", function() { return UserLightMapping; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var light_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! light-validate */ "./node_modules/light-validate/index.js");
/* harmony import */ var light_validate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(light_validate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _light_rule_only_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./light-rule-only-text */ "./src/light-validate/light-rule-only-text.ts");
/* harmony import */ var _light_rule_only_number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./light-rule-only-number */ "./src/light-validate/light-rule-only-number.ts");
/* harmony import */ var _light_rule_must_not_be_the_same__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./light-rule-must-not-be-the-same */ "./src/light-validate/light-rule-must-not-be-the-same.ts");
/* harmony import */ var _light_rule_must_be_the_same__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./light-rule-must-be-the-same */ "./src/light-validate/light-rule-must-be-the-same.ts");
/* harmony import */ var _light_rule_required__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./light-rule-required */ "./src/light-validate/light-rule-required.ts");







class UserLightMapping {
    constructor() {
        this.name = undefined;
        this.username = undefined;
        this.password = undefined;
        this.confirmPassword = undefined;
    }
}
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(light_validate__WEBPACK_IMPORTED_MODULE_1__["LightValidate"])(_light_rule_required__WEBPACK_IMPORTED_MODULE_6__["LightRuleRequired"], _light_rule_only_text__WEBPACK_IMPORTED_MODULE_2__["LightRuleOnlyText"])
], UserLightMapping.prototype, "name", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(light_validate__WEBPACK_IMPORTED_MODULE_1__["LightValidate"])(_light_rule_required__WEBPACK_IMPORTED_MODULE_6__["LightRuleRequired"], _light_rule_only_text__WEBPACK_IMPORTED_MODULE_2__["LightRuleOnlyText"], Object(_light_rule_must_not_be_the_same__WEBPACK_IMPORTED_MODULE_4__["LightRuleMustNotBeTheSame"])('name'))
], UserLightMapping.prototype, "username", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(light_validate__WEBPACK_IMPORTED_MODULE_1__["LightValidate"])(_light_rule_required__WEBPACK_IMPORTED_MODULE_6__["LightRuleRequired"], _light_rule_only_number__WEBPACK_IMPORTED_MODULE_3__["LightRuleOnlyNumber"])
], UserLightMapping.prototype, "password", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(light_validate__WEBPACK_IMPORTED_MODULE_1__["LightValidate"])(_light_rule_required__WEBPACK_IMPORTED_MODULE_6__["LightRuleRequired"], _light_rule_only_number__WEBPACK_IMPORTED_MODULE_3__["LightRuleOnlyNumber"], Object(_light_rule_must_be_the_same__WEBPACK_IMPORTED_MODULE_5__["LightRuleMustBeTheSame"])('password'))
], UserLightMapping.prototype, "confirmPassword", void 0);


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/50DC67BEDC679D4A/source/light-validate-angular-ui/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map