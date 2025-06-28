import React, { useState, useEffect } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("patients", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (formData.id) {
      updated = patients.map(p =>
        p.id === formData.id ? formData : p
      );
    } else {
      const newPatient = {
        ...formData,
        id: "p" + Date.now()
      };
      updated = [...patients, newPatient];
    }
    setPatients(updated);
    saveToStorage(updated);
    setFormData({ id: "", name: "", dob: "", contact: "", healthInfo: "" });
  };

  const handleEdit = (patient) => {
    setFormData(patient);
  };

  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    saveToStorage(updated);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Patients</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input name="healthInfo" placeholder="Health Info" value={formData.healthInfo} onChange={handleChange} />
        <button type="submit">{formData.id ? "Update" : "Add"} Patient</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.dob}</td>
              <td>{p.contact}</td>
              <td>{p.healthInfo}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
