import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import {
  UPLOAD_MAX_FILES,
  UPLOAD_MAX_FILE_SIZE,
  uploadFiles,
  type UploadContext,
  type UploadedFileRef,
} from "@/lib/uploads";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  context: UploadContext;
  ticketId?: string;
  files: UploadedFileRef[];
  onChange: (files: UploadedFileRef[]) => void;
  maxFiles?: number;
  accept?: string;
  label?: ReactNode;
  hint?: string;
  placeholder?: string;
  className?: string;
  variant?: "dropzone" | "button";
  hideFileList?: boolean;
}

export function FileUploadField({
  context,
  ticketId,
  files,
  onChange,
  maxFiles = UPLOAD_MAX_FILES,
  accept,
  label,
  hint = "Max 5 files, 10MB each",
  placeholder = "Attach screenshots or documents",
  className,
  variant = "dropzone",
  hideFileList = false,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (!picked.length) return;
    if (files.length >= maxFiles) {
      toast.error(`You can attach up to ${maxFiles} files.`);
      return;
    }

    const remaining = maxFiles - files.length;
    const batch = picked.slice(0, remaining);
    const oversized = batch.find((file) => file.size > UPLOAD_MAX_FILE_SIZE);
    if (oversized) {
      toast.error(`${oversized.name} exceeds the 10MB limit.`);
      return;
    }

    setUploading(true);
    try {
      const uploaded = await uploadFiles(batch, context, { ticketId, maxFiles: remaining });
      onChange([...files, ...uploaded]);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to upload file"));
    } finally {
      setUploading(false);
    }
  }

  function removeFile(index: number) {
    onChange(files.filter((_, fileIndex) => fileIndex !== index));
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {label ? <div className="text-sm font-medium text-foreground">{label}</div> : null}

      {variant === "button" ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-md"
            disabled={uploading || files.length >= maxFiles}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Paperclip className="size-4" />}
            Attach file
          </Button>
          {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-dashed px-3 py-4 text-sm text-muted-foreground hover:bg-accent/50">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Paperclip className="size-4" />}
          {uploading ? "Uploading…" : placeholder}
          <span className="text-xs">({hint})</span>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            accept={accept}
            disabled={uploading || files.length >= maxFiles}
            onChange={handleFilesSelected}
          />
        </label>
      )}

      {variant === "button" ? (
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept={accept}
          disabled={uploading || files.length >= maxFiles}
          onChange={handleFilesSelected}
        />
      ) : null}

      {files.length > 0 && !hideFileList ? (
        <ul className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <li key={`${file.key}-${index}`} className="flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs">
              <a href={file.url} target="_blank" rel="noreferrer" className="hover:underline">
                {file.name}
              </a>
              <span className="text-muted-foreground">· {file.size}</span>
              <button type="button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`}>
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
