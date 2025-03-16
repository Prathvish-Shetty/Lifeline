import React, { useState, useEffect, useCallback } from 'react'
import { getUserProfile } from '../services/dataService' // Import the API service
import { getAppointments } from '../services/donationService'
import { getRequests } from '../services/requestService'
import { StatusBadge } from '../components/StatusBadge'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [donations, setDonations] = useState(null)
  const [requests, setRequests] = useState(null)

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getUserProfile()  // Fetch profile data
      // console.log(response.user)
      setProfile(response.user)
      if (response.user.role === 'donor') {
        const donationResponse = await getAppointments()
        setDonations(donationResponse.data)
        // console.log(donationResponse.data)
      }
      else if (response.user.role === 'hospital') {
        const requestResponse = await getRequests()
        setRequests(requestResponse.data)
        // console.log(requestResponse.data)
      }
    } catch (error) {
      console.error("Error fetching profile data:", error)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])


  return (
    <>
      <div className="card bg-base-200 w-96 shadow-sm m-auto my-10">
        {profile && <div className="card-body">
          <h2 className="card-title self-center">Profile</h2>
          <div className="space-y-4">
            {[
              { label: 'Name', value: profile.name },
              { label: 'Email', value: profile.email },
              { label: 'Phone', value: profile.phone },
              { label: 'Role', value: profile.role },
              { label: 'Address', value: profile.address },
              { label: 'District', value: profile.district },
              { label: 'State', value: profile.state }
            ].map(({ label, value }) => (
              <div className="flex justify-between" key={label}>
                <span className="font-semibold">{label}:</span>
                <span>{value || "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
        }
      </div>

      {(donations && donations.length > 0) &&
        <div className="card bg-base-200 w-fit p-6 shadow-sm m-auto my-10">
          <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Donations</h2>
            <table className="table w-auto">
              <thead>
                <tr>
                  <th>Blood Bank Name</th>
                  <th>Blood Group</th>
                  <th>Units (ml)</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations && donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.bloodBankId?.name || "N/A"}</td>
                    <td>{donation.bloodGroup}</td>
                    <td>{donation.units}</td>
                    <td>{new Date(donation.appointmentDate).toLocaleDateString()}</td>
                    <td>
                      {< StatusBadge status={donation.status} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      {(requests && requests.length > 0) &&
        <div className="card bg-base-200 w-fit p-6 shadow-sm m-auto my-10">
          <div className="overflow-x-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Requests</h2>
            <table className="table w-auto">
              <thead>
                <tr>
                  <th>Blood Bank Name</th>
                  <th>Blood Group</th>
                  <th>Units (ml)</th>
                  <th>Request Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests && requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.bloodBankId?.name || "N/A"}</td>
                    <td>{request.bloodGroup}</td>
                    <td>{request.unitsRequested}</td>
                    <td>{new Date(request.appointmentDate).toLocaleDateString()}</td>
                    <td>
                      {< StatusBadge status={request.status} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      {/* No Donations/Requests Message */}
      {donations && donations.length === 0 && profile.role === 'donor' && (
        <p className="text-center text-gray-500">No donations yet.</p>
      )}

      {requests && requests.length === 0 && profile.role === 'hospital' && (
        <p className="text-center text-gray-500">No requests yet.</p>
      )}
    </>
  )
}

export default Profile
