import { getPasswordValidation } from '../utils/passwordValidation';

export default function PasswordFeedback({ password }) {
  const rules = getPasswordValidation(password);

  if (!password) return null;

  return (
    <ul className="password-requirements" aria-live="polite">
      {rules.map((rule) => (
        <li
          key={rule.id}
          className={`password-requirement ${rule.passed ? 'passed' : 'failed'}`}
        >
          <span className="password-requirement-icon" aria-hidden="true">
            {rule.passed ? '✓' : '○'}
          </span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
