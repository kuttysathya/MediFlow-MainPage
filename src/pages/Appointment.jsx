import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from "react-toastify";


const Appointment = () => {

  const { docId } = useParams()
  const { doctors, reviews, currencySymbol, bookAppointment} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
  const doc = doctors.find(doc => doc.id === docId);
  if (!doc) return;

  const docReviews = reviews.filter((r) => r.doctorId === doc.id);
  const avgRating =
    docReviews.length > 0
      ? docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length
      : 0;

  const enrichedDoc = {
    ...doc,
    rating: avgRating,
    reviewsCount: docReviews.length,
  };

  setDocInfo(enrichedDoc);
};

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting Current Date
    let today = new Date();

    for(let i=0; i<7; i++){
      //getting Date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //Setting Hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots=[];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        //add Slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })

        //increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      //set time slots to the doctor
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(()=>{
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  },[docSlots])

  return (
    docInfo && (
      <div>
        {/* ----------Doctor Datails------------ */}
        <div className="flex flex-col sm:flex-row my-2  gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0">
            {/* -----------Doctor-Info----------- */}

            <p className="flex items-center gap-2 text-gray-900 font-medium text-xl ">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-md">
                {docInfo.experience}
              </button>
            </div>
            {/* -----------Doctor About-------- */}
            
            {docInfo.availability ? (
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
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.round(docInfo.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
                <p className="text-sm text-gray-600 ml-2">
                  ({docInfo.reviewsCount || 0} reviews)
                </p>
              </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900  mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ------------Booking Slots----------- */}

        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
      <p>Booking Slots</p>
      <div className="flex items-center gap-4 w-full overflow-x-scroll mt-4">
        {docSlots.length &&
          docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 min-w-14 rounded-md cursor-pointer 
                ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-300"
                }`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
      </div>

      <div className="flex items-center gap-3 mt-8 w-full overflow-x-scroll">
        {docSlots.length &&
          docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-3 py-1 rounded-md cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border border-gray-400"
              }`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
      </div>

      <button
        onClick={() => {
          const selectedDate = docSlots[slotIndex][0]?.datetime;
          const formattedDate = selectedDate.toLocaleDateString("en-GB");

          if (!slotTime) return toast.warn("Please select a time slot");

          bookAppointment({
            docId,
            slotDate: formattedDate,
            slotTime,
          });
        }}
        disabled={!slotTime}
            className={`text-sm font-light px-12 py-3 rounded-xl my-8 ${
              slotTime
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
      >
        Book an appointment
      </button>
    </div>

        {/* -----------List of Related Doctors-------------- */}

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment
