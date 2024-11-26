import React, { useState, useEffect, useContext } from 'react';
import Layout from './Layout';
import { UserContext } from '../context/UserContext';

const Admin = () => {
    const { user } = useContext(UserContext); // Get the logged-in user
    const [submissions, setSubmissions] = useState([]); // All user submissions
    const [filteredSubmissions, setFilteredSubmissions] = useState([]); // Filtered submissions based on search
    const [selectedBosses, setSelectedBosses] = useState({
      boss1: '',
      boss2: '',
      boss3: '',
      boss4: '',
      boss5: '',
      boss6: '',
      boss7: '',
    }); // Selected bosses for each slot
    const [startDate, setStartDate] = useState(''); // Date for scheduling
    const [timeSlot, setTimeSlot] = useState(''); // Time for scheduling
    const [isAdmin, setIsAdmin] = useState(false); // Admin check
    const [searchQuery, setSearchQuery] = useState(''); // State for the search input
    const [bossStatistics, setBossStatistics] = useState([]);
    const handleScheduleBoss = async () => {
        // Ensure all fields are filled and selectedBosses is an array
        if (!startDate || !timeSlot || Object.values(selectedBosses).some(boss => boss === '')) {
            alert('Please fill in all fields.');
            return;
        }
    
        // Log the data being sent to the backend for debugging
        console.log('Sending data:', {
            selectedBosses,
            startDate,
            timeSlot
        });
    
        try {
            const response = await fetch('http://164.92.101.175:3001/add-boss-schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bosses: Object.values(selectedBosses), // Send selected bosses as an array
                    startDate,                            // Send the start date
                    timeSlot,                             // Send the selected time slot
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                // Reset form after successful submission
                setSelectedBosses({
                    boss1: '', boss2: '', boss3: '', boss4: '', boss5: '', boss6: '', boss7: ''
                });
                setStartDate('');
                setTimeSlot('');
            } else {
                alert(data.error); // Display error message from the backend
            }
        } catch (error) {
            console.error('Error scheduling boss:', error); // Log the error in case of failure
        }
    };
    
  // Boss options
  const bossOptions = [
    'Morokai',
    'Ahzreil',
    'Adentus',
    'Grand Aeolon',
    'Excavator-9',
    'Chernobog',
    'Talus',
    'Malakar',
    'Kowazan',
    'Cornelius',
    'Minezerok',
    'Junobote',
    'Nirma',
    'Aridus',
  ];

  // Fetch all submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://164.92.101.175:3001/admin-responses'); // Backend API
        const data = await response.json();
        setSubmissions(data);
        setFilteredSubmissions(data); // Initially show all submissions
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    const fetchBossStatistics = async () => {
      try {
        const response = await fetch('http://164.92.101.175:3001/admin-boss-statistics'); // Fetch aggregated statistics
        const data = await response.json();
        setBossStatistics(data); // Set the statistics for display
      } catch (error) {
        console.error('Error fetching boss statistics:', error);
      }
    };

    // Fetch admin status and submissions
    const checkAdminStatus = async () => {
      try {
        if (!user?.id) {
          console.error('No user ID found, access denied!');
          setIsAdmin(false);
          return;
        }

        const response = await fetch('http://164.92.101.175:3001/check-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }), // Send user ID
        });

        const data = await response.json();
        console.log('Admin status response:', data); // Debugging the response

        setIsAdmin(data.isAdmin); // Set admin status

        // Fetch submissions if the user is an admin
        if (data.isAdmin) {
          fetchSubmissions();
          fetchBossStatistics(); // Fetch the aggregated boss statistics
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    if (user) {
      checkAdminStatus();
    }
  }, [user]); // Only run when the user context changes

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter submissions based on search query
    const filtered = submissions.filter(submission =>
      submission.username.toLowerCase().includes(query)
    );

    setFilteredSubmissions(filtered); // Update filtered submissions
  };

  

  return (
    <Layout>
      {isAdmin ? (
        <div className="bg-gray-900 text-white p-6 ">
          <h1 className="text-center text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Username"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 rounded bg-gray-800 text-white w-full"
            />
          </div>

          {/* Submissions Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">User Submissions</h2>
            {filteredSubmissions.length > 0 ? (
              <table className="w-full text-left bg-gray-800 rounded-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2">Username</th>
                    <th className="p-2">Boss 1</th>
                    <th className="p-2">Gear 1</th>
                    <th className="p-2">Boss 2</th>
                    <th className="p-2">Gear 2</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="p-2">{submission.username}</td>
                      <td className="p-2">{submission.boss1}</td>
                      <td className="p-2">{submission.gear1}</td>
                      <td className="p-2">{submission.boss2}</td>
                      <td className="p-2">{submission.gear2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No submissions found.</p>
            )}
          </div>

          {/* Boss Selection Statistics */}
          <div>
            <h3 className="text-xl font-bold mb-4">Boss Selection Statistics</h3>
            <table className="w-full text-left bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-2">Boss</th>
                  <th className="p-2">Selection Count</th>
                </tr>
              </thead>
              <tbody>
                {bossStatistics.length > 0 ? (
                  bossStatistics.map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="p-2">{stat.boss}</td>
                      <td className="p-2">{stat.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-2 text-center">No statistics available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Schedule Boss Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Schedule Bosses</h2>

            {/* Select Date */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>

            {/* Select Time Slot */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Select Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="">Select a time slot</option>
                {['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Bosses */}
            {['boss1', 'boss2', 'boss3', 'boss4', 'boss5', 'boss6', 'boss7'].map((slot, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm mb-1">{`Boss ${index + 1}`}</label>
                <select
                  value={selectedBosses[slot]}
                  onChange={(e) => setSelectedBosses({ ...selectedBosses, [slot]: e.target.value })}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Select a boss</option>
                  {bossOptions.map((boss, idx) => (
                    <option key={idx} value={boss}>
                      {boss}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              onClick={handleScheduleBoss}
              className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600"
            >
              Schedule Bosses
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 p-6">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      )}
    </Layout>
  );
};

export default Admin;