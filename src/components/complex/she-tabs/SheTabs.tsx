import { Tabs } from "@/components/ui/tabs.tsx";
import cs from "./SheTabs.module.scss";

export default function SheTabs({ ...props }) {
  return <Tabs {...props} className={cs.SheTabs}></Tabs>;
}
