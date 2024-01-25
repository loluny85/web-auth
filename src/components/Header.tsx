import LanguageSwitcher from "./LangSwitcher";
import { SiAuthelia } from "react-icons/si";
import useThemeStore from '../store/useThemeStore';
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function Header() {
  const {theme} = useThemeStore()
  const {t} = useTranslation()
  const {signout: clearState, isAuthenticated} = useAuthStore()
  const navigate = useNavigate()

  const signOutUser = async () => {
    try {
      await signOut(auth).then(()=>{
        clearState()
        toast.success(t('signedOut'))
        sessionStorage.clear() // Clearing any persisted data
        setTimeout(()=>{
          navigate("/")
        }, 1500)
      })
    } catch (err) {
      toast.error(t('SIGNOUT_FAILED'))
      console.error('signout failed');
    }
  };
    
  return (
    <div className={`sticky top-0 p-4 ${theme.headerBackground} text-white w-full z-10`}>
    <div className="flex items-center justify-between">
      <SiAuthelia style={{ color: "white", height: "48px", width: "48px" }} />
      <div className="flex">
        {isAuthenticated ? <button
          className={`underline`}
          onClick={signOutUser}
        >
          {t("signout")}
        </button> : null }
        <LanguageSwitcher />
      </div>
    </div>
  </div>
  )
}

export default Header