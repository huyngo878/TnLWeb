import React from 'react';
import Layout from './Layout';

const Rules = () => {
  return (
    <Layout>
      <div className="p-6 bg-gray-5 text-white">
        <div className="bg-gray-6 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-sage mb-6 text-center">Guild Boss Drop Rules</h1>
          <p className="text-timberwolf leading-relaxed mb-4">
            We’re introducing a new approach to Guild Boss drops, focused on fairness and ensuring everyone has a shot at their best-in-slot (BiS) gear by rolling. Here’s what to expect:
          </p>
          <ul className="list-disc list-inside text-platinum mb-4 space-y-4">
            <li>
              <strong>Boss Scheduling Based on Gear Needs:</strong> To ensure the gear you need drops, we’re rotating bosses each week based on guild-wide gear demand. We’ve created a Google form to let us know your best-in-slot (BiS) and second-best-in-slot items from the Guild Bosses.
            </li>
            <li>
              <strong>Rotation Schedule:</strong> Every week, we’ll have 7 bosses, with a complete rotation over a month. Bosses will be prioritized based on how many guild members need items from them.
            </li>
            <li>
              <strong>Guaranteed BiS Runs:</strong> Even if only one person requests a particular BiS item, we’ll still include that boss in the rotation to give everyone a fair chance to obtain their gear.
            </li>
            <li>
              <strong>Non-BiS Drops:</strong> Free Roll
            </li>
            <li>
              <strong>War:</strong> You will <span className="text-red-500 font-bold">NOT</span> be able to roll for boss drops if you don't attend wars! If you have a LoA (Leave of Absence), you will still be able to roll.
            </li>
          </ul>
          <p className="text-timberwolf leading-relaxed">
            Please take a moment to fill out the form so we can start organizing rotations that best meet the guild's needs.
          </p>
          <p className="text-red-500 font-bold mt-4">
            ‼️ If you do not fill this out, you will NOT be rolling for it.‼️
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;
