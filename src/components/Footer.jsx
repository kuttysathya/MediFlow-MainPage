import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        {/* ----------Left-Section------------ */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Mediflow is a trusted healthcare platform that connects patients with verified doctors across India. 
  We aim to make medical appointments simple, fast, and accessible for everyone. Your well-being is our mission.</p>
        </div>
        {/* ----------center-Section------------ */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/* ----------right-Section------------ */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 12345 67890</li>
                <li>Mediflow@gmail.com</li>
            </ul>
        </div>
      </div>

      {/* ----------right-Section------------ */}

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>&copy; {new Date().getFullYear()} Mediflow. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
