import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "./store/useAuthStore"; // Import your Zustand store
import { validations } from "./config/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      country: z.string().min(1),
    })
    .refine(
      (data) =>
        data.username.length >= validations[data.country].userNameMinChars,
      {
        path: ["username"],
        message: t("shortUserName"),
      }
    )
    .refine((data) => data.username.length <= 10, {
      path: ["username"],
      message: t("longUserName"),
    })
    .refine(
      (data) => !!data.username.match(validations[data.country].validRegex),
      {
        path: ["username"],
        message: t('userNameIncorrectFormat'),
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema)
  });

  const {
    username,
    email,
    password,
    country,
    register: registerUser,
  } = useAuthStore();

  const onSubmit = async (data: any) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: data.email,
          userName: data.username,
          country: data.country,
        });
        console.log("Document written with ID: ", docRef.id); //TODO - Add toast message whereever console or error message
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (error) {
      console.log("reg err - ", error);
    }
    // registerUser();
  };

  return (
    <div className="flex justify-center items-center max-w-screen-md w-full">
      <form
        className="bg-white p-8 shadow-md rounded-lg sm:w-400 md:w-400 lg:w-400 xl:w-400 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t('userName')}
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            defaultValue={username}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">
            {errors.username?.message && <>{errors.username?.message}</>}
          </span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            defaultValue={email}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">
            {errors.email?.message && <>{errors.email?.message}</>}
          </span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t('password')}
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            defaultValue={password}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500">
            {errors.password?.message && <>{errors.password?.message}</>}
          </span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t('country')}
          </label>
          <select
            id="country"
            {...register("country")}
            defaultValue={country}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Country</option>
            <option id="AE" value="AE">
              UAE
            </option>
            <option id="IN" value="IN">
              India
            </option>
            <option id="FR" value="FR">
              France
            </option>
          </select>
          <span className="text-red-500">
            {errors.country?.message && <>{errors.password?.message}</>}
          </span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {t('register')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
