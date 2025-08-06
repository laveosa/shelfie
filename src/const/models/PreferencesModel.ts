export interface ProductReferencesModel {
  columns?: {
    productId?: boolean;
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
    productReferences?: any;
    variantReferences?: any;
    customerReferences?: any;
  };
}

//------------------------------------------------ DEFAULT MODEL

export const PreferencesModelDefault: PreferencesModel = {
  globalPreferences: {},
  viewsReferences: {
    productReferences: {
      columns: {
        productId: false,
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
    variantReferences: {
      columns: {
        productId: false,
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
    customerReferences: {
      columns: {
        customerId: true,
        customerName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        lastOrderDate: true,
        manage: true,
        rank: false,
      },
    },
  },
};
