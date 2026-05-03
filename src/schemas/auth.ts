import { z } from "zod";
import { validateCpf, validatePhone } from "@/utils/validations";

/**
 * Authentication and User Schemas
 */

export const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(150, "E-mail muito longo"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(100),
  recaptchaToken: z.string().min(1, "Token de segurança obrigatório"),
});

export const registrationSchema = z.object({
  nome: z.string().trim().min(3, "Nome muito curto").max(150, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(150, "E-mail muito longo"),
  cpf: z.string().trim().refine(validateCpf, "CPF inválido"),
  telefone: z.string().trim().refine(validatePhone, "Telefone inválido"),
  senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").max(100),
  confirmar: z.string(),
  lgpd: z.boolean().refine((val) => val === true, "Você deve aceitar os termos"),
  recaptchaToken: z.string().min(1, "Token de segurança obrigatório"),
}).refine((data) => data.senha === data.confirmar, {
  message: "As senhas não coincidem",
  path: ["confirmar"],
});

export const recoverySchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(150, "E-mail muito longo"),
  recaptchaToken: z.string().min(1, "Token de segurança obrigatório"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegistrationForm = z.infer<typeof registrationSchema>;
export type RecoveryForm = z.infer<typeof recoverySchema>;
