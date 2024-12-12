import { authenticateWithMicrosoft } from "@/libs/apiAuth";
import { getTasksFile } from "@/libs/apiTasks";
import { createTable } from "@/libs/tableTasks";

import './style.css';
import pngLogo from './assets/logo.png';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Todo Collab</h1>
        
    <div id="connectionOffice" class="alert alert-danger"></div>

    <div id="content"></div>    
  </div>
`;

document.addEventListener("DOMContentLoaded", async function () {
  const connectionOfficeId = "connectionOffice";
  const contentId = "content";
  const clientId = '001a9dc9-24d4-4dee-8603-0c47505b7e18';
  const tenantId = '906ab908-04f9-4a80-ba9c-875a36e77bc1';
  const redirectUri = browser.identity.getRedirectURL();
  //const redirectUri = `https://${browser.runtime.id}.extensions.allizom.org/`;
  console.log(`Redirect URI: ${redirectUri}`);
  const scopes = 'openid profile User.Read Files.ReadWrite';
  let token = null;

  console.log(`Redirect URI: ${redirectUri}`);

  const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

  try {
      token = await authenticateWithMicrosoft(authUrl, false);
  } catch (error) {
      console.warn("Authentication failed:", error);
      token = null;
  }

  // Afficher un message d'avertissement si l'utilisateur n'est pas connecté
  if (!token) {
      displayConnectionWarning(connectionOfficeId, authUrl);
      return;
  }

  console.log("Token:", token);

  // Récupérer la liste des tâches et les afficher
  try {
      console.log("Fetching tasks...");
      const tasksList = await getTasksFile({ filename: "taskList.json", accessToken: token });
      const tasksTable = createTable(tasksList.tasks);

      const contentElement = document.getElementById(contentId);
      if (contentElement) {
          contentElement.innerHTML = ''; // Nettoyer le contenu avant d'ajouter les tâches
          contentElement.appendChild(tasksTable);
      }
  } catch (error) {
      console.error("Error fetching tasks:", error);
  }
});

/**
* Affiche un avertissement pour demander à l'utilisateur de se connecter.
* @param {string} connectionOfficeId - ID de l'élément où afficher le message.
* @param {string} authUrl - URL d'authentification.
*/

function displayConnectionWarning(connectionOfficeId: string, authUrl: string): void {
  const warningMessage = document.createElement('p');
  warningMessage.textContent = "Merci de vous connecter sur ";

  // Créer le lien de connexion
  const connectLink = document.createElement('a');
  connectLink.textContent = "Eduvaud";
  connectLink.href = "#";

  warningMessage.appendChild(connectLink);
  warningMessage.append(" puis de rafraîchir cette page. Après cela, veuillez cliquer sur ");
  const startExportButton = document.createElement('strong');
  startExportButton.textContent = "Démarrer l'export";
  warningMessage.appendChild(startExportButton);

  const connectionOfficeElement = document.getElementById(connectionOfficeId);
  if (connectionOfficeElement) {
      connectionOfficeElement.style.display = "block";
      connectionOfficeElement.innerHTML = ''; // Nettoyer le contenu existant
      connectionOfficeElement.appendChild(warningMessage);
  }

  // Ajouter un gestionnaire d'événements pour le lien de connexion
  connectLink.addEventListener("click", async function (e: MouseEvent) {
      e.preventDefault();
      try {
          const newToken = await authenticateWithMicrosoft(authUrl, true);
          if (newToken) {
              location.reload(); // Recharger la page après une connexion réussie
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  });
}
