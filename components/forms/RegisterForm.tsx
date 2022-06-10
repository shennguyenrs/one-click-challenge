import type { ReactElement } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterForm(): ReactElement {
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log('submited');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="form-base">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        id="name"
        name="name"
        {...form.getInputProps('name')}
      />
      {form.errors.name ? (
        <p className="errors">{form.errors.name}</p>
      ) : (
        <p className="invisible">t</p>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        {...form.getInputProps('email')}
      />
      {form.errors.email ? (
        <p className="errors">{form.errors.email}</p>
      ) : (
        <p className="invisible">t</p>
      )}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        {...form.getInputProps('password')}
      />
      {form.errors.password ? (
        <p className="errors">{form.errors.password}</p>
      ) : (
        <p className="invisible">t</p>
      )}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        {...form.getInputProps('confirmPassword')}
      />
      {form.errors.password ? (
        <p className="errors">{form.errors.password}</p>
      ) : (
        <p className="invisible">t</p>
      )}
      <span className="spacer"></span>
      <button type="submit" className="btn-base">
        Register
      </button>
      {form.errors.others ? (
        <p className="errors">{form.errors.others}</p>
      ) : (
        <p className="invisible">t</p>
      )}
    </form>
  );
}
