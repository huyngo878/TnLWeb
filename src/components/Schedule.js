import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Default styles
import Layout from './Layout';
import { UserContext } from '../context/UserContext'; // Assuming you have a user context for admin check
import '../App.css'; // Ensure that App.css is imported for styling

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const { user } = useContext(UserContext); // Get the user context to check if the user is an admin
  const [events, setEvents] = useState([]); // Store events for the calendar
  const [isAdmin, setIsAdmin] = useState(false); // Admin check
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event for displaying popup

  // Fetch schedule from the backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('http://164.92.101.175:3001/get-schedule'); // Update this URL based on your backend
        const data = await response.json();

        // Format backend data into calendar event format
        const formattedEvents = data.map((event) => ({
          title: event.bosses.join(', '), // Combine all boss names into a single string
          start: new Date(event.start_date),
          end: new Date(event.start_date), // Adjust if the boss schedule includes end dates
          timeSlot: event.slot, // Store time slot for reference
          eventDetails: event.bosses, // Store the list of bosses for this event
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  // Check if the user is an admin
  useEffect(() => {
    if (user && user.is_admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleSelectEvent = (event) => {
    // Open the popup and set the event details
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null); // Close the popup by setting selectedEvent to null
  };


  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#C5630C', // Apply gray-6 background color to events
        color: 'white', // Ensure text is white
        borderRadius: '5px',
        border: 'none',
      },
    };
  };


  return (
    <Layout>
      <div className="bg-gray-6 text-white p-4 flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold mb-4">Schedule</h1>
        <div
          style={{
            height: '60vh', // Adjust height as needed
            width: '80%',   // Adjust width for centering
            background: 'white',
            borderRadius: '8px',
            padding: '10px',
            color: 'black',
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={isAdmin} // Only allow selection if the user is an admin
            onSelectEvent={handleSelectEvent} // Set event to be displayed when clicked
            style={{
              height: '100%',
              fontSize: '0.8rem', // Smaller font size for compact look
            }}
            className="small-calendar"
            eventPropGetter={eventStyleGetter} // Apply custom styles to events
          />
        </div>

        {/* Popup for displaying boss names and time */}
        {selectedEvent && (
          <div className="popup">
            <div className="popup-content">
              <h2 className="text-xl font-bold">Scheduled Bosses</h2>
              <p className="text-sm">
                Time: {moment(selectedEvent.start).format('YYYY-MM-DD hh:mm A')}
              </p>
              <ul>
                {selectedEvent.eventDetails.map((boss, index) => (
                  <li key={index}>
                    {boss}
                  </li>
                ))}
              </ul>
              <button
                className="bg-red-500 text-white p-2 rounded mt-4"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Schedule;
