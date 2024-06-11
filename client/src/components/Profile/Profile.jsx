import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg w-full p-3 mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold my-7 text-2xl text-center">Profile</h1>
        <form className="flex flex-col gap-4">
          <div className="w-32 h-32 cursor-pointer shadow-md rounded-full overflow-hidden self-center">
            <img
              src={currentUser.profilePicture}
              alt="user"
              className="bg-[lightgray] border-8 rounded-full object-cover w-full h-full"
            ></img>
          </div>

          <TextInput
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
          ></TextInput>
          <TextInput
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
          ></TextInput>
          <TextInput
            type="password"
            placeholder="********"
            id="password"
          ></TextInput>
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            {" "}
            Update
          </Button>
        </form>
        <div className="flex justify-between">
          <span className="text-sm cursor-pointer text-red-500">
            Delete Account
          </span>
          <span className="text-sm cursor-pointer text-red-500">Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
