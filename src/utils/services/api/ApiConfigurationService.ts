import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

import { IApiQueryDefinition } from "@/const/interfaces/IApiQueryDefinition.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import storageService from "@/utils/services/StorageService.ts";

export class ApiConfigurationService {
  public static baseQueryWithInterceptors = async (
    args: any,
    api: any,
    extraOptions: any,
  ) => {
    try {
      this.requestHandler(args);
      const result = await this.customBaseQuery(args.baseUrl)(
        args,
        api,
        extraOptions,
      );
      this.responseHandler(result);
      return result;
    } catch (error) {
      console.error("Unexpected Error:", error);
      throw error;
    }
  };

  public static createQuery<TData, TParams>(
    builder: EndpointBuilder<BaseQueryFn, string, string>,
    config: Partial<IApiQueryDefinition<TData, TParams>>,
  ) {
    return builder.query<TData, TParams>({
      ...(config as any),
    });
  }

  public static createMutation<TData, TParams>(
    builder: EndpointBuilder<BaseQueryFn, string, string>,
    config: Partial<IApiQueryDefinition<TData, TParams>>,
  ) {
    return builder.mutation<TData, TParams>({
      ...(config as any),
    });
  }

  public static providesTags<T>(result: T[] | any, type: ApiServiceNameEnum) {
    return result
      ? [
          ...result.map(({ id }: T | any) => ({ type: type, id })),
          { type: type, id: "LIST" },
        ]
      : [{ type: type, id: "LIST" }];
  }

  // ============================================================ PRIVATE

  private static requestHandler(_args: any): void {
    // TODO ad bearer token logic
  }

  private static responseHandler(result: any): void {
    if (result.error) {
      const { status, data } = result.error;
      const message = data?.message || "Unknown error occurred";

      if (status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      } else {
        console.error(`Error ${status}: ${message}`);
      }
    }
  }

  private static customBaseQuery(baseUrl = ApiUrlEnum.AUTH_BASE_URL) {
    return fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        const token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);

        if (!token) {
          //TODO show error toast 'Missing token'
          // window.location.href = NavUrlEnum.AUTH;
        }

        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        return headers;
      },
    });
  }
}
