import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useThemeStore from '../store/useThemeStore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthStore } from '../store/useAuthStore';
import toast, {Toaster} from 'react-hot-toast'
import { useTranslation } from "react-i18next";

interface UserData {
  [key: string]: string;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({});
  const { theme } = useThemeStore();
  const { email } = useAuthStore();
  const {t} = useTranslation()
  useEffect(() => {
    fetchUserDetails();
  }, [email]);

  const fetchUserDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        const { email: userEmail } = doc.data();
        if (userEmail === email) {
          setUserData(doc.data() as UserData);
        }
      });
    } catch(error: any) {
        console.error(t('USER_FETCH_FAILED'));
        toast.error(t('USER_FETCH_FAILED'))
    }
  };

  // TODO - create an enum for country

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100 overflow-x-hidden relative md:w-full">
        <div className="w-1/2 bg-white p-4 hidden md:flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
          <Toaster />
          {Object.entries(userData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong className="text-gray-700">{key}:</strong> {value}
            </div>
          ))}
        </div>
        <div className={`w-1/2 bg-gradient-to-l ${theme.bodyBackground} to-transparent p-4`}></div>
      </div>
    </>
  );
};

export default ProfilePage;