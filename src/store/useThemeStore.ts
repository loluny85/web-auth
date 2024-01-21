import {create} from'zustand';
import themes from '../config/themes';

type TState = {
    theme: any;
    setTheme: any;
}

const useThemeStore = create<TState>(set => ({
    theme: themes['default'],
    setTheme: (countryCode: string) => set({theme: themes[countryCode] ? themes[countryCode] : themes['default']})
}))

export default useThemeStore