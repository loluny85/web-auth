import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from './store/useAuthStore'; // Import your Zustand store
import useThemeStore from './store/useThemeStore';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, generateToken, messaging } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8)
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(()=>{
    generateToken()
    onMessage(messaging, (payload) => {
      alert(444444444)
      toast("Hello World")
    })
  },[])

  const addTodo = async (e:any) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          todo: "Hello-todo-1",    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth).then(()=>{
        console.log('signout successful')
      })
    } catch (err) {
      console.log(err);
      console.log('signout failed');
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, 'joy.bangalore.9@gmail.com').then(()=>{
        console.log('Reset email successful')
      })
    } catch (err) {
      console.log(err);
      console.log('Reset email failed');
    }
  };

  const {theme} = useThemeStore()

  const { username, email, password, login } = useAuthStore();

  // TODO - Do Push notification

  const onSubmit = (data:any) => { //TODO - Pass data as arg and use inside the onSubmit
    // TODO - change the any for above
    
    // login(); //TODO uncomment and add below inside login in authstore
    // localLogin(data)
  };

  const localLogin = async (data:any) => {
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
  
      // Check for an error in the UserCredential object
      if (response && response.user) {
        // Login was successful, handle the user or the UserCredential as needed
        console.log("Login successful:", response.user);
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      // Handle the authentication error
      console.error("Authentication error:", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      
      <form className="bg-white p-8 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <Toaster/>
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
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add TODO
        </button>
        <button
          onClick={resetPassword}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Reset password
        </button>
        <button
          onClick={signOutUser}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          sign out user
        </button>
      </form>
    </div>
  );
};

export default LoginForm