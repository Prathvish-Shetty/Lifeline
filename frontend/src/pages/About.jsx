import React from 'react'
import about from '../assets/about.png'

function About() {
  return (
    <div className="hero bg-base-200 min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={about}
          className="max-w-md rounded-lg"
          alt="About Lifeline"
        />
        <div className="ml-10">
          <h1 className="text-4xl font-bold">About Lifeline</h1>
          
          <p className="mt-4 text-lg">
            <span className="font-bold">Lifeline</span> is a platform designed to connect blood donors, hospitals, and blood banks — ensuring timely access to life-saving blood.
          </p>

          <p className="mt-4 text-lg">
            Donors can schedule appointments, track donations, and get reminders.  
            Hospitals can request blood quickly during emergencies.  
            Blood banks can manage inventory and streamline requests with ease.
          </p>

          <div className="mt-4 text-lg">
            <span className="font-semibold">Why Choose Lifeline?</span>  
            <ul className="list-disc pl-5 mt-2">
              <li>🩸 Real-time blood inventory updates.</li>
              <li>⏰ Quick and easy appointment scheduling.</li>
              <li>🏥 Fast-tracked blood requests for hospitals.</li>
              <li>🔒 Secure and reliable data management.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
