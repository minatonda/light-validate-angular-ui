import { LightRule } from 'light-validate';

export const LightRuleMustBeTheSame = (property) => {
  const rule: LightRule = async (value, target) => {
    if (value === target[property]) {
      throw 'Value must be the same';
    }
  }
  return rule;
}
