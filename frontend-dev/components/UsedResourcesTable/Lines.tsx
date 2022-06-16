import {
  ReactElement,
  ChangeEvent,
  useState,
  useEffect,
  useContext,
} from 'react';
import { UserContext } from '../../contexts/users';
import { UsedResource } from '../../interfaces';

export default function Lines({
  resource,
}: {
  resource: UsedResource;
}): ReactElement {
  const [quantity, setQuantity] = useState<number>(resource.quantity);
  const { addResource, removeResource } = useContext(UserContext);

  const handleChangeQuantity = (e: ChangeEvent) => {
    e.preventDefault();
    const newValue = Number((e.target as HTMLInputElement).value);

    if (newValue > quantity) {
      addResource && addResource(resource.resource);
    }

    if (newValue < quantity && newValue > 0) {
      removeResource && removeResource(resource.resource);
    }
  };

  useEffect(() => {
    if (quantity !== resource.quantity) {
      setQuantity(resource.quantity);
    }
  }, [resource, quantity]);

  return (
    <tr>
      <td>{resource.resource.name}</td>
      <td>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChangeQuantity}
        />
      </td>
      <td className="text-lime-500">
        {resource.result.impactGWP100_kgCO2e} kg
      </td>
      <td className="text-lime-500">{resource.result.impactAP_kgSO2e} kg</td>
    </tr>
  );
}
