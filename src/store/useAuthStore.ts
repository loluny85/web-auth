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
    // console.log('Registration logic:');
  },
  login: (data: any) => {
    debugger
    set({
      isAuthenticated: true,
      email:data.email,
      username: data.userName
    })
  },
}),{
  name: "auth store",
  storage: createJSONStorage(()=>sessionStorage)
}
) as any
);

export { useAuthStore };