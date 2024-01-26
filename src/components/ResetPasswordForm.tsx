import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

interface FormData {
  email: string;
}

const schema = z.object({
  email: z.string().email(),
});

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();

  const onSubmit = async (data: FormData) => {
    reset();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email).then(() => {
        toast.success(t('checkYourEmail'));
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      toast.error(t('RESET_PASSWORD_FAILED'));
      console.error('Reset password failed');
    }
  };

  return (
    <div className="flex justify-center items-center max-w-screen-md w-full">
      <form
        className="bg-white p-8 shadow-md rounded-lg sm:w-400 md:w-400 lg:w-400 xl:w-400 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <div className="mb-4">
            <input
              type="text"
              id="email"
              {...register('email')}
              placeholder={t('enterEmail')}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            {
              <span className="text-red-500">
                {errors.email?.message && <>{t('INVALID_EMAIL')}</>}
              </span>
            }
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {loading ? t('sendingEmail') : t('resetPassword')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
