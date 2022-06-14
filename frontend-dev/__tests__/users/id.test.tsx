import { render, screen } from '@testing-library/react';
import UserPage from '@/pages/users/[id]';
import { Resource } from '../../interfaces';

const sampleResourceList: Resource[] = [
  {
    _id: 'jkdjskj',
    resourceId: 'concreteC20',
    name: 'Concrete C20/25',
    impacts: [
      {
        impactGWP100_kgCO2e: '0.0173',
        impactAP_kgSO2e: '0.00307',
      },
    ],
  },
];

describe('User page', () => {
  it('should render correctly with resources', () => {
    render(<UserPage resourcesList={sampleResourceList} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    const btns = screen.getAllByRole('button');
    const selectInput = screen.getByDisplayValue('Concrete C20/25');
    const totalImpacts = screen.getByRole('list');
    const table = screen.getByRole('table');

    expect(headings).toHaveLength(2);
    expect(btns).toHaveLength(3);
    expect(selectInput).toBeInTheDocument();
    expect(totalImpacts).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  it('should render correctly without resources', () => {
    render(<UserPage resourcesList={[]} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    const btns = screen.getAllByRole('button');
    const selectInput = screen.getByDisplayValue('No data');
    const totalImpacts = screen.getByRole('list');
    const table = screen.getByRole('table');

    expect(headings).toHaveLength(2);
    expect(btns).toHaveLength(2);
    expect(selectInput).toBeInTheDocument();
    expect(totalImpacts).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});
