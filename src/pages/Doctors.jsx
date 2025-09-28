import  { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { doctors, reviews } = useContext(AppContext);

  const getDoctorWithReviews = (doc) => {
  const docReviews = reviews.filter((r) => r.doctorId === doc.id);
  const avgRating =
    docReviews.length > 0
      ? docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length
      : 0;

  return {
    ...doc,
    rating: avgRating,
    reviewsCount: docReviews.length,
  };
};
  

  const applyFilter = () => {
    const allDocs = doctors.map((d) => getDoctorWithReviews(d));
    const sortedDocs = allDocs.sort((a, b) => b.rating - a.rating);
    if (speciality) {
      setFilterDoc(sortedDocs.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(sortedDocs);
    }
  }

  useEffect(()=>{
    applyFilter()
  }, [speciality, doctors, reviews])

  return (
    <div>
      <p className='text-gray-600'>Browser to the Doctors Specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-gray-600 text-sm ${showFilter ?'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  hover:bg-blue-100`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-100`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  hover:bg-blue-100`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  hover:bg-blue-100`}>Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  hover:bg-blue-100`}>Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  hover:bg-blue-100`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6'>
          {
          filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item.id}`)}
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
                    className={i < Math.round(item.rating || 0) ? "text-yellow-400" : "text-gray-300"}
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
      </div>
    </div>
  );
}

export default Doctors
