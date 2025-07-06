import {
  MarginRuleModel,
  MarginRuleModelDefault,
} from "@/const/models/MarginRuleModel.ts";

export interface MarginModel {
  marginId?: number;
  marginName?: string;
  isDeleted?: boolean;
  marginRule?: MarginRuleModel;
}

export const MarginModelDefault: MarginModel = {
  marginName: null,
  marginRule: MarginRuleModelDefault,
};
