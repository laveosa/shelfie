export interface IApiQueryCoreDefinition<TData, TParams> {
  query: (params: TParams) => any;
  providesTags?: (
    result: TData | undefined,
    error: any,
    params: TParams,
  ) => any[];
  invalidatesTags?: (
    result: TData | undefined,
    error: any,
    params: TParams,
  ) => any[];
}

export interface IApiQueryOptions {
  pollingInterval?: number;
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
  transformResponse?: (data: any) => any;
}

export type IApiQueryDefinition<TData, TParams> = IApiQueryCoreDefinition<
  TData,
  TParams
> &
  Partial<IApiQueryOptions>;
