import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone.tsx";
import { ISheImageUploader } from "@/const/interfaces/complex-components/ISheImageUploader.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import cs from "./SheImageUploader.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function SheImageUploader({
  contextName,
  contextId,
  onUpload,
}: ISheImageUploader) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const dropzone = useDropzone({
    onDropFile: (file: File) => {
      const newFile = {
        id: crypto.randomUUID(),
        file,
        fileName: file.name,
        status: "pending",
        result: URL.createObjectURL(file),
      };

      setSelectedFiles((prevFiles) => [...prevFiles, file]);

      return Promise.resolve({
        status: "success",
        result: newFile.result,
      });
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  async function handleUpload() {
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadModel: UploadPhotoModel = {
        contextName,
        contextId,
        file: formData,
      };

      try {
        await onUpload(uploadModel);
        setSelectedFiles([]);
        dropzone.fileStatuses.forEach((file) => {
          dropzone.onRemoveFile(file.id);
        });
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  }

  function handleRemoveFile(fileId: string) {
    dropzone.onRemoveFile(fileId);

    const fileToRemove = dropzone.fileStatuses.find(
      (file) => file.id === fileId,
    );

    if (fileToRemove) {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileToRemove.fileName),
      );
    }
  }

  return (
    <div className={`${cs.sheImageUploader} not-prose flex flex-col gap-4`}>
      <Dropzone {...dropzone}>
        <DropZoneArea>
          <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent text-center text-sm">
            <CloudUploadIcon className="size-8" />
            <div>
              <p className="font-semibold">Upload images</p>
              <p className="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropZoneArea>
        <DropzoneDescription>Please select up to 10 images</DropzoneDescription>
        <DropzoneMessage />
        <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
              key={file.id}
              file={file}
            >
              {file.status === "pending" && (
                <div className="aspect-video animate-pulse bg-black/20" />
              )}
              {file.status === "success" && (
                <img
                  src={file.result}
                  alt={`uploaded-${file.fileName}`}
                  className="aspect-video object-cover"
                />
              )}
              <div className="flex items-center justify-between p-2 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <DropzoneRemoveFile
                  variant="ghost"
                  className="shrink-0 hover:outline"
                  onClick={() => handleRemoveFile(file.id)}
                >
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>
      <SheButton
        variant="secondary"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0}
      >
        Upload photo
      </SheButton>
    </div>
  );
}
