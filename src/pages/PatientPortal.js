import React, { useEffect, useState } from "react";

const PatientPortal = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const appts = JSON.parse(localStorage.getItem("appointments")) || [];

    const currentPatient = patients.find(p => p.id === authUser?.patientId);
    const myAppointments = appts.filter(a => a.patientId === authUser?.patientId);

    setPatient(currentPatient);
    setAppointments(myAppointments);
  }, [authUser]);

  if (!authUser || authUser.role !== "Patient") {
    return <h2 style={{ padding: 30 }}>Unauthorized. You are not a patient.</h2>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Welcome, {patient?.name}</h2>

      <h3>Profile</h3>
      <ul>
        <li><strong>DOB:</strong> {patient?.dob}</li>
        <li><strong>Contact:</strong> {patient?.contact}</li>
        <li><strong>Health Info:</strong> {patient?.healthInfo}</li>
      </ul>

      <h3 style={{ marginTop: 30 }}>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Next Visit</th>
              <th>Files</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.appointmentDate}</td>
                <td>₹{a.cost}</td>
                <td>{a.status}</td>
                <td>{a.nextDate || "N/A"}</td>
                <td>
                  {a.files?.length > 0 ? (
                    a.files.map((file, idx) => (
                      <div key={idx}>
                        <a href={file.url} target="_blank" rel="noreferrer">
                          {file.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    "No files"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientPortal;
