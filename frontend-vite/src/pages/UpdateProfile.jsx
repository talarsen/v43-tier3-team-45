import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setUserFirstName, setUserLastName } from "../store/userReducer";
import axiosInstance from "../util/AxiosInstance";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = async (user) => {
    const response = await axiosInstance.patch(`/users/${user.id}`, user);
    return response.data;
  };

  return (
    <>
      <h1 className="flex items-center justify-center text-2xl font-bold py-2">
        Account Settings
      </h1>
      <div className="flex items-center justify-center mb-1">
        <Avatar
          className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden"
          src={user.avatarUrl}
          alt={"user"}
        />
      </div>

      <form className=" w-full max-w-lg" onSubmit={handleSubmit(user)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane Doe"
              name="firstName"
              value={user.firstName}
              onChange={(e) => dispatch(setUserFirstName(e.target.value))}
            />

            <p className="text-red-500 text-xs italic">First Name.</p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane Doe"
              name="lastName"
              value={user.lastName}
              onChange={(e) => dispatch(setUserLastName(e.target.value))}
            />

            <p className="text-red-500 text-xs italic">Last Name.</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Role
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-role"
              type="text"
              placeholder="Software Engineer"
              value={user.role}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="example@domain.com"
              value={user.email}
            />
          </div>
        </div>
      </form>
      <button className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8">
        Submit
      </button>
    </>
  );
};

export default UpdateProfile;
