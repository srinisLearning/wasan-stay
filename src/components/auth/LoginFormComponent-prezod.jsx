import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import LoadingComponent from "../utils/LoadingComponent";
import { toast } from "react-hot-toast";
import { z } from "zod";

// ✅ Zod schema for login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const LoginFormComponent = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // string | null
  const [fieldErrors, setFieldErrors] = useState({}); // { email?: string; password?: string }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location = "/home";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear that field's error when typing
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const result = loginSchema.safeParse(user);

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

  const loginUser = async (e) => {
    e.preventDefault();

    // ✅ Zod validation
    const result = loginSchema.safeParse(user);

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
      const response = await axios.post("/api/users/login", result.data);
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

      <form className="mt-2 space-y-2 flex flex-col" onSubmit={loginUser}>
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
