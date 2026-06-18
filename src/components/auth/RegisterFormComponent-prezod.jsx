import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import SuccessComponent from "../utils/SuccessComponent";
import LoadingComponent from "../utils/LoadingComponent";
import toast from "react-hot-toast";
import { z } from "zod";

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
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Field-level error state
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location.href = "/home";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this specific field when user types
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // Optional: validate entire form on blur of a field
  const handleBlur = (e) => {
    const { name } = e.target;

    const result = registerSchema.safeParse(user);

    if (!result.success) {
      const fieldIssue = result.error.issues.find(
        (issue) => issue.path[0] === name
      );

      if (fieldIssue) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: fieldIssue.message,
        }));
      }
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(user);

    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        errors[fieldName] = issue.message;
      });

      setFieldErrors(errors);
      setError("Validation failed. Please fix the errors and try again.");

      const firstIssue = result.error.issues[0];
      toast.error(firstIssue.message);
      return;
    }

    setError(null);

    try {
      setLoading(true);

      const payload = result.data;
      await axios.post("/api/users/register", payload);

      setLoading(false);
      setSuccess(true);

      setUser({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      setFieldErrors({});

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

      <form className="mt-8 space-y-6" onSubmit={registerUser}>
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
            name="name"
            type="text"
            placeholder="Enter your Name"
            value={user.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputFieldClass}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
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
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputFieldClass}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
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
            name="mobile"
            type="tel"
            placeholder="Enter your Mobile"
            value={user.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputFieldClass}
          />
          {fieldErrors.mobile && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.mobile}</p>
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
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputFieldClass}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
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
            value={user.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputFieldClass}
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {fieldErrors.confirmPassword}
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

