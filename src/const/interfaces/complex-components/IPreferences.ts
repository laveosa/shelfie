export interface IPreferences {
  globalPreferences: {};
  viewsReferences: {
    productReferences: {
      columns: {
        id: boolean;
        image: boolean;
        code: boolean;
        productName: boolean;
        category: boolean;
        brand: boolean;
        barcode: boolean;
        status: boolean;
        salePrice: boolean;
        variantCount: boolean;
        stock: boolean;
      };
    };
  };
}
