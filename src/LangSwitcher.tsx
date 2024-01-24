import { useTranslation } from 'react-i18next';
import { IoIosGlobe } from "react-icons/io";
import useThemeStore from './store/useThemeStore';
import {ThemeKey} from './config/themes';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const {setTheme} = useThemeStore()

  const changeLanguage = (lng:ThemeKey) => {
    i18n.changeLanguage(lng);
    setTheme(lng)
  };

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    // TODO - Add more languages as needed
  ];

  return (
    <div className="flex">
      <label htmlFor="language">
        <IoIosGlobe style={{height: '24px', width: '24px'}}/>
    </label>
      <select
        id="language"
        onChange={(e) => changeLanguage(e.target.value as ThemeKey)}
        value={i18n.language}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
