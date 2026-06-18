import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import SuccessComponent from "../utils/SuccessComponent";
import LoadingComponent from "../utils/LoadingComponent";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for the register form
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    mobile: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .max(15, "Mobile number must be at most 15 digits"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterFormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location.href = "/home";
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerUser = async (data) => {
    setError(null);
    try {
      setLoading(true);

      await axios.post("/api/users/register", data);

      setLoading(false);
      setSuccess(true);

      reset();

      toast.success("User Registered Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSuccess(false);
      setError("Error Registering User");

      toast.error(err?.response?.data?.error || "Error Registering User");
    }
  };

  const inputFieldClass =
    "mt-1 block w-full px-3 py-2 gap-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm";

  return (
    <>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {success && <SuccessComponent message="User Registered Successfully" />}

      <p className="text-xs text-center">All Fields are Required</p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(registerUser)}>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name"
            {...register("name")}
            className={inputFieldClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            {...register("email")}
            className={inputFieldClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            id="mobile"
            type="tel"
            placeholder="Enter your Mobile"
            {...register("mobile")}
            className={inputFieldClass}
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-red-600">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            {...register("password")}
            className={inputFieldClass}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
            {...register("confirmPassword")}
            className={inputFieldClass}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 "
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterFormComponent;

