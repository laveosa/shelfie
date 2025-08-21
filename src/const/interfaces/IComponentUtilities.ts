import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export interface IComponentUtilities<T extends IShePrimitiveComponentWrapper> {
  props: T;
  identifier?: string;
}
