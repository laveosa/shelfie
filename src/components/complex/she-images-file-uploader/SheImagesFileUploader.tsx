import { CloudUploadIcon, Trash2Icon } from "lucide-react";

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
import useSheImagesFileUploaderService from "@/components/complex/she-images-file-uploader/useSheImagesFileUploaderService.ts";
import { ISheImageFileUploader } from "@/const/interfaces/complex-components/ISheImageFileUploader.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

function convertFileToBinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Triggered when the file is read
    reader.onload = () => {
      const binaryData = reader.result; // The binary data of the file
      resolve(binaryData);
    };

    // Triggered in case of an error
    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as an ArrayBuffer (binary format)
    reader.readAsArrayBuffer(file);
  });
}

export function SheImagesFileUploader({
  contextName,
  contextId,
}: ISheImageFileUploader) {
  const service = useSheImagesFileUploaderService();

  const dropzone = useDropzone({
    onDropFile: async (_file: any) => {
      const formData = new FormData();
      formData.append("file", _file);

      try {
        const uploadModel: UploadPhotoModel = {
          contextName,
          contextId,
          file: formData,
        };

        await service.uploadPhotoHandler(uploadModel);

        return {
          status: "success",
          result: URL.createObjectURL(_file),
        };
      } catch (error) {
        // Handle upload error
        console.error("Upload failed:", error);
        return {
          status: "error",
          error: "Failed to upload file",
        };
      }
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  return (
    <div className="not-prose flex flex-col gap-4">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between">
            <DropzoneDescription>
              Please select up to 10 images
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">Upload images</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

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
                >
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>
    </div>
  );
}
