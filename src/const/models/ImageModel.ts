export interface ImageModel {
  // {
  //   pictureAppId?: string;
  //   photoUrl?: string;
  //   thumbnail?: string;
  //   context?: string;
  //   contextAppId?: string;
  //   isDeleted?: boolean;
  //   photoKind?: string;
  //   processingCompletePhotoState?: string;
  // }
  adaptedUrl?: string;
  height: number;
  isActive: boolean;
  photoId: number;
  sortOrder: number;
  thumbnailUrl: string;
  width: number;
}
