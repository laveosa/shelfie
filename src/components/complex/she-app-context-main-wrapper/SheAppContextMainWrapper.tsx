import cs from "./SheAppContextMainWrapper.module.scss";
import { useSidebar } from "@/components/ui/sidebar.tsx";
import { ISheAppContextMainWrapper } from "@/const/interfaces/complex-components/ISheAppContextMainWrapper.ts";

export default function SheAppContextMainWrapper({
  children,
}: ISheAppContextMainWrapper) {
  const { open } = useSidebar();

  return (
    <main
      className={`${open ? "sidebar-open" : ""} ${cs.sheAppContextMainWrapper}`}
    >
      {children}
    </main>
  );
}
