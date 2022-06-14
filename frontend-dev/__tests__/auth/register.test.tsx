import { render, screen } from '@testing-library/react';
import RegisterPage from '@/pages/auth/register';

describe('Register page', () => {
  it('should render all elements', () => {
    render(<RegisterPage />);

    // Heading
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Create new account');

    // Links
    const loginLink = screen.getByText('Login');
    const backToHomeLink = screen.getByText('Back to home');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveClass('link-base');
    expect(backToHomeLink).toBeInTheDocument();
    expect(backToHomeLink).toHaveClass('link-base');

    // Forms
    const invisibleMessage = screen.getAllByText('t');
    const nameInput = screen.getByLabelText('Name', { selector: 'input' });
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    const passInput = screen.getByLabelText('Password', { selector: 'input' });
    const confirmPassInput = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });
    const registerBtn = screen.getByRole('button');
    expect(invisibleMessage).toHaveLength(5);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(confirmPassInput).toBeInTheDocument();
    expect(registerBtn).toHaveClass('btn-base');
    expect(registerBtn).toHaveTextContent('Register');
  });
});
