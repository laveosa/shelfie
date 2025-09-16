import { CloudUploadIcon, FileIcon, Trash2Icon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

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
import { ISheFileUploader } from "@/const/interfaces/complex-components/ISheFileUploader.ts";
import { UploadFileModel } from "@/const/models/UploadFileModel.ts";
import cs from "./SheFileUploader.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";

interface UploadingFile {
  id: string;
  file: File;
  fileName: string;
  result: string;
  status: "success";
  tries: number;
  isImage: boolean;
}

export type UploaderViewMode = "image" | "file";

export interface SheFileUploaderRef {
  getSelectedFiles: () => File[];
  getUploadModels: () => UploadFileModel[];
  setViewMode: (mode: UploaderViewMode) => void;
}

export const SheFileUploader = forwardRef<SheFileUploaderRef, ISheFileUploader>(
  (
    {
      isLoading = false,
      className,
      contextName,
      contextId,
      fullWidth,
      hideUploadButton = false,
      viewMode = "image", // default to file mode
      acceptedFileTypes = {}, // empty object means all files
      maxFiles = 50,
      onUpload,
      onViewModeChange,
    },
    ref,
  ) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
    const [currentViewMode, setCurrentViewMode] =
      useState<UploaderViewMode>(viewMode);

    // Determine accepted types based on view mode and props
    const getAcceptedTypes = () => {
      if (Object.keys(acceptedFileTypes).length > 0) {
        return acceptedFileTypes;
      }

      if (currentViewMode === "image") {
        return {
          "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
        };
      }

      // File mode accepts all types by default
      return {};
    };

    const isImageFile = (file: File) => {
      return file.type.startsWith("image/");
    };

    const dropzone = useDropzone({
      onDropFile: (file) => {
        const newFile = {
          id: crypto.randomUUID(),
          file,
          fileName: file.name,
          status: "pending",
          result: isImageFile(file) ? URL.createObjectURL(file) : "",
          isImage: isImageFile(file),
        };

        setSelectedFiles((prevFiles) => [...prevFiles, file]);

        return Promise.resolve({
          status: "success",
          result: newFile.result,
        });
      },
      validation: {
        accept: getAcceptedTypes(),
        maxFiles,
      },
    });

    useImperativeHandle(ref, () => ({
      getSelectedFiles: () => selectedFiles,
      getUploadModels: () => {
        return dropzone.fileStatuses.map((fileStatus) => {
          const formData = new FormData();
          formData.append("file", fileStatus.file);

          return {
            contextName,
            contextId,
            file: formData,
          };
        });
      },
      setViewMode: (mode: UploaderViewMode) => {
        setCurrentViewMode(mode);
        onViewModeChange?.(mode);
      },
    }));

    useEffect(() => {
      if (!isLoading && uploadingFiles.length > 0) {
        setUploadingFiles([]);
      }
    }, [isLoading, uploadingFiles.length]);

    useEffect(() => {
      setCurrentViewMode(viewMode);
    }, [viewMode]);

    function handleUpload() {
      const filesToUpload: UploadingFile[] = dropzone.fileStatuses.map(
        (fileStatus) => ({
          id: fileStatus.id,
          file: fileStatus.file,
          fileName: fileStatus.fileName,
          result: fileStatus.result,
          status: "success" as const,
          tries: fileStatus.tries || 0,
          isImage: isImageFile(fileStatus.file),
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

        const uploadModel: UploadFileModel = {
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

    // function handleViewModeToggle() {
    //   const newMode = currentViewMode === "image" ? "file" : "image";
    //   setCurrentViewMode(newMode);
    //   onViewModeChange?.(newMode);
    // }

    const renderFilePreview = (file: any) => {
      if (
        currentViewMode === "image" &&
        file.status === "success" &&
        isImageFile(file.file)
      ) {
        return (
          <div className={cs.imageContainer}>
            <img
              src={file.result}
              alt={`uploaded-${file.fileName}`}
              className={cs.previewImage}
            />
          </div>
        );
      }

      return (
        <div className={cs.fileContainer}>
          <FileIcon className="size-8 text-muted-foreground" />
        </div>
      );
    };

    const renderUploadingPreview = (file: UploadingFile) => {
      if (currentViewMode === "image" && file.isImage) {
        return (
          <div className={cs.uploadingImageContainer}>
            <img
              src={file.result}
              alt={`uploading-${file.fileName}`}
              className={cs.uploadingItemImage}
            />
          </div>
        );
      }

      return (
        <div className={cs.uploadingFileContainer}>
          <FileIcon className="size-6 text-muted-foreground" />
        </div>
      );
    };

    const getUploadText = () => {
      if (currentViewMode === "image") {
        return {
          main: "Upload images",
          sub: "Click here or drag and drop images to upload",
        };
      }
      return {
        main: "Upload files",
        sub: "Click here or drag and drop files to upload",
      };
    };

    const uploadText = getUploadText();

    return (
      <div
        className={`${cs.sheFileUploader} ${className} ${fullWidth ? cs.sheFileUploaderFullWidth : ""} `}
        style={{
          boxSizing: "border-box",
          padding: "0",
        }}
      >
        {/* View Mode Toggle */}
        {/*<div className={cs.viewModeToggle}>*/}
        {/*  <SheButton*/}
        {/*    variant={currentViewMode === "file" ? "default" : "outline"}*/}
        {/*    // size="sm"*/}
        {/*    onClick={() => currentViewMode !== "file" && handleViewModeToggle()}*/}
        {/*    className={cs.toggleButton}*/}
        {/*  >*/}
        {/*    <FileIcon className="size-4 mr-2" />*/}
        {/*    File View*/}
        {/*  </SheButton>*/}
        {/*  <SheButton*/}
        {/*    variant={currentViewMode === "image" ? "default" : "outline"}*/}
        {/*    // size="sm"*/}
        {/*    onClick={() =>*/}
        {/*      currentViewMode !== "image" && handleViewModeToggle()*/}
        {/*    }*/}
        {/*    className={cs.toggleButton}*/}
        {/*  >*/}
        {/*    <ImageIcon className="size-4 mr-2" />*/}
        {/*    Image View*/}
        {/*  </SheButton>*/}
        {/*</div>*/}

        <Dropzone {...dropzone}>
          <DropZoneArea>
            <DropzoneTrigger
              className={`${cs.dropzoneTrigger} flex flex-col items-center gap-4 bg-transparent text-center text-sm`}
            >
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">{uploadText.main}</p>
                <p className="text-sm text-muted-foreground">
                  {uploadText.sub}
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
          {selectedFiles.length > 0 && <DropzoneMessage />}
          <DropzoneFileList
            className={`grid gap-3 p-0 ${
              currentViewMode === "image"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {dropzone.fileStatuses.map((file) => (
              <DropzoneFileListItem
                className={`overflow-hidden rounded-md bg-secondary p-0 shadow-sm ${
                  currentViewMode === "file" ? cs.fileListItem : ""
                }`}
                key={file.id}
                file={file}
              >
                <div
                  className={`flex relative items-center justify-between p-2 pl-4 ${
                    currentViewMode === "file" ? cs.fileItemLayout : ""
                  }`}
                >
                  {file.status === "pending" && (
                    <div
                      className={`animate-pulse bg-black/20 ${
                        currentViewMode === "image"
                          ? "aspect-video"
                          : "w-12 h-12 rounded"
                      }`}
                    />
                  )}
                  {file.status === "success" && renderFilePreview(file)}

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

        {!hideUploadButton && (
          <SheButton
            className={isLoading ? cs.loadingButtonState : ""}
            variant="secondary"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
          >
            Upload {currentViewMode === "image" ? "images" : "files"}
          </SheButton>
        )}

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
                    {renderUploadingPreview(file)}

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
  },
);
