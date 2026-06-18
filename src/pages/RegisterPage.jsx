import React, { useState, useEffect } from "react";
import RegisterFormComponent from "../components/auth/RegisterFormComponent";

const RegisterPage = () => {
  return (
    <>
      <div className="min-h-96 max-w-3xl flex flex-col items-center justify-center mx-auto">
        <h3 className="text-primary py-2 w-full my-2 text-center text-3xl font-thin">
          Register Page
        </h3>
        <div className="grid grid-rows-1 grid-cols-2 gap-6 border border-primary-300 p-4 my-4 shadow-xl max-w-4xl mx-auto rounded-xl">
          <div className="flex items-center justify-center">
            <img src="images/register.png" />
          </div>
          <div>
            <RegisterFormComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
