import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/auth/login';

describe('Login page', () => {
  it('should render all elements', () => {
    render(<LoginPage />);

    // Heading
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Login');

    // Links
    const registerLink = screen.getByText('Create new account');
    const backToHomeLink = screen.getByText('Back to home');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveClass('link-base');
    expect(backToHomeLink).toBeInTheDocument();
    expect(backToHomeLink).toHaveClass('link-base');

    // Forms
    const invisibleMessage = screen.getAllByText('t');
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    const passInput = screen.getByLabelText('Password', { selector: 'input' });
    const loginBtn = screen.getByRole('button');
    expect(invisibleMessage).toHaveLength(3);
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toHaveClass('btn-base');
    expect(loginBtn).toHaveTextContent('Login');
  });
});
