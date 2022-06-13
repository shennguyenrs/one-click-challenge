import { ReactElement, useContext, useState, useEffect } from 'react';
import { Impacts } from '../libs/constants';
import { UserContext } from '../contexts/users';
import { calculateTotalImpacts } from '../utils';

const initialTotalImpacts = {
  [Impacts.GWP100_kgCO2e]: 0,
  [Impacts.AP_kgSO2e]: 0,
};

export default function TotalImpactsView(): ReactElement {
  const [total, setTotal] =
    useState<{ [key in Impacts]: number }>(initialTotalImpacts);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const result = calculateTotalImpacts(user.usedResources);
      setTotal(result);
    }
  }, [user]);

  return (
    <ul>
      <li>
        CO<sub>2</sub>e:
        <span className="text-lime-500">
          {' '}
          {total[Impacts.GWP100_kgCO2e]} kg
        </span>
      </li>
      <li>
        SO<sub>2</sub>e:
        <span className="text-lime-500"> {total[Impacts.AP_kgSO2e]} kg</span>
      </li>
    </ul>
  );
}
