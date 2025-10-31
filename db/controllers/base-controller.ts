import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export class BaseController {
  protected static createGridDefaultModel(items: any[]): GridRequestModel {
    return {
      items: items,
      currentPage: 1,
      endPage: 2,
      pageSize: 10,
      searchQuery: null,
      sortOption: "Newest",
      totalPages: 2,
      filter: {
        brands: [],
        categories: [],
        showDeleted: false,
      },
    };
  }

  protected static staticDataApiHandler(data: any) {
    const delayTime = 500 + Math.random() * 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delayTime);
    });
  }
}
