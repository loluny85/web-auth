import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TState = {
  isAuthenticated: boolean;
  username: string;
  email: string;
  password: string;
  country: string;
  login: () => void;
  register: () => void;
};

const useAuthStore = create<TState>(persist((set) => ({
  isAuthenticated: false,
  username: '',
  email: '',
  password: '',
  country: '',
  register: () => {
    console.log('Registration logic:');
  },
  login: () => {
    set({
      isAuthenticated: true
    })
  },
}),{
  name: "auth store",
  storage: createJSONStorage(()=>sessionStorage)
}
) as any
);

export { useAuthStore };