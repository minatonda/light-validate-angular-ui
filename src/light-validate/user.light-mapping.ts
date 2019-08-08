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
