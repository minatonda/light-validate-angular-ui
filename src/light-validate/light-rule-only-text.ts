import { LightRule } from 'light-validate';

export const LightRuleOnlyText: LightRule = async (value, target) => {
  if ((typeof value) !== 'string') {
    throw 'Value is not a Text';
  }
}
