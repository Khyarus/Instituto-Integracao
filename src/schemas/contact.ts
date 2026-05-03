import { z } from "zod";

/**
 * Contact Form Schema
 */
export const contactSchema = z.object({
  nome: z.string().trim().min(3, "Nome muito curto").max(150, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(150, "E-mail muito longo"),
  telefone: z.string().trim().optional().or(z.string().length(0)),
  mensagem: z.string().trim().min(10, "A mensagem deve ter pelo menos 10 caracteres").max(2000, "Mensagem muito longa"),
  lgpd: z.boolean().refine((val) => val === true, "Você deve aceitar os termos"),
  recaptchaToken: z.string().min(1, "Token de segurança obrigatório"),
});

export type ContactForm = z.infer<typeof contactSchema>;
