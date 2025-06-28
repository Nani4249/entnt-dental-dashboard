import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);
    const calendar = [];

    let day = 1;
    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < firstDay) || day > totalDays) {
          row.push(null);
        } else {
          row.push(new Date(year, month, day));
          day++;
        }
      }
      calendar.push(row);
    }
    return calendar;
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const appointmentsOnDate = (date) => {
    const target = formatDate(date);
    return appointments.filter(a =>
      a.appointmentDate?.startsWith(target)
    );
  };

  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const calendar = generateCalendar();
  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div style={{ padding: 30 }}>
      <h2>Appointment Calendar</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={goToPreviousMonth}>⬅️ Prev</button>{" "}
        <strong>{monthLabel}</strong>{" "}
        <button onClick={goToNextMonth}>Next ➡️</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, wIdx) => (
            <tr key={wIdx}>
              {week.map((date, dIdx) => (
                <td
                  key={dIdx}
                  style={{ cursor: date ? "pointer" : "default", backgroundColor: selectedDate && date && formatDate(date) === formatDate(selectedDate) ? "#e0f7fa" : "white" }}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date ? date.getDate() : ""}
                  <div style={{ fontSize: "10px", color: "green" }}>
                    {date && appointmentsOnDate(date).length > 0 && `${appointmentsOnDate(date).length} appt(s)`}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <h3>Appointments on {formatDate(selectedDate)}</h3>
          {appointmentsOnDate(selectedDate).length === 0 ? (
            <p>No appointments</p>
          ) : (
            <ul>
              {appointmentsOnDate(selectedDate).map((appt, i) => (
                <li key={i}>
                  <strong>{appt.title}</strong> – ₹{appt.cost} – Status: {appt.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
