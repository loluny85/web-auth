// config/themes.ts

export type ThemeKey = 'default' | 'en' | 'fr';

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
};

type TThemesType = {
  [key in ThemeKey]: Theme;
};

// Themes object containing styles for different themes.
const themes: TThemesType = {
  default: {
    primaryColor: 'blue',
    secondaryColor: 'white',
  },
  en: {
    primaryColor: 'blue',
    secondaryColor: 'white',
  },
  fr: {
    primaryColor: 'red',
    secondaryColor: 'blue',
  },
};

export default themes;