import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a listing
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
              className="p-3 border border-gray-300 rounded-w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button className=" p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3">
            create listing
          </button>
        </div>
        <button>
            
        </button>
      </form>
    </main>
  );
}
