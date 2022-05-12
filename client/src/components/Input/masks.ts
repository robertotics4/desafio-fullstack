export function phoneMask(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  let { value } = e.currentTarget;

  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');

  e.currentTarget.value = value;

  return e;
}

export function cpfCnpjMask(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 18;

  let { value } = e.currentTarget;

  if (value.length < 15) {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } else {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  e.currentTarget.value = value;

  return e;
}
