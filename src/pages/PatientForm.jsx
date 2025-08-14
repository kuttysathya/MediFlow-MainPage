import { useState } from "react";
import axios from "axios";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    datetime: "",
    symptoms: "",
    allergies: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      patientName: formData.name,
      age: formData.age,
      email: formData.email,
      phone: formData.phone || "N/A",
      status: "Confirmed",
      payment: "-",
      datetime: formData.datetime,
      symptoms: formData.symptoms || "N/A",
      allergies: formData.allergies || "N/A",
    };

    await axios.post("http://localhost:5000/appointments", appointmentData);
    alert("Appointment booked successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Book Appointment</h2>

      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="datetime" type="datetime-local" onChange={handleChange} required />
      <textarea name="symptoms" placeholder="Symptoms" onChange={handleChange}></textarea>
      <textarea name="allergies" placeholder="Allergies" onChange={handleChange}></textarea>

      <button type="submit">Book Now</button>
    </form>
  );
}
