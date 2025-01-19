"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Button from "../Button";

export default function Navbar() {
    const session = useSession()
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-neutral-800 px-12">
      <span className="text-lg font-bold">Work Board</span>
      <div className="flex">
        <div className="flex justify-center items-center">
          <span className="wave opacity-90">👋</span>
          <span className="pl-3 opacity-60">{session.data?.user.name}</span>
          <Button isLoading={false} variant={'ghost'} className="ml-4 h-10 opacity-85">Log out</Button>
        </div>
      </div>
    </nav>
  );
}
