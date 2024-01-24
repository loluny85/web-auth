import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from './store/useAuthStore'; // Import your Zustand store
import { validations } from './config/config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1),
}).refine((data) => data.username.length >= validations[data.country].userNameMinChars, {
  path: ["username"],
  message: "Username too short"
}).refine((data) => data.username.length <= 10, {
  path: ["username"],
  message: "Username too login"
});

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(schema),
    });
  
    const { username, email, password, country, register: registerUser } = useAuthStore();
  
    const onSubmit = async (data: any) => {
      try {
        const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log(response);
    } catch(error) {
        console.log('reg err - ', error)
    }   
      // registerUser();
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white p-8 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              defaultValue={username}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500">
              {errors.username?.message && <>{errors.username?.message}</>}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              defaultValue={email}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500">
              {errors.email?.message && <>{errors.email?.message}</>}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              defaultValue={password}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500">
              {errors.password?.message && <>{errors.password?.message}</>}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <select
              id="country"
              {...register('country')}
              defaultValue={country}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Country</option>
              <option id="IN" value="IN">India</option>
              <option id="FR" value="FR">France</option>
              <option id="SP" value="SP">Spain</option>
              <option id="RU" value="RU">Russia</option>
            </select>
            <span className="text-red-500">
              {errors.country?.message && <>{errors.password?.message}</>}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    );
  };

  export default RegisterForm