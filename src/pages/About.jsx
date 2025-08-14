import { assets } from "../assets/assets"

const About = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 text-gray-500">
        <p >About <span className="text-gray-700 font-medium">Us</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p> Mediflow is a healthcare platform that connects patients with trusted doctors and healthcare providers. Our mission is to make healthcare accessible and convenient for everyone.</p>
          <p> We offer a wide range of services including online consultations, appointment bookings, and access to medical resources. Our team is dedicated to providing quality care and support to our users. At Mediflow, we believe in the power of technology to improve healthcare experiences. We are committed to continuously enhancing our platform to better serve our users and meet their healthcare needs. </p>
          <b className="text-gray-700">Our Vision</b>
          <p> Our vision is to revolutionize the healthcare industry by leveraging technology to improve patient experiences and outcomes. We aim to create a seamless healthcare journey for our users, from finding the right doctor to managing appointments and medical records.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p> WHY <span className="text-gray-700 font-semibold"> CHOOSE US </span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            We streamline the process of finding and booking appointments with doctors, saving you time and effort.
          </p>
        </div>
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>
            Our platform allows you to access healthcare services from the comfort of your home, making it easier to manage your health.  
          </p>
        </div>
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            We provide personalized recommendations based on your health needs and preferences, ensuring you receive the best care possible.  
          </p>
        </div>
      </div>

    </div>
  )
}

export default About
