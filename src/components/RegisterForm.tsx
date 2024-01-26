import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import { MIN_PASSWORD_LENGTH, validations } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
  country: string;
}

const schema = z
    .object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
      country: z.string().min(1),
    })
    .refine(data => data.password.length >= MIN_PASSWORD_LENGTH, {
      path: ['password'],
      message: 'PASSWORD_TOO_SHORT',
    })
    .refine(
      (data) => data.username.length >= validations[data.country].userNameMinChars,
      {
        path: ['username'],
        message: 'USERNAME_TOO_SHORT_MIN_CHARS',
      }
    )
    .refine((data) => data.username.length <= 15, {
      path: ['username'],
      message: 'USERNAME_TOO_LONG',
    })
    .refine(
      (data) => !!data.username.match(validations[data.country].validRegex),
      {
        path: ['username'],
        message: 'userNameIncorrectFormat',
      }
    ).refine(
      (data) => data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      {
        path: ['email'],
        message: 'INVALID_EMAIL',
      }
    );

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register: createUser } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { username, email, password, country, register: registerUser } = useAuthStore();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    reset();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          email: data.email,
          userName: data.username,
          country: data.country,
        });
        createUser({
          username: data.username,
          email: data.email,
          country: data.country,
        });
        setLoading(false);
        registerUser({
          isAuthenticated: true,
          email: data.email,
          username: data.username,
          country: data.country,
        });
        toast.success('Account created successfully');
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } catch (error) {
        setLoading(false);
        toast.error(t('USER_CREATION_NOT_SUCCESSFUL'));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.message.includes('email-already-in-use') ? t('EMAIL_EXISTS') : t('USER_CREATION_FAILED')
      );
    }
  };

  return (
    <div className="flex justify-center items-center max-w-screen-md w-full">
      <form
        className="bg-white p-8 shadow-md rounded-lg sm:w-400 md:w-400 lg:w-400 xl:w-400 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">{t('register')}</h2>
        <Toaster />
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            {t('username')}
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            defaultValue={username}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">{errors.username?.message && <>{t(errors.username?.message, {minLength: validations[getValues('country')]?.userNameMinChars})}</>}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            defaultValue={email}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">{errors.email?.message && <>{t(errors.email?.message)}</>}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            {t('password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            defaultValue={password}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">{errors.password?.message && <>{t(errors.password?.message, {minLength: MIN_PASSWORD_LENGTH})}</>}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
            {t('country')}
          </label>
          <select
            id="country"
            {...register('country')}
            defaultValue={country}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">{t('selectCountry')}</option>
            {Object.keys(validations).map((code) => (
              <option key={code} value={code} id={code}>
                {validations[code].country}
              </option>
            ))}
          </select>
          <span className="text-red-500">
            {errors.country?.message && <>{errors.password?.message}</>}
          </span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={loading}
          >
            {loading ? t('creatingUser') : t('register')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
