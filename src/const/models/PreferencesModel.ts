export interface ProductReferencesModel {
  columns?: {
    id?: boolean;
    image?: boolean;
    code?: boolean;
    productName?: boolean;
    category?: boolean;
    brand?: boolean;
    barcode?: boolean;
    status?: boolean;
    salePrice?: boolean;
    variantCount?: boolean;
    stock?: boolean;
  };
}

export interface PreferencesModel {
  globalPreferences?: any;
  viewsReferences?: {
    productReferences?: ProductReferencesModel;
  };
}

//------------------------------------------------ DEFAULT MODEL

export const PreferencesModelDefault: PreferencesModel = {
  globalPreferences: {},
  viewsReferences: {
    productReferences: {
      columns: {
        id: false,
        image: false,
        code: false,
        productName: false,
        category: false,
        brand: false,
        barcode: false,
        status: false,
        salePrice: false,
        variantCount: false,
        stock: false,
      },
    },
  },
};
