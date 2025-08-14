import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          Contact<span className="text-gray-700 font-medium">Us</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-14 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-md text-gray-600"> We'd love to hear from you. Feel free to reach out to us using the details below.</p>
          <p className="font-semibold text-lg text-gray-700">Address</p>
          <p className="text-gray-600">Mediflow Healthcare Pvt. Ltd. <br />
            123 Health Street, 2nd Floor,<br />
            tirupati, Andhra Pradesh - 517501</p>
          <p className="text-gray-600">📞 +91 98765 43210 <br /> 📧 support@mediflow.com</p>
          <p className="font-semibold text-lg text-gray-700">CAREERS AT PRESCRIPTO</p>
          <p className="text-gray-600">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 rounded-sm text-sm hover:bg-black hover:text-white transition-all duration-500">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
