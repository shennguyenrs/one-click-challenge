import { ReactElement, useContext } from 'react';
import { UserContext } from '../../contexts/users';
import { UsedResource } from '../../interfaces';
import Lines from './Lines';

export default function ResourceTable(): ReactElement {
  const { user } = useContext(UserContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Quantity</th>
          <th>
            CO<sub>2</sub>
          </th>
          <th>
            SO<sub>2</sub>
          </th>
        </tr>
      </thead>
      <tbody>
        {user?.usedResources?.map((resource: UsedResource) => (
          <Lines key={resource.resource.resourceId} resource={resource} />
        ))}
      </tbody>
    </table>
  );
}
