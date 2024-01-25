import LanguageSwitcher from "./LangSwitcher";
import { SiAuthelia } from "react-icons/si";
import useThemeStore from './store/useThemeStore';

function Header() {
    const {theme} = useThemeStore()
    
  return (
    <div className={`sticky top-0 p-4 ${theme.headerBackground} text-white w-full z-10`}>
    <div className="flex items-center justify-between">
      <SiAuthelia style={{ color: "white", height: "48px", width: "48px" }} />
      <LanguageSwitcher />
    </div>
  </div>
  )
}

export default Header