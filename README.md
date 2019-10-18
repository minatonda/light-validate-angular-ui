
# light-validate-angular-ui
Angular UI module for working with the light-validate Library.
This module provides a directive that controls properties of an html element based on a class with Light Validate mappings, and display error label when input is invalid, or hide the label when input is valid.

## Sample
https://minatonda.github.io/light-validate-angular-ui/

### Install

```sh
$ npm install -save light-validate
$ npm install -save light-validate-angular-ui
$ npm install -save reflect-metadata
```

### Development and Implementation - Configuring on Angular ...
Add the 'UiLightValidateModule' on imports array of your Component's Module.
```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular application modules.
    BrowserModule,
    CommonModule,
    FormsModule,
    // light-validate-angular-ui modules.
    UiLightValidateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
### Customize Label Messages
```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular application modules.
    BrowserModule,
    CommonModule,
    FormsModule,
    // light-validate-angular-ui modules.
    UiLightValidateModule.forRoot(
      resolver: {
        label: (exception) => {
          // the value you return here will be the value displayed in error labels error messages, use Light Exception data to compose the message as desired.
          return `${exception.code} ${exception.property}`;
        },
        mappings: [
	        // register your mapping classes here to access directly by name in the directive declaration in the template
			UserLightMapping
		]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```


### Development and Implementation - Create your LightRules ...
Create some LightRules...
```typescript
import { LightRule } from 'light-validate';

export const LightRuleRequired: LightRule = async (value, target) => {
  if (!value) {
    throw 'Value must be not empty';
  }
}

export const LightRuleMustBeTheSame = (property) => {
  const rule: LightRule = async (value, target) => {
    if (value === target[property]) {
      throw 'Value must be the same';
    }
  }
  return rule;
}

export const LightRuleMustNotBeTheSame = (property) => {
  const rule: LightRule = async (value, target) => {
    if (value === target[property]) {
      throw 'Value must not be the same';
    }
  }
  return rule;
}

export const LightRuleOnlyNumber: LightRule = async (value, target) => {
  if ((typeof value) !== 'number') {
    throw 'Value is not a Number';
  }
}

export const LightRuleOnlyText: LightRule = async (value, target) => {
  if ((typeof value) !== 'string') {
    throw 'Value is not a Text';
  }
}
```

### Development and Implementation - Create your Mapping Class ...
Create your mapping class...
```typescript
import { LightValidate } from 'light-validate';
import { LightRuleOnlyText } from './light-rule-only-text';
import { LightRuleOnlyNumber } from './light-rule-only-number';
import { LightRuleMustNotBeTheSame } from './light-rule-must-not-be-the-same';
import { LightRuleMustBeTheSame } from './light-rule-must-be-the-same';
import { LightRuleRequired } from './light-rule-required';

export class UserLightMapping {

  @LightValidate(LightRuleRequired, LightRuleOnlyText, LightRuleMustNotBeTheSame('username'))
  public name: string = undefined;

  @LightValidate(LightRuleRequired, LightRuleOnlyText, LightRuleMustNotBeTheSame('name'))
  public username: string = undefined;

  @LightValidate(LightRuleRequired, LightRuleOnlyNumber, LightRuleMustBeTheSame('confirmPassword'))
  public password: string = undefined;

  @LightValidate(LightRuleRequired, LightRuleOnlyNumber, LightRuleMustBeTheSame('password'))
  public confirmPassword: string = undefined;

}
```

### Development and Implementation - Use on Component ...
Add your target mapping class to an component property

```typescript
import { UserLightMapping } from 'src/mappings/user.light-mapping';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'light-validate-angular-ui';

  constructor() { }

  // You can also register an array of mapping classes in the forRoot function, and pass the class name as a string in the directive's 'UiLightValidate' attribute value, instead of using binding directly on the component.
  public lightRuleMapping = UserLightMapping; // <- Mapping Class Property

  // Here, I set my data model type to Partial <MyMappingClass> for typing purposes only, the typing code is optional, but the object to be validated must follow the interface of the target mapping class.
  public appModel: Partial<UserLightMapping> = {}; // <- Your Data Model.
  
  
}

```

And call the directive on your template code
```html
<!-- [UiLightValidate] attribute needs to bind the Mapping Class -->
<!-- UiLightProperty needs to receive the property name to be validated on directive -->
<!-- [UiLightTarget] attribute needs to bind target model to be validate on directive-->
<div style="text-align:center">
  <br>
  <div>
    <label>Name</label>
    <br>
    <input type="text" placeholder="Name" [(ngModel)]="appModel.name" [UiLightValidate]="lightRuleMapping"
      UiLightProperty="name" [UiLightTarget]="appModel">
  </div>
  <br>
  <div>
    <label>UserName</label>
    <br>
    <input type="text" placeholder="Username" [(ngModel)]="appModel.username" [UiLightValidate]="lightRuleMapping"
      UiLightProperty="username" [UiLightTarget]="appModel">
  </div>
  <br>
  <div>
    <label>Password</label>
    <br>
    <input type="number" placeholder="Password" [(ngModel)]="appModel.password" [UiLightValidate]="lightRuleMapping"
      UiLightProperty="password" [UiLightTarget]="appModel">
  </div>
  <br>
  <div>
    <label>ConfirmPassword</label>
    <br>
    <input type="number" 
	       placeholder="Confirm Password" 
	       [(ngModel)]="appModel.confirmPassword"
           [UiLightValidate]="lightRuleMapping" 
           UiLightProperty="confirmPassword" 
           [UiLightTarget]="appModel">
		<!--  
			If you registered the mapping class in the mappings parameter in the module's forRoot function, you can also use the name of mapping it as follows:
		    UiLightValidate="UserLightMapping" 
		!-->
  </div>
</div>
```

## Attributes

| Attribute                       	| Description                                                                          	| Type    	| Default       	|
|---------------------------------	|--------------------------------------------------------------------------------------	|---------	|---------------	|
| UiLightValidate                 	| Directive selector, also receives the mapping class directly, or the name of the class if the mapping class is registered on forRoot 'mapping' option.                                 	| Object/string  	| undefined     	|
| UiLightProperty                 	| Receives the property key of the target to be validated.                             	| string  	| undefined     	|
| UiLightTarget                   	| Receives the target to be validated.                                                 	| Object  	| undefined     	|
| ui-light-validate-on-blur       	| Enables validation on the blur event of the element.                                 	| boolean 	| true          	|
| ui-light-validate-on-change     	| Enables validation on the change event of the element.                               	| boolean 	| true          	|
| ui-light-validate-on-keyup      	| Enables validation on the keyup event of the element.                                	| boolean 	| true          	|
| ui-light-validate-icon-enabled  	| Enables the validation icon.                                                         	| boolean 	| false         	|
| ui-light-validate-invalid-class 	| Receives the name of the class that will represent the invalid state of the element. 	| string  	| light-invalid 	|
| ui-light-validate-valid-class   	| Receives the name of the class that will represent the valid state of the element.   	| string  	| light-valid   	|
| ui-light-validate-message-class 	| Receives the name of the label class that will represent the state of the element.   	| string  	| light-message 	|
