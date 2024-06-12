import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteFailure,deleteStart,deleteSuccess } from "../../stores/user/userSlice";
import axios from "axios";
import e from "express";

const Profile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [showModal, setShowModal ] = useState(false)
  const dispatch = useDispatch()
  const deleteUserProfile = async() => {
    setShowModal(false)
    try {
      const res = await axios.delete(`/api/v1/user/delete/${currentUser._id}`)
      if(!res){
        dispatch(deleteFailure(res.message))
      }else{
        dispatch(deleteSuccess(res))
      }
    } catch (error) {
      dispatch(deleteFailure(error.message))
    }
  }
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
          <span onClick={() => setShowModal(true)} className="text-sm cursor-pointer text-red-500">
            Delete Account
          </span>
          <span className="text-sm cursor-pointer text-red-500">Sign out</span>
        </div>
      </div>
      {
        error && 
        (
          <Alert color="failure">{error}</Alert>
        )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            {/* <div className="w-full mx-auto"> */}
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />

            {/* </div> */}
            <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete the user account?</p>
          </div>
          <div className="flex justify-between">
            <Button color="failure" onClick={() => deleteUserProfile()}>Yes,I'm sure</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
