import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from './store/useAuthStore'; // Import your Zustand store
import useThemeStore from './store/useThemeStore';

const schema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8)
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const {theme} = useThemeStore()

  const { username, email, password, login } = useAuthStore();

  const onSubmit = (data:any) => { //TODO - Pass data as arg and use inside the onSubmit
    console.log(data)
    // Call your login function with the form data
    // updateField('username', data.username);
    // updateField('email', data.email);
    // updateField('password', data.password);
    // updateField('country', data.country);
    login();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2" style={{color: theme?.primaryColor}}>
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm