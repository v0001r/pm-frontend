import { api } from "./api";
import type { ApiResponse } from "./types";

export type UploadContext =
  | "settings-logo"
  | "settings-favicon"
  | "ticket-attachment"
  | "user-avatar";

export interface UploadedFileRef {
  name: string;
  size: string;
  url: string;
  key: string;
  contentType?: string;
}

export const UPLOAD_MAX_FILES = 5;
export const UPLOAD_MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadFile(
  file: File,
  context: UploadContext,
  options?: { ticketId?: string },
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("context", context);
  if (options?.ticketId) {
    formData.append("ticketId", options.ticketId);
  }

  const { data } = await api.post<ApiResponse<UploadedFileRef>>("/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data;
}

export async function uploadFiles(
  files: File[],
  context: UploadContext,
  options?: { ticketId?: string; maxFiles?: number },
) {
  const maxFiles = options?.maxFiles ?? UPLOAD_MAX_FILES;
  const selected = files.slice(0, maxFiles);

  return Promise.all(
    selected.map((file) => {
      if (file.size > UPLOAD_MAX_FILE_SIZE) {
        throw new Error(`${file.name} exceeds the 10MB limit`);
      }
      return uploadFile(file, context, options);
    }),
  );
}
