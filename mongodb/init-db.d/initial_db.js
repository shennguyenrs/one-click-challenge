db.resources.drop();
db.resources.insert([
  {
    resourceId: 'concreteC20',
    name: 'Concrete C20/25',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.0173',
        impactAP_kgSO2e: '0.00307',
      },
    ],
  },
  {
    resourceId: 'concreteC18',
    name: 'Concrete C18/20',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.025',
        impactAP_kgSO2e: '0.015',
      },
    ],
  },
  {
    resourceId: 'plywoodCoated',
    name: 'Plywood, phenol coated',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.00805',
        impactAP_kgSO2e: '0.00075',
      },
    ],
  },
  {
    resourceId: 'plywoodUncoated',
    name: 'Plywood, spruce, uncoated',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.00415',
        impactAP_kgSO2e: '0.00725',
      },
    ],
  },
  {
    resourceId: 'aluminum',
    name: 'Aluminum profile',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.45',
        impactAP_kgSO2e: '0.245',
      },
    ],
  },
]);
