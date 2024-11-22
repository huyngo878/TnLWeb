import React from 'react';
import Layout from './Layout'; // Import Layout for consistent navbar and footer

const Info = () => {
  return (
    <Layout>
      <div className="p-6 bg-gray-5 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">About This Website</h1>
        <p className="mb-4">
          Welcome to the <strong>Thorn Guild Manager</strong>, a custom-built platform designed exclusively for the members of Thorn. This website serves as a centralized hub to streamline the management of Guild Boss loot and ensure fairness across all members.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
        <ul className="list-disc ml-6 mb-6">
          <li className="mb-2">
            <strong>Guild Boss Scheduling:</strong> Easily view and plan the schedule for upcoming Guild Boss encounters based on the needs of guild members.
          </li>
          <li className="mb-2">
            <strong>Loot Management:</strong> Submit your gear preferences, track rotations, and ensure everyone has a fair chance at obtaining their <em>Best-in-Slot (BiS)</em> items.
          </li>
          <li className="mb-2">
            <strong>Personalized Stats:</strong> View your profile, including your gear score, weapon preferences, and other relevant guild information.
          </li>
          <li className="mb-2">
            <strong>Activity Tracking:</strong> Stay informed about important guild events, wars, and rules to ensure active participation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Why Was This Created?</h2>
        <p className="mb-4">
          The <strong>Thorn Guild Manager</strong> was developed to address the complexities of managing Guild Boss rotations and loot distribution in a large and active guild. By collecting and organizing member preferences, the website ensures:
        </p>
        <ul className="list-disc ml-6 mb-6">
          <li className="mb-2">Fair distribution of loot.</li>
          <li className="mb-2">Streamlined planning for weekly rotations.</li>
          <li className="mb-2">A more cohesive and organized experience for all guild members.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How To Use This Platform:</h2>
        <ul className="list-decimal ml-6">
          <li className="mb-2">Log in using your Discord credentials to access your profile and guild information.</li>
          <li className="mb-2">Submit your <em>BiS</em> and gear preferences in the <strong>Form</strong> section.</li>
          <li className="mb-2">Stay updated with the <strong>Schedule</strong> for weekly boss rotations.</li>
          <li className="mb-2">Check the <strong>Rules</strong> section to stay aligned with the guild's expectations.</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Info;
