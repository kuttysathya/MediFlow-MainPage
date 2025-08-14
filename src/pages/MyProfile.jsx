import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import {assets} from '../assets/assets';

const MyProfile = () => {
  const { userData, setUserData, updateUserProfile } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [image, setImage] = useState(false)


  const handleSave = async () => {
    const updatedProfile = { ...editData };
    if (image) {
      updatedProfile.image = URL.createObjectURL(image); 
    }
    const success = await updateUserProfile(updatedProfile);  
    if (success) {
      setUserData(updatedProfile);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Something went wrong!");
    }
    setIsEdit(false);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    userData && (
      <div className="flex flex-col max-w-lg gap-2 text-sm">

        {
          isEdit
          ? <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image): userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12" src={image ? null : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          : <img className="w-36 rounded" src={userData.image} alt="Profile" />
        }

        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl rounded-sm font-medium max-w-60 mt-4"
            type="text"
            value={editData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 border-b-2 border-zinc-300 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-3 mt-3 text-neutral-700">
            <p className="font-medium">Email Id:</p>
            <p className="text-blue-500 underline">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 p-1 rounded-sm max-w-52"
                type="text"
                value={editData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 p-1 rounded-sm max-w-52"
                type="text"
                value={editData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>
        <div className="text-neutral-500 underline mt-3">BASIC INFORMATION</div>
        <div className="grid grid-cols-[1fr_3fr] gap-3 mt-3 text-neutral-700">
          <p className="font-medium">Age:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-1 rounded-sm max-w-52"
              type="number"
              value={editData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          ) : (
            <p>{userData.age}</p>
          )}
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 p-1 rounded-sm max-w-52"
              onChange={(e) => handleChange("gender", e.target.value)}
              value={editData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
          <p className="font-medium">Blood Group:</p>
          <p>{userData.bloodGroup}</p>
          <p className="font-medium">DOB:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-1 rounded-sm max-w-52"
              type="date"
              value={editData.DOB}
              onChange={(e) => handleChange("DOB", e.target.value)}
            />
          ) : (
            <p>{userData.DOB}</p>
          )}
        </div>
        <div className="mt-10">
          {
          isEdit ? (
            <button className="border border-primary px-8 py-2 rounded-md hover:bg-primary  hover:text-white transition-all" onClick={handleSave}> Save</button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-md hover:bg-primary  hover:text-white transition-all"
              onClick={() => {
                setIsEdit(true);
                setEditData(userData);
              }}>
              Edit </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
