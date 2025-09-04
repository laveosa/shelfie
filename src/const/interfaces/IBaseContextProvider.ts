import React, { JSX } from "react";

export interface IBaseContextProvider<T> {
  value: T;
  children: JSX.Element | React.ReactNode;
}
