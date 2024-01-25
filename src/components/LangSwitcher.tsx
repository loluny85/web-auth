import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";
import useThemeStore from "../store/useThemeStore";
import { ThemeKey } from "../config/themes";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { setTheme, setIsRtl } = useThemeStore();

  const changeLanguage = (lng: ThemeKey) => {
    i18n.changeLanguage(lng);
    setTheme(lng);
    setIsRtl(lng)
  };

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "عربي" }
  ];

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
}

export default LanguageSwitcher;
