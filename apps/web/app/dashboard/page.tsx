"use client";

import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import Navbar from "../../components/Main/Navbar";
import Input from "../../components/Input";
import RecentRooms from "../../components/RecentRooms";
import RoomValidation from "../../actions/roomValidation";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  const joinRoomRef = useRef<HTMLInputElement>(null);
  const createRoomRef = useRef<HTMLInputElement>(null);


  const joinRoomHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if(joinRoomRef.current?.value === "" || joinRoomRef.current?.value === undefined){
      return
    }
    try {
      const response = await RoomValidation(joinRoomRef.current?.value);
      if (response) {
        router.push(`/room/${joinRoomRef.current.value}`)
      }else{
        console.log("Nothing", response);
      }
    } catch (error) {
        console.log("Nothing error here");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(createRoomRef.current?.value === ""){
      alert("Cannot do this")
    }
    console.log(createRoomRef.current?.value);
    new Promise((resolve) => setTimeout(resolve, 12000))
  }


  return (
    <main className="flex flex-col">
      <Navbar />
      <span>{joinRoomRef.current?.value}</span>
      <span>{createRoomRef.current?.value}</span>
      <div className="flex w-full">
        <RecentRooms />
        <div className="mx-10 flex flex-col items-center justify-center space-y-10">
          <div className="flex flex-col">
            <span className="text-lg font-bold">Join Room</span>
            <div className="flex">
              <form onSubmit={joinRoomHandler}>
                <Input
                  placeholder="Enter Room ID"
                  className="pl-3 placeholder:pl-3"
                  type="text"
                  ref={joinRoomRef}
                />
                <Button
                  isLoading={false}
                  size={"default"}
                  variant={"default"}
                  type="submit"
                >
                  Join Room
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-col pl-3">
            <span className="mb-2 text-lg font-bold">Create Room</span>
            <div className="flex">
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Enter Room ID"
                  className="pl-3 placeholder:pl-3"
                  type="text"
                  ref={createRoomRef}
                />
                <Button
                  isLoading={false}
                  size={"default"}
                  variant={"default"}
                  type="submit"
                >
                  Create Room
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
