import React, { useState, useEffect } from "react";
import LoginFormComponent from "../components/auth/LoginFormComponent";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-96 max-w-3xl flex flex-col items-center justify-center mx-auto">
        <h3 className="text-primary py-2 w-full my-2 text-center text-3xl font-thin">
          Login Page
        </h3>
        <div className="max-w-md mx-auto mt-10"></div>
        <div className="grid grid-rows-1 grid-cols-2 gap-6 border   border-primary-300  p-4 my-11 shadow-xl max-w-4xl mx-auto rounded-xl">
          <div>
            <img src="images/register.png" />
          </div>
          <div>
            <LoginFormComponent />
            <div className="py-30"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
