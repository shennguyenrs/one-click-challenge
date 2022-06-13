import jwt from 'jsonwebtoken';
import { Impacts } from './libs/constants';
import * as constants from './libs/constants';
import { UsedResource } from './interfaces';

function roundedToFourth(value: number): number {
  return Math.round(value * 10000) / 10000;
}

// Calculate impact of a used resource
// return result for each impact
export function calculateImpacts(
  weights: { [key in Impacts]: string },
  quantity: number
) {
  return {
    [Impacts.GWP100_kgCO2e]: roundedToFourth(
      +weights.impactGWP100_kgCO2e * quantity
    ),
    [Impacts.AP_kgSO2e]: roundedToFourth(+weights.impactAP_kgSO2e * quantity),
  };
}

// Calculate total impacts of all used resources
// return total result imacts of co2 and so2
export function calculateTotalImpacts(usedResources: UsedResource[]) {
  const totalImpacts = {
    [Impacts.GWP100_kgCO2e]: 0,
    [Impacts.AP_kgSO2e]: 0,
  };

  usedResources.forEach((usedResource) => {
    totalImpacts[Impacts.GWP100_kgCO2e] +=
      usedResource.result[Impacts.GWP100_kgCO2e];
    totalImpacts[Impacts.AP_kgSO2e] += usedResource.result[Impacts.AP_kgSO2e];
  });

  totalImpacts[Impacts.GWP100_kgCO2e] = roundedToFourth(
    totalImpacts[Impacts.GWP100_kgCO2e]
  );
  totalImpacts[Impacts.AP_kgSO2e] = roundedToFourth(
    totalImpacts[Impacts.AP_kgSO2e]
  );

  return totalImpacts;
}

// Decode token
// If token valid return user id
// else return null
export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, constants.JWT_SECRET as string) as {
      _id: string;
    };

    return decoded._id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
