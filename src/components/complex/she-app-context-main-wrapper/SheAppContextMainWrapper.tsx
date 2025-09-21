import cs from "./SheAppContextMainWrapper.module.scss";
import { useSidebar } from "@/components/ui/sidebar.tsx";
import { ISheAppContextMainWrapper } from "@/const/interfaces/complex-components/ISheAppContextMainWrapper.ts";

export default function SheAppContextMainWrapper({
  children,
}: ISheAppContextMainWrapper) {
  const { open, isMobile } = useSidebar();

  return (
    <main
      className={`${open ? "sidebar-open" : ""} ${isMobile ? "mobile-view" : ""} ${cs.sheAppContextMainWrapper}`}
    >
      {children}
    </main>
  );
}
