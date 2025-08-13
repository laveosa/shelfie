export interface MarginRuleModel {
  marginRuleId?: number;
  desiredProfit?: number;
  plannedDiscount?: number;
  fixedCosts?: number;
  roundTo?: boolean;
  nearest9?: boolean;
  modified?: boolean;
}

export const MarginRuleModelDefault: MarginRuleModel = {
  desiredProfit: null,
  plannedDiscount: null,
  fixedCosts: null,
  roundTo: false,
  nearest9: false,
};
