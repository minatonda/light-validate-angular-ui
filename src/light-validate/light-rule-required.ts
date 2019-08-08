import { LightRule } from 'light-validate';

export const LightRuleRequired: LightRule = async (value, target) => {
  if (!value) {
    throw 'Value must be not empty';
  }
}
