import React from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
        />
        <button className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
         <span className="text-blue-700">SignIn</span>
        </Link>
      </div>
    </div>
  );
}