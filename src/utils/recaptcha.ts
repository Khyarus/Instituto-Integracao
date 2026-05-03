/**
 * reCAPTCHA v3 Execution Utility
 */

export const executeRecaptcha = async (action: string): Promise<string> => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    if (import.meta.env.DEV) {
      console.warn("reCAPTCHA site key not found. Using mock token.");
      return "mock-token";
    }
    throw new Error("reCAPTCHA key is missing");
  }
  
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (typeof window.grecaptcha === "undefined") {
      reject(new Error("reCAPTCHA não carregado. Verifique sua conexão."));
      return;
    }
    
    // @ts-ignore
    window.grecaptcha.ready(() => {
      // @ts-ignore
      window.grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
};
