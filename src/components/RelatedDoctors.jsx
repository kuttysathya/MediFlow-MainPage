import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({speciality, docId}) => {
  const { doctors, reviews } = useContext(AppContext);
  const navigate = useNavigate();

  const [ relDocs, setRelDocs] = useState([]);

  useEffect(() => {
  if (doctors.length > 0 && speciality) {
    const doctorsData = doctors
      .filter(doc => doc.speciality === speciality && doc.id !== docId)
      .map(doc => {
        const docReviews = reviews.filter(r => r.doctorId === doc.id);
        const avgRating = docReviews.length
          ? docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length
          : 0;
        return {
          ...doc,
          rating: avgRating,
          reviewsCount: docReviews.length,
        };
      });
    setRelDocs(doctorsData);
  }
}, [doctors, speciality, docId, reviews]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through out extensive list of trusted doctors
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item.id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              {item.availability ? (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                  <p>Not Available</p>
                </div>
              )}
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < (item.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
                <p className="text-sm text-gray-600 ml-2">
                  ({item.reviewsCount || 0} reviews)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-16 py-3 rounded-xl mt-10"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
