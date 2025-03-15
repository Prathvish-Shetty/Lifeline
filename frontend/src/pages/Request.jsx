import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAllBloodbanks } from '../services/utilityService.js';
import { bloodGroups } from '../constants.js';
import { createRequest } from '../services/requestService.js';
import Alert from '../components/Alert.jsx';

function Request() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [bloodBankList, setBloodBankList] = useState([]);
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
  
    useEffect(() => {
      const fetchBloodbanks = async () => {
        try {
          const bloodbanks = await getAllBloodbanks()
          // console.log(bloodbanks.data)
          setBloodBankList(bloodbanks.data.map(({ _id, name }) => ({ id: _id, name })));
        } catch (error) {
          console.error("Error fetching blood banks:", error);
          setBloodBankList([])
        }
      }
      fetchBloodbanks()
    }, [])
  
    const onSubmit = async (data) => {
      try {
        console.log(data)
        await createRequest(data)
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
    <div className='h-auto flex justify-center items-center py-2'>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">

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

        <label className="fieldset-label">Enter Blood Units Required</label>
        <input
          type="tel"
          {...register("unitsRequested", {
            required: "Blood Units is required",
            pattern: {
              value: /^(3[5-9][0-9]|[4-9][0-9]{2}|10000)$/,
              message: "Enter a valid value (350-10000 ml)"
            }
          })}
          className="input"
          placeholder="Blood Units (in ml)"
        />
        {errors.unitsRequested && <p className="text-red-500">{errors.unitsRequested.message}</p>}

        <label className="fieldset-label">Select Delivery Date</label>
        <input
          type="date"
          {...register("requestDate", { required: "Delivery date is required" })}
          className="input"
        />
        {errors.requestDate && <p className="text-red-500">{errors.requestDate.message}</p>}

        <button type="submit" className="btn btn-neutral mt-4">Request Blood</button>
      </form>
      {success && <Alert text="Blood Requested successfully" />}
      {fail && <Alert text="Failed to Request Blood" />}
    </div>
  )
}

export default Request