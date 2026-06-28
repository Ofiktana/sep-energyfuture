export const PASSWORD_RULES = [
  {
    id: 'uppercase',
    label: 'At least one capital letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    label: 'At least one number',
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    label: 'At least one special character',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function getPasswordValidation(password) {
  return PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));
}

export function isPasswordValid(password) {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}
