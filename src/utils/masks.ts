/**
 * CPF and Data Masking Utilities
 */

/**
 * Masks a CPF showing only the last 4 digits (***.***.***-XX).
 * 
 * @param cpf - The raw CPF string.
 * @returns The masked CPF string.
 */
export const maskCpf = (cpf: string): string => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return cpf;
  return `***.***.***-${cleaned.substring(9)}`;
};

/**
 * Format a CPF (000.000.000-00).
 * 
 * @param cpf - The raw CPF string.
 * @returns The formatted CPF string.
 */
export const formatCpf = (cpf: string): string => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};
