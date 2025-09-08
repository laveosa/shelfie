import { TabsProps } from "@radix-ui/react-tabs";

import { Tabs } from "@/components/ui/tabs.tsx";
import cs from "./SheTabs.module.scss";

export default function SheTabs({ ...props }: TabsProps) {
  return <Tabs {...props} className={cs.SheTabs}></Tabs>;
}
