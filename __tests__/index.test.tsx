import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Homepage', () => {
  it('Renders correctly', () => {
    render(<Home />);

    const heading = screen.getByText(
      'One Click LCA - Front-end developer challenge'
    );
    const loginBtn = screen.getByText('Login');
    const registerBtn = screen.getByText('Create new account');

    expect(heading).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });
});
