import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import LoadingComponent from "../utils/LoadingComponent";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod schema for login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const LoginFormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // string | null

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location = "/home";
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginUser = async (data) => {
    setError(null);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      setLoading(false);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Invalid Credentials");
      toast.error("Invalid Credentials");
    }
  };

  const inputFieldClass =
    "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm";

  return (
    <>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}

      <form
        className="mt-2 space-y-2 flex flex-col"
        onSubmit={handleSubmit(loginUser)}
      >
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

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginFormComponent;
