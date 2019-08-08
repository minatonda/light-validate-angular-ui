import { LightRule } from 'light-validate';

export const LightRuleOnlyNumber: LightRule = async (value, target) => {
  if ((typeof value) !== 'number') {
    throw 'Value is not a Number';
  }
}
