import React, { useState } from 'react';
import Layout from './Layout';

const Form = () => {
  const [boss1, setBoss1] = useState('');
  const [gear1, setGear1] = useState('');
  const [boss2, setBoss2] = useState('');
  const [gear2, setGear2] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Define the gear sets for each boss
  const gearOptions = {
    Morokai: [
      'Resonance Blade',
      'Golem Shattering Sword',
      'Golem Impaler Longbow',
      'First Blood Longbow',
      "Morokai's Greatblade of Corruption",
      'Elusive Hexweaver Gloves',
      'Arcane Shadow Gloves',
      'Decorated Champion Greaves',
      'Abyssal Grace Pendant',
    ],
    'Excavator-9': [
      'Dead Reckoning Greatsword',
      'Sword of Undead Vanquishing',
      'Longbow of Undead Skewering',
      'Shadewalker Daggers',
      'Excavator\'s Mysterious Scepter',
      'Elusive Hexweaver Hat',
      'Elusive Hexweaver Pants',
      'Heroic Breeches of the Resistance',
      'Embossed Granite Band',
    ],
    Chernobog: [
      'Viperstrike Arbalests',
      'Longbow of the Resistance',
      'Wand of Skyward Blessing',
      'Daggers of the Resistance',
      "Chernobog's Blade of Beheading",
      'Helm of the Field General',
      'Bile Drenched Veil',
      'Soul Mirror Hand Guards',
      'Arcane Shadow Shoes',
    ],
    Talus: [
      'Dead Reckoning Greatsword',
      'Blade of the Resistance',
      'First Blood Longbow',
      'Scepter of the Resistance',
      'Talus\'s Crystalline Staff',
      'Duskblood Mask',
      'Phantom Wolf Mask',
      'Blessed Templar Plate Mail',
      'Resolute Crusader Gauntlets',
      'Forged Golden Bangle',
    ],
    Malakar: [
      'Broadsword of the Resistance',
      'Resonance Blade',
      'Blade of the Resistance',
      'First Blood Longbow',
      'Malakar\'s Energizing Crossbows',
      'Shock Commander Visor',
      'Shock Commander Visor',
      'Ebon Roar Gauntlets',
      'Ebon Roar Gauntlets',
      'Duskblood Boots',
      'Decorated Champion Boots',
      'Gilded Infernal Wristlet',
      'Gilded Infernal Wristlet',
    ],
    Cornelius: [
      'Broadsword of the Resistance',
      'Resonance Blade',
      'Crossbows of the Resistance',
      'Malevolent Staff',
      "Cornelius's Animated Edge",
      'Divine Justiciar Attire',
      'Decorated Champion Gauntlets',
    ],
    Ahzreil: [
      'Resonance Blade',
      'Staff of Undead Banishment',
      'Malevolent Staff',
      'Daggers of Undead Severing',
      'Ahzreil\'s Siphoning Sword',
      'Alacritous Invoker Hood',
      'Blessed Templar Cloak',
      'Blessed Templar Cloak',
      'Divine Justiciar Pants',
      'Divine Justiciar Pants',
      'Swirling Essence Pants',
      'Swirling Essence Pants',
      'Imperial Ring',
    ],
    Minezerok: [
      'Crossbows of the Resistance',
      'Longbow of the Resistance',
      'Wand of Skyward Blessing',
      'Shadewalker Daggers',
      'Minezerok\'s Daggers of Crippling',
      'Divine Justiciar Gloves',
      'Resolute Crusader Greaves',
      'Resolute Crusader Sabatons',
      'Phantom Wolf Boots',
      'Blessed Templar Choker',
    ],
    Kowazan: [
      'Dead Reckoning Greatsword',
      'Crossbows of Undead Piercing',
      'First Blood Longbow',
      'Golem Sundering Wand',
      'Kowazan\'s Twilight Daggers',
      'Arcane Shadow Hat',
      'Duskblood Trousers',
      'Shock Commander Sabatons',
      'Guardian Torque',
      'Collar of Decimation',
    ],
    Adentus: [
      'Viperstrike Arbalests',
      'Malevolent Staff',
      'Scepter of the Resistance',
      'Daggers of the Resistance',
      'Adentus\'s Gargantuan Greatsword',
      'Soul Mirror Turban',
      'Resolute Crusader Helmet',
      'Blessed Templar Helmet',
      'Shadow Harvester Mask',
      'Girdle of Spectral Skulls',
    ],
    Junobote: [
      'Sword of Undead Vanquishing',
      'Viperstrike Arbalests',
      'Longbow of Undead Skewering',
      'Wand of Skyward Blessing',
      'Junobote\'s Juggernaut Warblade',
      'Forsaken Embrace',
      'Arcane Shadow Robes',
      'Shadow Harvester Trousers',
      'Cold Iron Band',
      'Gladiator\'s Girdle',
    ],
    'Grand Aeolon': [
      'Dead Reckoning Greatsword',
      'Golem Shattering Sword',
      'Golem Impaler Longbow',
      'Shadewalker Daggers',
      'Aelon\'s Rejuvenating Longbow',
      'Ascended Guardian Raiment',
      'Arcane Shadow Pants',
      'Alacritous Invoker Shoes',
      'Ornate Choker',
      'Wrapped Coin Necklace',
    ],
    Aridus: [
      'Viperstrike Arbalests',
      'Golem Destruction Staff',
      'Malevolent Staff',
      'Golem Chiseling Daggers',
      'Aridus\'s Gnarled Voidstaff',
      'Duskblood Gloves',
      'Gauntlets of the Field General',
      'Boots of the Executioner',
      'Ruby Bangle',
      'Belt of Bloodlust',
    ],
    Nirma: [
      'Golem Grinding Greatsword',
      'Golem Dismantler Crossbows',
      'Wand of Skyward Blessing',
      'Shadewalker Daggers',
      'Nirma\'s Sword of Echoes',
      'Alacritous Invoker Gloves',
      'Alacritous Invoker Pants',
      'Ascended Guardian Pants',
      'Divine Justiciar Shoes',
      'Clasp of the Overlord',
    ],
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!boss1 || !gear1 || !boss2 || !gear2) {
      setResponseMessage('Please fill out all fields.');
      return;
    }

    try {
      // Send data to backend
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).username
            : 'Guest',
          boss1,
          gear1,
          boss2,
          gear2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage('Form submitted successfully!');
        console.log('Form response:', data);
      } else {
        setResponseMessage(data.error || 'Failed to submit the form.');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  // Get the gear options for the selected boss
  const getGearOptions = (boss) => {
    return gearOptions[boss] || [];
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray3 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Select Your Bosses and Gear</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-white">Select Boss 1:</label>
            <select
              value={boss1}
              onChange={(e) => {
                setBoss1(e.target.value);
                setGear1(''); // Reset gear when boss is changed
              }}
              className="w-full p-2 rounded bg-gray2 text-gray6"
            >
              <option value="">Select a boss</option>
              {Object.keys(gearOptions).map((boss) => (
                <option key={boss} value={boss}>
                  {boss}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-white">Select Gear from Selected Boss:</label>
            <select
              value={gear1}
              onChange={(e) => setGear1(e.target.value)}
              className="w-full p-2 rounded bg-gray2 text-gray6"
            >
              <option value="">Select gear</option>
              {getGearOptions(boss1).map((gear) => (
                <option key={gear} value={gear}>
                  {gear}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-white">Select Boss 2:</label>
            <select
              value={boss2}
              onChange={(e) => {
                setBoss2(e.target.value);
                setGear2(''); // Reset gear when boss is changed
              }}
              className="w-full p-2 rounded bg-gray2 text-gray6"
            >
              <option value="">Select a boss</option>
              {Object.keys(gearOptions).map((boss) => (
                <option key={boss} value={boss}>
                  {boss}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-white">Select Gear from Selected Boss:</label>
            <select
              value={gear2}
              onChange={(e) => setGear2(e.target.value)}
              className="w-full p-2 rounded bg-gray2 text-gray6"
            >
              <option value="">Select gear</option>
              {getGearOptions(boss2).map((gear) => (
                <option key={gear} value={gear}>
                  {gear}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-gray5 text-white px-4 py-2 rounded-lg hover:bg-gray6">
            Submit
          </button>

          {/* Response message */}
          {responseMessage && (
            <p className="mt-4 text-center text-sm text-white">{responseMessage}</p>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Form;
