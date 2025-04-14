import React from "react";

import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheIcon extends IBaseComponent {
  icon: React.ComponentType<{ className?: string }> | string;
}
