import React, { useState, useEffect, useCallback } from 'react'
import { getInventory } from '../services/inventoryService'
import { appointments, requests, updateAppointmentStatus, updateRequestStatus } from '../services/bloodbankService'
import { useForm } from 'react-hook-form'
import { StatusBadge } from '../components/StatusBadge'

function Dashboard() {
  const [inventory, setInventory] = useState()
  const [appointmentList, setAppointmentList] = useState([])
  const [requestList, setRequestList] = useState([])
  const { register } = useForm()
  
  const fetchInventory = useCallback(async () => {
    try {
      const inventory = await getInventory()
      setInventory(inventory.data)
      // console.log(inventory)
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchAppointments = useCallback(async () => {
    try {
      const allAppointments = await appointments()
      // console.log(allAppointments.data)
      setAppointmentList(allAppointments.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchRequests = useCallback(async () => {
    try {
      const allRequests = await requests()
      // console.log(allRequests.data)
      setRequestList(allRequests.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    fetchInventory()
    fetchAppointments()
    fetchRequests()
  }, [fetchInventory, fetchAppointments, fetchRequests])

  const handleStatusChangeAppointments = useCallback(async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      setAppointmentList((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  }, []);


  const handleStatusChangeRequests = useCallback(async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      setRequestList((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: newStatus }
            : request
        )
      );
    } catch (error) {
      console.error("Failed to update request status:", error);
    }
  }, []);


  return (
    <div className='h-auto flex flex-col gap-20 justify-around items-center py-10'>
      <div className="overflow-x-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <table className="table w-auto">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Units Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory && Object.entries(inventory).map(([type, units]) => (
              <tr key={type}>
                <td>{type.replace("_pos", "+").replace("_neg", "-")}</td>
                <td>{units}</td>
                <td>
                  {units === 0 ? (
                    <span className="badge badge-error">Critical</span>
                  ) : units < 350 ? (
                    <span className="badge badge-warning">Low</span>
                  ) : (
                    <span className="badge badge-success">Sufficient</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <table className="table w-auto">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Blood Group</th>
              <th>Units (ml)</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentList && appointmentList.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.donorId?.name || "N/A"}</td>
                <td>{appointment.bloodGroup}</td>
                <td>{appointment.units}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>
                  {< StatusBadge status={appointment.status} />}
                </td>
                <td>
                  <select
                    {...register(`action_appointment_${appointment._id}`)}  // Unique registration for each entry
                    defaultValue={appointment.status}            // Correct default value
                    className="select"
                    onChange={(e) =>
                      handleStatusChangeAppointments(appointment._id, e.target.value)
                    }
                    disabled={appointment.status === "Completed" || appointment.status === "Rejected"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirm</option>
                    <option value="Completed">Complete</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Requests</h2>
        <table className="table w-auto">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Blood Group</th>
              <th>Units (ml)</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestList && requestList.map((request) => (
              <tr key={request._id}>
                <td>{request.hospitalId?.name || "N/A"}</td>
                <td>{request.bloodGroup}</td>
                <td>{request.unitsRequested}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>
                  {<StatusBadge status={request.status} />}
                </td>
                <td>
                  <select
                    {...register(`action_request_${request._id}`)}  // Unique registration for each entry
                    defaultValue={request.status}            // Correct default value
                    className="select"
                    onChange={(e) =>
                      handleStatusChangeRequests(request._id, e.target.value)
                    }
                    disabled={request.status === "Completed" || request.status === "Rejected"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirm</option>
                    <option value="Completed">Complete</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}


export default Dashboard