import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore'; // Import your Zustand store
import useThemeStore from '../store/useThemeStore';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, generateToken, messaging, onMessageListener } from "../../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';
import { validations } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";

const schema = z.object({
  // username: z.string(),
  emailOrUserName: z.string(),
  password: z.string().min(8)
}).refine((data) => data.emailOrUserName.length >= 6, {
  path: ["emailOrUserName"],
  message: "Username too short"
})

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const {t} = useTranslation()

  const navigate = useNavigate()

  useEffect(()=>{
    generateToken()
  },[])

  onMessage(messaging, (payload) => {
    console.log(payload)
    toast(
        <span>
          <b>{payload.notification?.title}</b>
          <div>{payload.notification?.body}</div>
        </span>
      ),
      {
        icon: <IoIosGlobe />,
      }
  })

  const {theme} = useThemeStore()

  const { username, email, password, login } = useAuthStore();

  const siginInWithEmail = async (data:any, isEmail:boolean) => {
    const {emailOrUserName, password} = data
    try {
      const response = await signInWithEmailAndPassword(auth, emailOrUserName, password);
      setLoading(false)
      // Check for an error in the UserCredential object
      if (response && response.user) {
        // Login was successful, handle the user or the UserCredential as needed
        console.log("Login successful:", response.user);
        login({
          userName: !isEmail ? emailOrUserName : "",
          email: isEmail ? emailOrUserName: ""
        })
        toast.success(t('loginSuccessful'))
        setTimeout(()=>{
          navigate('/profile')
        }, 1500)
      } else {
        console.error("Unexpected response:", response);
        toast.error(t("Unexpected response:", response))
      }
    } catch (error:any) {
      // Handle the authentication error
      toast.error(t('INVALID_LOGIN_CREDENTIALS'))
      console.error("Authentication error:", error.message);
      setLoading(false)
    }
  }

  const onSubmit = async (data:any) => {
    setLoading(true)
    const isEmail = data.emailOrUserName.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ? true: false
    if(isEmail) {
      siginInWithEmail(data, true)
    }
    else {
        let isMatchFound = false;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          const {userName, email} = doc.data();
          if(userName === data.emailOrUserName) {
            isMatchFound = true;
            siginInWithEmail({
              emailOrUserName: email,
              password: data.password
            }, false)
          }
        });
        if (!isMatchFound) {
          alert('No matching username found.');
        }
    }
  };

  return (
    <div className="flex justify-center items-center max-w-screen-md w-full">
      <form className="bg-white p-8 shadow-md rounded-lg sm:w-400 md:w-400 lg:w-400 xl:w-400 w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className={`${theme.titleFontSize} font-bold mb-4 text-center`}>{t('login')}</h2>
        <div className="mb-4">
          <Toaster/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            {t('username')}
          </label>
          <input
            type="text"
            id="emailOrUserName"
            {...register('emailOrUserName')}
            defaultValue={email}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">
            {errors.email?.message && <>{errors.email?.message}</>}
          </span>
        </div> 
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            {t('password')}
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={loading}
          >
            {loading? t('loggingIn') : t('login')}
          </button> {/* disable button on progress on all pages*/}
        </div>
      </form>
    </div>
  );
};

export default LoginForm