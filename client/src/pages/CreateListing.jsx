import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ ImageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.ImageUrls.length < 7)
       {

        setUploading(true);
        setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            ImageUrls: formData.ImageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);

      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          )
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      ImageUrls: formData.ImageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main>
      <h1 className="font-semibold text-3xl text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            id="name"
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="62"
            minLength="10"
            required
          />
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking_lot" />
              <span>Parking Slot</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 ">
            <div className="flex gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <span className="my-5">Beds</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span className="my-5">Beds</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span className="my-5">Regular Price($ / Month)</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span className="my-5">Discounted Price($ / Month)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="text-slate-700 gap-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex  gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button disabled={uploading}
              onClick={handleImageSubmit}
              className=" p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.ImageUrls.length > 0 &&
            formData.ImageUrls.map((url, index) => (
              <div
                key={url}
                className="justify-between flex p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing-image"
                  className="rounded-lg w-20 h-20 object-contain "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-95"
                >
                  delete
                </button>
              </div>
            ))}
          <button
            type="button"
            className="text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3"
          >
            create listing
          </button>
        </div>
      </form>
    </main>
  );
}
