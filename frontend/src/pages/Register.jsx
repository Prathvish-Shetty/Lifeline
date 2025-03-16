import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { stateDistrictData, bloodGroups } from '../constants.js';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService.js';
import Alert from '../components/Alert.jsx';


function Register() {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const selectedRole = watch("role"); // Watching the "role" field
  const selectedState = watch("state");

  // Clear 'district' when 'state' changes to avoid incorrect data
  useEffect(() => {
    setValue("district", "");
  }, [selectedState]);

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const response = await registerUser(data)
      // console.log("Registration Successful:", response);
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000);
      navigate('/login');
    } catch (error) {
      // console.error("Registration Failed:", error.message);
      setFail(true)
      setTimeout(() => setFail(false), 2000);
    }
  };

  return (
    <div className='h-auto flex justify-center items-center py-2'>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">

        {/* Common Fields */}
        <label className="fieldset-label">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text" className="input" placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="fieldset-label">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email" className="input" placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="fieldset-label">Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password" className="input" placeholder="Password"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <label className="fieldset-label">Phone</label>
        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
          })}
          className="input"
          placeholder="Phone"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <label className="fieldset-label">Address</label>
        <textarea
          {...register("address", { required: "Address is required" })}
          className="textarea" placeholder="Address"
        />

        <label className="fieldset-label">State</label>
        <select
          {...register("state", { required: "State is required" })}
          defaultValue="Choose your state" className="select"
        >
          <option disabled={true}>Choose your state</option>
          {stateDistrictData && Object.keys(stateDistrictData).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <label className="fieldset-label">District</label>
        <select
          {...register("district", { required: "District is required" })}
          className="select"
          defaultValue=""
        >
          <option disabled={true} value="">Choose your district</option>
          {selectedState && stateDistrictData[selectedState]?.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}

        </select>
        {errors.district && <p className="text-red-500">{errors.district.message}</p>}


        <label className="fieldset-label">Role</label>
        <select
          {...register("role", { required: "Role is required" })}
          defaultValue="Choose your Role" className="select"
        >
          <option disabled={true}>Choose your Role</option>
          <option value="donor">Donor</option>
          <option value="bloodBank">Blood Bank</option>
          <option value="hospital">Hospital</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        {/* Conditional Fields Based on Role */}
        {selectedRole === "donor" && (
          <>
            <label className="fieldset-label">Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="input"
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

            <label className="fieldset-label">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="select"
            >
              <option disabled value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

            <label className="fieldset-label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Blood group is required" })}
              className="select"
            >
              <option disabled value="">Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}

            <label className="fieldset-label">Last Donation Date (if donated)</label>
            <input
              type="date"
              {...register("lastDonationDate")}
              className="input"
            />
          </>
        )}

        {(selectedRole === "hospital" || selectedRole === "bloodBank") && (
          <>
            <label className="fieldset-label">License Number</label>
            <input
              type="text"
              {...register("licenseNumber", { required: "License number is required" })}
              className="input"
              placeholder="License Number"
            />
            {errors.licenseNumber && <p className="text-red-500">{errors.licenseNumber.message}</p>}
          </>
        )}

        <button type="submit" className="btn btn-neutral mt-4">Register</button>
      </form>
      {success && <Alert text={"Registration successfull"}/>}
      {fail && <Alert text={"Registration Unsuccessful"}/>}
    </div>
  )
}

export default Register