import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewForm = ({ appointment, onClose }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reviews", {
        appointmentId: appointment.id,
        doctorName: appointment.doctorName,
        patientName: appointment.patientName,
        rating,
        reviewText,
        createdAt: new Date().toISOString(),
      });
      toast.success("Review submitted!");
      onClose();
    } catch (err) {
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Submit Review for <span className="text-blue-700">{appointment.doctorName}</span></h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-1 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}★</option>
              ))}
            </select>
          </label>
          <label>
            Review:
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <button type="submit" className="bg-primary py-2 rounded text-white hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
