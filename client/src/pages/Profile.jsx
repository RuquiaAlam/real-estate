import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((store) => store.user);
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>

      <form className="flex flex-col gap-4   my-7 max-w-lg mx-auto">
        <img
          src={currentUser.avatar}
          className="h-24 w-24 self-center object-cover rounded-full mt-2 "
          alt="img"
        />
        <input type="text" placeholder="username" className="p-3 rounded-lg" />
        <input type="text" placeholder="email" className="p-3 rounded-lg" />
        <input type="text" placeholder="password" className="p-3 rounded-lg" />
        <button className="uppercase bg-slate-700 p-3 text-white rounded-lg hover:opacity-90 disabled:opacity-80">
          update
        </button>
       
      </form>
      <div className="flex  justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    
    </div>
  );
}
