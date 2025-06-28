import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    status: "Pending",
    nextDate: "",
    files: [] // ✅ Step 1
  });

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setAppointments(storedAppointments);
    setPatients(storedPatients);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("appointments", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ Step 2: File input handler - convert to base64
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const convertedFiles = await Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              url: reader.result // base64 URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    setFormData(prev => ({
      ...prev,
      files: convertedFiles
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;

    if (formData.id) {
      // Edit existing
      updated = appointments.map(a =>
        a.id === formData.id ? formData : a
      );
    } else {
      // New appointment
      const newAppointment = {
        ...formData,
        id: "a" + Date.now()
      };
      updated = [...appointments, newAppointment];
    }

    setAppointments(updated);
    saveToStorage(updated);

    // Reset form
    setFormData({
      id: "",
      patientId: "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      status: "Pending",
      nextDate: "",
      files: [] // reset files
    });
  };

  const handleEdit = (appt) => {
    setFormData(appt);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    saveToStorage(updated);
  };

  const getPatientName = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient ? patient.name : "(Unknown)";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Appointments Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <select name="patientId" value={formData.patientId} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>{" "}
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} />
        <input name="appointmentDate" type="datetime-local" value={formData.appointmentDate} onChange={handleChange} required />
        <input name="cost" placeholder="Cost" type="number" value={formData.cost} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <input name="nextDate" type="date" value={formData.nextDate} onChange={handleChange} />

        {/* ✅ Step 2: File input */}
        <input type="file" multiple onChange={handleFileChange} />

        <button type="submit">
          {formData.id ? "Update" : "Add"} Appointment
        </button>
      </form>

      {/* ✅ Appointment Table */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Title</th>
            <th>Appointment</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Next Date</th>
            <th>Files</th> {/* ✅ Step 3 */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{getPatientName(a.patientId)}</td>
              <td>{a.title}</td>
              <td>{a.appointmentDate}</td>
              <td>{a.status}</td>
              <td>₹{a.cost}</td>
              <td>{a.nextDate}</td>

              {/* ✅ Step 4: File preview/download links */}
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
                  "No Files"
                )}
              </td>

              <td>
                <button onClick={() => handleEdit(a)}>Edit</button>{" "}
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
