import { ChangeEvent, ReactElement, useState, useContext } from 'react';
import type { Resource } from '../interfaces';
import { UserContext } from '../contexts/users';

export default function DropDownList({
  data,
}: {
  data: Resource[];
}): ReactElement {
  const [selected, setSelected] = useState<Resource>(data[0]);
  const { addResource } = useContext(UserContext);

  const handleChange = (e: ChangeEvent) => {
    const currentValue = data.find(
      (item) => item.resourceId === (e.target as HTMLSelectElement).value
    );
    currentValue && setSelected(currentValue);
  };

  const updateTable = () => {
    if (addResource) {
      addResource(selected);
    }
  };

  return (
    <>
      <select
        className="py-2 px-4 mr-4 rounded-md bg-white border-2 border-slate-800"
        onChange={handleChange}
        defaultValue={data[0].resourceId}
      >
        {data.map((item) => (
          <option key={item.resourceId} value={item.resourceId}>
            {item.name}
          </option>
        ))}
      </select>
      <button className="btn-base" onClick={updateTable}>
        Add & Calculate
      </button>
    </>
  );
}
