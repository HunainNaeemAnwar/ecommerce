"use client";
import React from "react";
import { useSession ,signOut } from "next-auth/react";

const LogOut = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user && (
        <button onClick={() => signOut()} className="font-Poppins rounded-tl-full rounded-bl-full absolute bg-black text-white md:px-4 px-2 py-1 top-[140px] md:top-32 xl:top-28 right-0 text-[14px] z-20 transition transform  hover:-translate-x-2">
          Log Out
        </button>
      )}
    </div>
  );
};

export default LogOut;
