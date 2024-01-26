import React from 'react';
import { useTranslation } from 'react-i18next';
import useThemeStore from '../store/useThemeStore';
import { ThemeKey } from '../config/themes';
import { languageOptions } from '../config/config';

const LanguageSwitcher: React.FC = (): JSX.Element => {
  const { i18n } = useTranslation();
  const { setTheme, setIsRtl } = useThemeStore();

  const changeLanguage = (lng: ThemeKey): void => {
    i18n.changeLanguage(lng);
    setTheme(lng);
    setIsRtl(lng);
  };

  return (
    <div className="flex">
      <select
        id="language"
        onChange={(e) => changeLanguage(e.target.value as ThemeKey)}
        value={i18n.language}
        className="border rounded-md py-1 px-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;