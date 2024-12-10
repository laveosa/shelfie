import cs from "./SheSelect.module.scss";
import { Select } from "@/components/ui/select.tsx";
import { ReactNode } from "react";

export default function SheSelect({ children }: { children: ReactNode }) {
  return (
    <div className={cs.SheSelect}>
      <Select>{children}</Select>
    </div>
  );
}
