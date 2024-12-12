export const authenticateWithMicrosoft = (authUrl: string, askForLogin: boolean, timeoutMs: number = 1000): Promise<string> => {
  return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
          reject(new Error('Timeout lors de la tentative d\'authentification.'));
      }, timeoutMs);

      browser.identity.launchWebAuthFlow(
          {
              url: authUrl,
              interactive: askForLogin
          },
          (resultUrl: string | undefined) => {
              clearTimeout(timer);

              if (browser.runtime.lastError) {
                  console.error('Erreur lors de l\'authentification:', browser.runtime.lastError);
                  return reject(browser.runtime.lastError);
              }

              if (!resultUrl) {
                  return reject(new Error('URL de résultat manquante.'));
              }

              const url = new URL(resultUrl);
              const match = url.hash.match(/access_token=([^&]*)/);
              const accessToken = match ? match[1] : null;

              if (accessToken) {
                  resolve(accessToken);
              } else {
                  reject(new Error('Token d\'accès manquant.'));
              }
          }
      );
  });
}