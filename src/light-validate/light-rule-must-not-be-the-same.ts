import { LightRule } from 'light-validate';

export const LightRuleMustNotBeTheSame = (property) => {
  const rule: LightRule = async (value, target) => {
    if (value === target[property]) {
      throw 'Value must not be the same';
    }
  }
  return rule;
}
