import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

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

  const dropzone = useDropzone({
    onDropFile: (file) => {
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
      maxFiles: 50,
    },
  });

  useEffect(() => {
    if (!isLoading && uploadingFiles.length > 0) {
      setUploadingFiles([]);
    }
  }, [isLoading, uploadingFiles.length]);

  function handleUpload() {
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

    setUploadingFiles((prevFiles) => [...filesToUpload, ...prevFiles]);

    setSelectedFiles([]);
    dropzone.fileStatuses.forEach((file) => {
      dropzone.onRemoveFile(file.id);
    });

    filesToUpload.forEach((uploadingFile, _index) => {
      const formData = new FormData();
      formData.append("file", uploadingFile.file);

      const uploadModel: UploadPhotoModel = {
        contextName,
        contextId,
        file: formData,
      };

      onUpload(uploadModel);
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
                  <div className={cs.imageContainer}>
                    <img src={file.result} alt={`uploaded-${file.fileName}`} />
                  </div>
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
        className={isLoading ? cs.loadingButtonState : ""}
        variant="secondary"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0}
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
                  <div className={cs.uploadingImageContainer}>
                    <img
                      src={file.result}
                      alt={`uploading-${file.fileName}`}
                      className={cs.uploadingItemImage}
                    />
                  </div>
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
