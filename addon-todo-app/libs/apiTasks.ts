import { UploadTasksFileOptions, GetTasksFileOptions } from '../types/tasks';

export const uploadTasksFile = async ({ filename, fileContent, accessToken }: UploadTasksFileOptions): Promise<boolean> => {
  const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/addon_todo/${encodeURIComponent(filename)}:/content`;

  const headers: HeadersInit = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
      "Content-Length": (typeof fileContent === 'string' ? fileContent.length : fileContent.byteLength).toString()
  };

  try {
      const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: headers,
          body: fileContent
      });

      if (response.ok) {
          return true;
      }

      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
      console.error(`Error uploading file:`, error);
      throw error;
  }
}

export const getTasksFile = async ({ filename, accessToken }: GetTasksFileOptions): Promise<any> => {    
  const fileUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/addon_todo/${encodeURIComponent(filename)}:/content`;

  try {
      const response: Response = await fetch(fileUrl, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${accessToken}`
          }
      });

      if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          throw new Error(`Failed to fetch tasks file. Status: ${response.status}`);
      }

      const tasks = await response.json(); 
      return tasks;
      
  } catch (error) {
      console.error("Error fetching tasks file: ", error);
      throw error;
  }
}