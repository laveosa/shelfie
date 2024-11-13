import cs from "./SheResizable.module.scss";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function SheResizable() {
  return (
    <ResizablePanelGroup className={cs.SheResizable} direction="horizontal">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}
