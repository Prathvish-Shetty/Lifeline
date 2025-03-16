import React from 'react'
import logo from '../assets/Logo.svg'

function Contact() {
  return (
    <div className="hero bg-base-200 min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={logo}
          className="max-w-md rounded-lg"
          alt="Blood Donation"
        />
        <div className="ml-10">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="py-4 text-lg">
            Have questions or need assistance? We're here to help you. Feel free to reach out to us for
            blood donation inquiries, requests, or partnerships.
          </p>

          <div className="space-y-4">
            <div>
              <span className="font-semibold">📍 Address:</span> Pune, Maharashtra - 411001
            </div>

            <div>
              <span className="font-semibold">📞 Phone:</span> +91 98765 43210
            </div>

            <div>
              <span className="font-semibold">📧 Email:</span> support@lifeline.com
            </div>

            <div>
              <span className="font-semibold">🕒 Working Hours:</span> Mon - Sat | 9:00 AM - 6:00 PM
            </div>
          </div>

          <button className="btn btn-primary mt-6">Get in Touch</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
