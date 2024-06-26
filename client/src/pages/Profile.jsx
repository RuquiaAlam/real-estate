import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
//firebase storage rules
//  allow read, write: if
//       request.resource.size>2*1024*1024 &&
//       request.resource.contentType.matches('image/*')

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const[fileError,setFileError]=useState(false);
  const[formData,setFormData]=useState({})


  console.log(filePerc);
  console.log(file);
  // console.log(fileError);
  console.log(formData);
  const { currentUser } = useSelector((store) => store.user);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
      console.log("Upload is " + filePerc + "done");
    },
    (error)=>
    {
      setFileError(true);
      console.log(error)

    },
    ()=>
      {

getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
{
  setFormData({...formData,avatar:downloadURL});

})
      })
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>

      <form className="flex flex-col gap-4   my-7 max-w-lg mx-auto ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar||currentUser.avatar}
          className="h-24 w-24 self-center object-cover rounded-full mt-2 cursor-pointer "
          alt="img"
        />
        <p className="self-center">
          {fileError ? (
            <span className="text-red-700">Error Image Upload(Image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

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
