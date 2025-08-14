import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const currencySymbol = "$";
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [userData, setUserData] = useState(false);
  const userId = token;
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const API_URL = "https://mediflow-backend-1.onrender.com";

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/doctors`);
      setDoctors(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/patients/${userId}`);
      setUserData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user profile");
    }
  };

  const updateUserProfile = async (updatedUser) => {
    try {
    const res = await axios.put(`${API_URL}/patients/${updatedUser.id}`, updatedUser);
    return res.data;
    } catch (err) {
    toast.error("Profile update failed");
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/appointments`);
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    }
  };

  const bookAppointment = async ({ docId, slotDate, slotTime }) => {
  try {
    if (!userData) {
      toast.warn("Please log in to book an appointment");
      return;
    }

    const datetime = `${slotDate} at ${slotTime}`;

    const docInfo = doctors.find(doc => doc.id === docId);
    if (!docInfo) {
      toast.error("Doctor not found");
      return;
    }

    const { data: existingAppointments } = await axios.get(`${API_URL}/appointments`);
    const isSlotTaken = existingAppointments.some(
      (a) => a.doctorId === docId && a.datetime === datetime
    );

    if (isSlotTaken) {
      toast.error("This slot is already booked for this doctor.");
      return;
    }


    const imageURL = docInfo.image?.startsWith("blob:")
      ? "https://i.ibb.co/C3v5Dp0b/doc1.png"
      : docInfo.image;

    const newAppointment = {
      id: Date.now().toString(),
      doctorId: docInfo.id,
      doctorName: docInfo.name,
      speciality: docInfo.speciality,
      image: imageURL,
      address: docInfo.address,
      patientName: userData.name,
      patientEmail: userData.email,
      patientAge: userData.age,
      patientGender: userData.gender,
      patientBloodGroup: userData.bloodGroup,
      patientAddress: userData.address,
      patientPhone: userData.phone,
      patientImage: userData.image || "https://i.ibb.co/wZYqYwDK/upload-area.png",
      datetime,
      status: "Unpaid",
      paymentMethod: "",
      appstatus: "pending",
    };

    await axios.post("https://mediflow-backend-1.onrender.com/appointments", newAppointment);
    await fetchAppointments();
    toast.success("Appointment booked successfully!");
    navigate('/my-appointments');
    console.log("Booking appointment:", newAppointment);
  } catch (err) {
    console.error(err);
    toast.error("Booking failed");
  }
};

const cancelAppointment = async (id) => {
  try {
    await axios.delete(`${API_URL}/appointments/${id}`);
    toast.success("Appointment cancelled");
    fetchAppointments(); 
  } catch (err) {
    toast.error("Failed to cancel appointment");
  }
};

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    updateUserProfile,
    fetchAppointments,
    bookAppointment,
    appointments,
    cancelAppointment
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
