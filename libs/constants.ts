export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
export const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;

export const CalculationRules = [
  {
    calculationRuleId: 'impactGwp',
    name: 'CO2e',
    multiplyFormula: ['quantity', 'impactGWP100_kgCO2e'],
  },
  {
    calculationRuleId: 'impactAp',
    name: 'SO2e',
    multiplyFormula: ['quantity', 'impactAP_kgSO2e'],
  },
];

export const apiRoutes = {
  authentication: '/api/auth',
  users: '/api/users',
  resources: '/api/resources',
};

export const jwtOpts = {
  expiresIn: '7d',
};

export enum Impacts {
  GWP100_kgCO2e = 'impactGWP100_kgCO2e',
  AP_kgSO2e = 'impactAP_kgSO2e',
}
