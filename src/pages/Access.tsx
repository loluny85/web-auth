import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import Header from '../components/Header';
import useThemeStore from '../store/useThemeStore';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleResetPassword = () => {
    setResetPassword(true);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100 overflow-x-hidden relative md:w-full">
        <div className={`w-1/2 bg-gradient-to-r ${theme.bodyBackground} to-transparent p-4 hidden md:block`}></div>
        <div className="flex flex-col items-center  md:w-1/2 w-full p-8">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="space-x-4 mt-4 w-full p-4">
            {isLogin ? (
              <div className="flex justify-between">
                <div>
                  <button
                    className={`text-blue-500 underline ${isLogin ? '' : 'opacity-50'}`}
                    onClick={handleResetPassword}
                    disabled={!isLogin}
                  >
                    {t('passwordForgot')}
                  </button>
                  {resetPassword ? <ResetPasswordForm /> : null}
                </div>
                <div>
                  {t('accountDontHave')} &nbsp;
                  <button
                    className={`text-blue-500 underline ${isLogin ? '' : 'opacity-50'}`}
                    onClick={toggleForm}
                    disabled={!isLogin}
                  >
                    {t('register')}
                  </button>
                </div>
              </div>
            ) : null}
            {!isLogin ? (
              <>
                {t('accountHave')} &nbsp;
                <button
                  className={`text-blue-500 underline ${isLogin ? 'opacity-50' : ''}`}
                  onClick={toggleForm}
                  disabled={isLogin}
                >
                  {t('login')}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
