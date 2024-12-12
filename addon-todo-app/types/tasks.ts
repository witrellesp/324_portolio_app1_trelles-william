export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface GetTasksFileOptions {
  filename: string;
  accessToken: string;
}

export interface UploadTasksFileOptions {
  filename: string;
  fileContent: string | ArrayBuffer;
  accessToken: string;
}
