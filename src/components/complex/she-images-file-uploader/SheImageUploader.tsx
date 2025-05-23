import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import {
  Dropzone,
  DropZoneArea,
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
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

interface UploadingFile {
  id: string;
  file: File;
  fileName: string;
  result: string;
  status: "success";
  tries: number;
}

export function SheImageUploader({
  isLoading = false,
  contextName,
  contextId,
  onUpload,
}: ISheImageUploader) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  // Debug logs (remove these later)
  console.log("Current uploadingFiles:", uploadingFiles);
  console.log("uploadingFiles.length > 0:", uploadingFiles.length > 0);

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
      maxFiles: 50,
    },
  });

  console.log("Current dropzone.fileStatuses:", dropzone.fileStatuses);

  function handleUpload() {
    console.log("handleUpload called");
    console.log("dropzone.fileStatuses before:", dropzone.fileStatuses);

    // Move selected files to uploading state
    const filesToUpload: UploadingFile[] = dropzone.fileStatuses.map(
      (fileStatus) => ({
        id: fileStatus.id,
        file: fileStatus.file,
        fileName: fileStatus.fileName,
        result: fileStatus.result,
        status: "success" as const,
        tries: fileStatus.tries || 0,
      }),
    );

    console.log("Files to upload:", filesToUpload);

    // Set uploading files first
    setUploadingFiles(filesToUpload);
    console.log("setUploadingFiles called with:", filesToUpload);

    // Clear the dropzone immediately
    setSelectedFiles([]);
    dropzone.fileStatuses.forEach((file) => {
      dropzone.onRemoveFile(file.id);
    });

    // Upload files one by one
    filesToUpload.forEach((uploadingFile, index) => {
      const formData = new FormData();
      formData.append("file", uploadingFile.file);

      const uploadModel: UploadPhotoModel = {
        contextName,
        contextId,
        file: formData,
      };

      console.log(`Starting upload for: ${uploadingFile.fileName}`);

      // Simulate upload delay and then call onUpload
      setTimeout(() => {
        try {
          onUpload(uploadModel);
          console.log(`Upload completed for: ${uploadingFile.fileName}`);

          // Remove successfully uploaded file from uploading array after a delay
          setTimeout(() => {
            setUploadingFiles((prevFiles) => {
              const newFiles = prevFiles.filter(
                (file) => file.id !== uploadingFile.id,
              );
              console.log(
                `Removed ${uploadingFile.fileName}, remaining: ${newFiles.length}`,
              );
              return newFiles;
            });
          }, 5000000); // 500ms delay to see the file before it's removed
        } catch (error) {
          console.error("Upload failed:", error);

          // For failed uploads, still remove from uploading array
          setTimeout(() => {
            setUploadingFiles((prevFiles) =>
              prevFiles.filter((file) => file.id !== uploadingFile.id),
            );
          }, 500);
        }
      }, index * 800); // Stagger uploads by 800ms each
    });
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
    <div
      className={`${cs.sheImageUploader} not-prose flex flex-col gap-4`}
      style={{
        boxSizing: "border-box",
        padding: "0",
      }}
    >
      <Dropzone {...dropzone}>
        <DropZoneArea>
          <DropzoneTrigger
            className={`${cs.dropzoneTrigger} flex flex-col items-center gap-4 bg-transparent text-center text-sm`}
          >
            <CloudUploadIcon className="size-8" />
            <div>
              <p className="font-semibold">Upload images</p>
              <p className="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropZoneArea>
        <DropzoneMessage />
        <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
              key={file.id}
              file={file}
            >
              <div className="flex relative items-center justify-between p-2 pl-4">
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
                <div className={cs.textBlock}>
                  <p className="truncate text-sm">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <DropzoneRemoveFile
                  variant="ghost"
                  className={cs.removeFileButton}
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
        className={uploadingFiles.length > 0 ? cs.loadingButtonState : ""}
        variant="secondary"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || uploadingFiles.length > 0}
      >
        Upload photo
      </SheButton>

      {uploadingFiles.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              Uploading {uploadingFiles.length} file(s)...
            </span>
          </div>
          <div className={cs.uploadingBlockContainer}>
            {uploadingFiles.map((file) => (
              <div
                className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                key={file.id}
              >
                <div
                  className={`${cs.uploadingItem} flex relative items-center justify-between p-2 pl-4`}
                >
                  <img
                    src={file.result}
                    alt={`uploading-${file.fileName}`}
                    className={cs.uploadingItemImage}
                  />
                  <div className={cs.uploadingItemTextBlock}>
                    <p className="truncate text-sm">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <SheLoading className={cs.loadingBlock} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
