import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user ? (
        <div></div>
      ) : (
        <nav className=" z-10 py-2 bg-slate-200 shadow-md">
          <div className="flex justify-evenly font-semibold font-mono">
            <h2 className="">
              <Link className="text-3xl text-blue-900 hover:text-blue-600" to="/">Weather</Link>
            </h2>

            <h5 className="self-center ">
                <Link className="text-xl text-blue-900 hover:text-blue-600" to="admin">Admin Table</Link>
            </h5>

            <button 
            onClick={handleSignOut}
            className="self-center px-2 py-1 border-2 border-blue-600 rounded-md hover:text-white hover:bg-blue-600">
                Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
