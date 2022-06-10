export interface Resource {
  resourceId: string;
  name: string;
  impacts: ResImpact[];
}

export interface ResImpact {
  impactGWP100_kgCO2e: string;
  impactAP_kgSO2e: string;
}
