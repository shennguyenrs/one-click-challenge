import type { ReactElement } from 'react';
import axios, { AxiosError } from 'axios';
import http from 'http-status';
import { useRouter } from 'next/router';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import * as constants from '../../libs/constants';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

export default function LoginForm(): ReactElement {
  const router = useRouter();
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await axios.post(
        constants.apiRoutes.authentication + '/login',
        values
      );
      form.reset();

      if (res.status === http.OK) {
        router.push('/users/' + res.data.id);
      }
    } catch (err) {
      const res = (err as AxiosError).response;

      if (res && res.data) {
        form.setErrors({ others: (res.data as { message: string }).message });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="form-base">
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
      <span className="spacer"></span>
      <button type="submit" className="btn-base">
        Login
      </button>
      <div className="mt-4 flex justify-center">
        {form.errors.others ? (
          <p className="errors">{form.errors.others}</p>
        ) : (
          <p className="invisible">t</p>
        )}
      </div>
    </form>
  );
}
