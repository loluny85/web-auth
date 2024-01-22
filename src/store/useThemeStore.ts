import {create} from'zustand';
import themes, {Theme, ThemeKey} from '../config/themes';

type TState = {
    theme: Theme;
    setTheme: (key: ThemeKey) => void;
}

const useThemeStore = create<TState>(set => ({
    theme: themes['default'],
    setTheme: (countryCode: ThemeKey) => set({ theme: themes[countryCode] ?? themes['default'] }),
}));

export default useThemeStore;