import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";

const MyAppointments = () => {
  const { appointments, cancelAppointment, fetchAppointments } =
    useContext(AppContext);

  const [paymentForId, setPaymentForId] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const handlePayment = async (appointmentId, method) => {
    try {
      await axios.patch(`https://mediflow-backend-1.onrender.com/appointments/${appointmentId}`, {
        status: "Paid",
        paymentMethod: method,
      });
      toast.success(`Payment successful via ${method}`);
      setPaymentForId(null);
      fetchAppointments();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.doctorName}
              </p>
              <p>{item.speciality}</p>
              <p className="mt-1 text-zinc-700 font-medium">Address</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {item.datetime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {item.status === "Paid" ? (
                <div className="bg-green-100 border text-green-700 py-2 px-4 rounded text-center">
                  ✅ Payment Complete
                </div>
              ) : paymentForId === item.id ? (
                <div className="bg-gray-100 border p-2 rounded flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    Choose Payment Method:
                  </p>
                  <button
                    onClick={() => handlePayment(item.id, "PhonePe")}
                    className="text-sm border py-1 rounded hover:bg-purple-600 hover:text-white"
                  >
                    📱 PhonePe
                  </button>
                  <button
                    onClick={() => handlePayment(item.id, "Paytm")}
                    className="text-sm border py-1 rounded hover:bg-blue-600 hover:text-white"
                  >
                    💳 Paytm
                  </button>
                  <button
                    onClick={() => setPaymentForId(null)}
                    className="text-xs text-red-600 mt-1 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setPaymentForId(item.id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              <button
                onClick={() => cancelAppointment(item.id)}
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Cancel Appointment
              </button>

              {item.prescription && (
                <button
                  onClick={() => setSelectedPrescription(item)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  View Prescription
                </button>
              )}
              {/* Show Submit Review only if prescription exists */}
              {item.prescription && (
                <button
                  onClick={() => setSelectedReview(item)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-yellow-500 hover:text-white transition-all duration-300"
                >
                  Submit Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <ReviewForm
          appointment={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      {/* Prescription Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-y-auto">
          <div className="flex justify-center min-h-screen p-4">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPrescription(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg z-10"
              >
                ✖
              </button>

              <div className="p-6 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center border-b pb-4 mb-4">
                  <div className="text-center flex-1">
                    <img
                      src="https://i.ibb.co/F4g71TpB/logo.png"
                      alt="MediFlow Logo"
                      className="mx-auto w-18 h-12"
                    />
                    <h1 className="text-gray-600 text-sm">
                      Mediflow Healthcare Pvt. Ltd. 123 Health Street, 2nd
                      Floor,
                      <br />
                      tirupati, Andhra Pradesh - 517501 <br />
                      <span className="text-xs font-bold text-gray-500">
                        📞 +91 98765 43210 | 📧 support@mediflow.com
                      </span>
                    </h1>
                  </div>
                  <img
                    src="https://i.ibb.co/8DzyJMrv/header-img.png"
                    alt="header-img"
                    className="w-36 h-28 mr-8"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPrescription.image}
                      alt={selectedPrescription.doctorName}
                      className="w-16 h-16 rounded-full border"
                    />
                    <div>
                      <h2 className="text-xl font-bold">
                        {selectedPrescription.doctorName}
                      </h2>
                      <p className="text-gray-600">
                        {selectedPrescription.speciality}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {selectedPrescription.address.line1},{" "}
                        {selectedPrescription.address.line2}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p className="text-xs">
                      Date: {selectedPrescription.datetime}
                    </p>
                    <p className="text-sm">
                      Appointment ID: {selectedPrescription.id}
                    </p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="mt-4 flex items-center gap-4 border-b pl-6 pb-4">
                  <div>
                    <h3 className="font-semibold">
                      {selectedPrescription.patientName}
                    </h3>
                    <p className="text-gray-600">
                      Age: {selectedPrescription.patientAge}
                    </p>
                    <p className="text-gray-600">
                      Email: {selectedPrescription.patientEmail}
                    </p>
                    <p className="text-gray-600">
                      Phone: {selectedPrescription.patientPhone}
                    </p>
                    <p className="text-gray-600">
                      Gender: {selectedPrescription.patientGender}
                    </p>
                    <p className="text-gray-600">
                      Address: {selectedPrescription.patientAddress}
                    </p>
                    <p className="text-gray-600">
                      Blood-Group: {selectedPrescription.patientBloodGroup}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-700">
                    <span className="font-semibold">Diagnoses:</span>{" "}
                    {selectedPrescription.diagnoses || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Allergies:</span>{" "}
                    {selectedPrescription.allergies || "N/A"}
                  </p>
                </div>

                {/* Prescription Table */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Prescription</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Medicine
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Dosage
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Duration
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Interval
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPrescription.prescription.map((med, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {med.medicine}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {med.dosage}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {med.duration}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {med.interval}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Thank you & Signature */}
                <div className="mt-6 pt-4 text-center">
                  <p className="text-gray-600">
                    Thank you for visiting MediFlow!
                  </p>
                  <div className="mt-16 flex justify-end">
                    <div className="text-center">
                      <p className="w-32 mx-auto">Signature</p>
                      <p className="font-semibold">
                        {selectedPrescription.doctorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedPrescription.speciality}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
