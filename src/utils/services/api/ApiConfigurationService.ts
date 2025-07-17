import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

import { IApiQueryDefinition } from "@/const/interfaces/IApiQueryDefinition.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

export class ApiConfigurationService {
  public baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || this.baseUrl;
  }

  public baseQueryWithInterceptors = async (
    args: any,
    api: any,
    extraOptions: any,
  ) => {
    args.baseUrl = this.baseUrl || args.baseUrl;

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

  public createQuery<TData, TParams>(
    builder: EndpointBuilder<BaseQueryFn, string, string>,
    config: Partial<IApiQueryDefinition<TData, TParams>>,
  ) {
    return builder.query<TData, TParams>({
      ...(config as any),
    });
  }

  public createMutation<TData, TParams>(
    builder: EndpointBuilder<BaseQueryFn, string, string>,
    config: Partial<IApiQueryDefinition<TData, TParams>>,
  ) {
    return builder.mutation<TData, TParams>({
      ...(config as any),
    });
  }

  public providesTags<T>(result: T[] | any, type: ApiServiceNameEnum) {
    return result
      ? [
          ...result.map(({ id }: T | any) => ({ type: type, id })),
          { type: type, id: "LIST" },
        ]
      : [{ type: type, id: "LIST" }];
  }

  // ============================================================ PRIVATE

  private requestHandler(_args: any): void {
    // TODO ad bearer token logic
  }

  private responseHandler(result: any): void {
    if (result.error) {
      const { status, data } = result.error;
      const message = data?.message || "Unknown error occurred";

      if (status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        window.location.href =
          "https://green-glacier-0d48d5603.4.azurestaticapps.net/auth";
      } else {
        console.error(`Error ${status}: ${message}`);
      }
    }
  }

  private customBaseQuery(baseUrl: ApiUrlEnum) {
    return fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { arg }) => {
        const token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);
        headers.set("Authorization", `Bearer ${token}`);

        if (
          !(
            arg &&
            typeof arg === "object" &&
            "body" in arg &&
            arg.body instanceof FormData
          )
        ) {
          headers.set("Content-Type", "application/json");
        }

        return headers;
      },
    });
  }
}
