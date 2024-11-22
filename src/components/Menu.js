import React, { useState, useEffect, useContext } from 'react';
import Layout from './Layout'; // Import Layout for consistent navbar and footer
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles
import { UserContext } from '../context/UserContext'; // Import UserContext
import '../App.css'; // If using App.css

const localizer = momentLocalizer(moment);

const Menu = () => {
  const { user } = useContext(UserContext); // Get the logged-in user
  const [events, setEvents] = useState([]); // Store events for the calendar
  const [formSelections, setFormSelections] = useState({
    boss1: '',
    gear1: '',
    boss2: '',
    gear2: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event for displaying popup

  // Fetch scheduled events from the backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-schedule'); // Backend API for getting scheduled events
        if (response.ok) {
          const data = await response.json();

          // Transform backend data into calendar event format
          const formattedEvents = data.map((event) => ({
            title: event.bosses.join(', '), // Combine all boss names into a single string
            start: new Date(event.start_date),
            end: new Date(event.start_date), // Adjust if the boss schedule includes end dates
            timeSlot: event.slot, // Store time slot for reference
            eventDetails: event.bosses, // Store the list of bosses for this event
          }));

          setEvents(formattedEvents);
        } else {
          console.error('Failed to fetch schedule');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  // Fetch user's form selections
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/forms/${user.username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched form data:', data);  // Log the data for debugging
          setFormSelections({
            boss1: data.boss1 || 'N/A',
            gear1: data.gear1 || 'N/A',
            boss2: data.boss2 || 'N/A',
            gear2: data.gear2 || 'N/A',
          });
        } else {
          console.error('Failed to fetch form data');
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    if (user?.username) {
      fetchFormData();
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
      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center justify-start bg-gray4 text-white pt-20">
        {/* Calendar Dashboard */}
        <div className="bg-gray3 w-4/5 p-4 rounded-lg mb-6">
          <h2 className="text-center text-lg font-bold mb-2">Upcoming Events</h2>
          <div
            style={{
              height: '520px', // Increase height here to make the calendar taller
              background: 'white',
              borderRadius: '8px',
              padding: '5px',
              color: 'black',
            }}
          >
            <Calendar
              localizer={localizer}
              events={events} // Display the fetched events
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent} // Set event to be displayed when clicked
              selectable={false} // Prevent selection of dates
              eventPropGetter={eventStyleGetter} // Apply custom styles to events
            />
          </div>
        </div>

        {/* Form Selection Dashboard */}
        <div className="bg-gray3 w-4/5 p-4 rounded-lg">
          <h2 className="text-center text-lg font-bold mb-2">Your Selections</h2>
          <div className="text-center">
            <p>Boss 1: {formSelections.boss1}</p>
            <p>Gear 1: {formSelections.gear1}</p>
            <p>Boss 2: {formSelections.boss2}</p>
            <p>Gear 2: {formSelections.gear2}</p>
          </div>
        </div>
      </main>

      {/* Popup for displaying boss names and time */}
      {selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="text-xl font-bold">Scheduled Bosses</h2>
            {/* Display the time only once */}
            <p className="text-sm mb-4">
              Time: {moment(selectedEvent.start).format('YYYY-MM-DD hh:mm A')}
            </p>
            <ul>
              {/* Loop through bosses and only display their names */}
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
    </Layout>
  );
};

export default Menu;
