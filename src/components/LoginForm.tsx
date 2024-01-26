import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, generateToken, messaging } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoIosGlobe } from 'react-icons/io';
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../config/config';
interface FormData {
  emailOrUserName: string;
  password: string;
}

const schema = z.object({
  emailOrUserName: z.string(),
  password: z.string(),
}).refine((data) => data.emailOrUserName.length >= MIN_USERNAME_LENGTH, {
  path: ['emailOrUserName'],
  message: 'USERNAME_TOO_SHORT'
}).refine((data) => data.password.length >= MIN_PASSWORD_LENGTH, {
  path: ['password'],
  message: 'PASSWORD_TOO_SHORT'
})

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    generateToken();
  }, []);

  onMessage(messaging, (payload) => {
    toast(
      <span>
        <b>{payload.notification?.title}</b>
        <div>{payload.notification?.body}</div>
      </span>,
      {
        icon: <IoIosGlobe />,
      }
    );
  });

  const { theme } = useThemeStore();
  const { email, password, login } = useAuthStore();

  const signInWithEmail = async (data: FormData, isEmail: boolean) => {
    const { emailOrUserName, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, emailOrUserName, password);
      setLoading(false);
      if (response && response.user) {
        login({
          email: emailOrUserName
        });
        toast.success(t('loginSuccessful'));
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        const errorMessage = response instanceof Error ? response.message : 'Unknown error';
        toast.error(errorMessage);
      }
    } catch (error: any) {
      toast.error(t('INVALID_LOGIN_CREDENTIALS'));
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const isEmail = data.emailOrUserName.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ? true : false;
    if (isEmail) {
      signInWithEmail(data, true);
    } else {
      let isMatchFound = false;
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        const { userName, email } = doc.data();
        if (userName === data.emailOrUserName) {
          isMatchFound = true;
          signInWithEmail(
            {
              emailOrUserName: email,
              password: data.password,
            },
            false
          );
        }
      });
      if (!isMatchFound) {
        toast.error(t('USERNAME_NOT_FOUND'));
      }
    }
  };

  return (
    <div className="flex justify-center items-center max-w-screen-md w-full">
      <form className="bg-white p-8 shadow-md rounded-lg sm:w-400 md:w-400 lg:w-400 xl:w-400 w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className={`${theme.titleFontSize} font-bold mb-4 text-center`}>{t('login')}</h2>
        <div className="mb-4">
          <Toaster />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            {t('username')}
          </label>
          <input
            type="text"
            id="emailOrUserName"
            {...register('emailOrUserName')}
            defaultValue={email}
            placeholder="Email or Username"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">{errors.emailOrUserName?.message && <>{t(errors.emailOrUserName?.message)}</>}</span>
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={loading}
          >
            {loading ? t('loggingIn') : t('login')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
