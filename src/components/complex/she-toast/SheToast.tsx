import cs from "./SheToast.module.scss";
import { Toaster } from "@/components/ui/toaster";

export default function SheToast() {
  return (
    <div className={cs.SheToast}>
      <Toaster />
    </div>
  );
}
