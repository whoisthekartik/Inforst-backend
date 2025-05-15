// src/components/FactionCreate.js
import React, { useState } from 'react';
import { createFaction } from '../services/apiService';

const FactionCreate = () => {
  const [factionName, setFactionName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const factionData = { name: factionName, members: ['some-player-id'] };

    try {
      setStatus('Creating faction...');
      const response = await createFaction(factionData);
      setStatus(Faction ${response.name} created successfully!);
    } catch (error) {
      setStatus('Failed to create faction.');
    }
  };

  return (
    <div>
      <h2>Create a Faction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Faction Name"
          value={factionName}
          onChange={(e) => setFactionName(e.target.value)}
        />
        <button type="submit">Create Faction</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default FactionCreate;
