/**
 * Custom Input Validations
 */

/**
 * Validates a CPF using checksum digits.
 * 
 * @param cpf - The CPF string (raw or formatted).
 * @returns true if valid, false otherwise.
 */
export const validateCpf = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11 || !!cleaned.match(/(\d)\1{10}/)) return false;

  const calculateDigit = (slice: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += parseInt(slice[i]) * (factor - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calculateDigit(cleaned.substring(0, 9), 10);
  const digit2 = calculateDigit(cleaned.substring(0, 10), 11);

  return digit1 === parseInt(cleaned[9]) && digit2 === parseInt(cleaned[10]);
};

/**
 * Validates Brazilian telephone format: (00) 00000-0000 or (00) 0000-0000
 * 
 * @param phone - The raw phone string.
 * @returns true if valid.
 */
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 11;
};
