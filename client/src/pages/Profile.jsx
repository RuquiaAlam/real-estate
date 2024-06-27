import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {Link} from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

//firebase storage rules
//  allow read, write: if
//       request.resource.size>2*1024*1024 &&
//       request.resource.contentType.matches('image/*')

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((store) => store.user);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  console.log(formData);

  console.log(filePerc);
  console.log(file);
  // console.log(fileError);
  console.log(formData);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log("Upload is " + filePerc + "done");
      },
      (error) => {
        setFileError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4   my-7 max-w-lg mx-auto "
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="h-24 w-24 self-center object-cover rounded-full mt-2 cursor-pointer "
          alt="img"
        />
        <p className="self-center">
          {fileError ? (
            <span className="text-red-700">
              Error Image Upload(Image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          onChange={handleChange}
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="p-3 rounded-lg"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="p-3 rounded-lg"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          defaultValue={currentUser.password}
          className="p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="uppercase bg-slate-700 p-3 text-white rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex  justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5 ">{error ? error : ""}</p>
      <p className="text-green-700">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
