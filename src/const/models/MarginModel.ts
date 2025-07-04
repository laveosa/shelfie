import { MarginRuleModel } from "@/const/models/MarginRuleModel.ts";

export interface MarginModel {
  marginId?: number;
  marginName?: string;
  isDeleted?: boolean;
  marginRule?: MarginRuleModel;
}
