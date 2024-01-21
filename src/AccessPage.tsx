import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LangSwitcher";
import { SiAuthelia } from "react-icons/si";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const {isAuthenticated} = useAuthStore()
  const { t } = useTranslation();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      Auth : {""+isAuthenticated}
      <header className="bg-blue-500 p-4 text-white w-full">
        <div className="flex items-center justify-between">
        <SiAuthelia style={{ color: 'white', height: '48px', width: '48px' }} />
        <LanguageSwitcher />
        </div>
      </header>
      <div className="space-x-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            isLogin ? "" : "opacity-50"
          }`}
          onClick={toggleForm}
          disabled={!isLogin}
        >
          {t('register')}
        </button>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            isLogin ? "opacity-50" : ""
          }`}
          onClick={toggleForm}
          disabled={isLogin}
        >
          Login
        </button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default App;
