import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAllBloodbanks } from '../services/utilityService.js';
import { bookAppointments } from '../services/donationService.js';
import { bloodGroups } from '../constants.js';
import Alert from '../components/Alert.jsx';

function Donate() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [bloodBankList, setBloodBankList] = useState([]);
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const fetchBloodbanks = useCallback(async () => {
    try {
      const bloodbanks = await getAllBloodbanks()
      // console.log(bloodbanks.data)
      setBloodBankList(bloodbanks.data.map(({ _id, name }) => ({ id: _id, name })));
    } catch (error) {
      console.error("Error fetching blood banks:", error);
      setBloodBankList([])
    }
  }, [])
  useEffect(() => {
    fetchBloodbanks()
  }, [fetchBloodbanks])

  const onSubmit = async (data) => {
    try {
      // console.log(data)
      await bookAppointments(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      // console.log(error)
      setFail(true)
      setTimeout(() => setFail(false), 2000);
    }
    reset()
  }

  return (
    <>
      <div className='h-auto flex justify-center items-center py-2'>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">

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

          <label className="fieldset-label">Enter your Weight</label>
          <input
            type="number"
            {...register("weight", {
              required: "Weight is required",
              pattern: {
                value: /^(4[0-9]|[5-9][0-9]|[1-4][0-9]{2}|500)$/, // Accepts 40-500 only
                message: "Enter a valid weight (40-699 kg)"
              }
            })}
            className="input"
            placeholder="Weight (in kg)"
          />
          {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}

          <label className="fieldset-label">Select Blood Bank</label>
          <select
            {...register("bloodBankId", { required: "Blood Bank is required" })}
            defaultValue="Select Blood Bank" className="select"
          >
            <option disabled={true}>Select Blood Bank</option>
            {bloodBankList.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <label className="fieldset-label">Select Appointment Date</label>
          <input
            type="date"
            {...register("appointmentDate")}
            className="input"
          />

          <button type="submit" className="btn btn-neutral mt-4">Book Appointment</button>
        </form>
        {success && <Alert text="Appointment Booked successfully" />}
        {fail && <Alert text="Failed to book Appointment" />}
      </div>
    </>
  )
}

export default Donate