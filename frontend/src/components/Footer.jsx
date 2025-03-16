import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <p>
          © {new Date().getFullYear()} Lifeline Blood Bank. All Rights Reserved.
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Quick Links</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/about" className="link link-hover">About Us</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
        <Link to="/" className="link link-hover">FAQs</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to="/" className="link link-hover">Donate Blood</Link>
        <Link to="/" className="link link-hover">Request Blood</Link>
        <Link to="/" className="link link-hover">Find Blood Banks</Link>
        <Link to="/" className="link link-hover">My Appointments</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Resources</h6>
        <Link to="/" className="link link-hover">Donation Guidelines</Link>
        <Link to="/" className="link link-hover">Eligibility Criteria</Link>
        <Link to="/" className="link link-hover">Health Tips</Link>
        <Link to="/" className="link link-hover">Events & Campaigns</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/" className="link link-hover">Terms of Service</Link>
        <Link to="/" className="link link-hover">Privacy Policy</Link>
        <Link to="/" className="link link-hover">Cookie Policy</Link>
      </nav>
    </footer>
  )
}

export default Footer
