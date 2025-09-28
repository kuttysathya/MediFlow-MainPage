import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ReviewForm = ({ appointment, onClose }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const {addReview} = useContext(AppContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (reviewText.trim().length < 10) {
    return toast.warn("Please write at least 10 characters in your review.");
  }

  const newReview = {
    appointmentId: appointment.id,
    doctorId: appointment.doctorId,
    patientName: appointment.patientName,
    rating,
    reviewText,
    createdAt: new Date().toISOString(),
  };

  try {
    await addReview(newReview);
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
          <div>
            <p className="mb-1 font-medium">Rating:</p>
            <div className="flex gap-1 text-5xl cursor-pointer">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
          </div>
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
