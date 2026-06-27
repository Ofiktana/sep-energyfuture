export const ENERGY_SOURCES = [
  { id: 'solar', name: 'Solar', emoji: '☀️', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Solar_panel.svg/200px-Solar_panel.svg.png' },
  { id: 'wind', name: 'Wind', emoji: '💨', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Wind_turbine_icon.svg/200px-Wind_turbine_icon.svg.png' },
  { id: 'tidal', name: 'Tidal', emoji: '🌊', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Wave_energy_icon.svg/200px-Wave_energy_icon.svg.png' },
  { id: 'geothermal', name: 'Geothermal', emoji: '🌋', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Geothermal_energy_icon.svg/200px-Geothermal_energy_icon.svg.png' },
  { id: 'natural-gas', name: 'Natural Gas', emoji: '🔥', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Natural_gas_icon.svg/200px-Natural_gas_icon.svg.png' },
  { id: 'bioenergy', name: 'Bioenergy', emoji: '🌱', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Biomass_icon.svg/200px-Biomass_icon.svg.png' },
  { id: 'seplat', name: 'Seplat', emoji: '⚡', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Seplat_Energy_Logo.svg/200px-Seplat_Energy_Logo.svg.png' },
  { id: 'hydro', name: 'Hydro', emoji: '💧', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hydroelectric_icon.svg/200px-Hydroelectric_icon.svg.png' },
];

export const DEFAULT_USERS = [
  { id: 'u1', fullName: 'Admin User', affiliation: 'Seplat', role: 'Administrator', password: 'admin123', isAdmin: true },
  { id: 'u2', fullName: 'Dr. Sarah Chen', affiliation: 'Clean Energy Institute', role: 'Research Director', password: 'password', isAdmin: false },
  { id: 'u3', fullName: 'Prof. James Martinez', affiliation: 'GreenTech University', role: 'Professor', password: 'password', isAdmin: false },
];

export const DEFAULT_SCORES = [
  { id: 's1', userId: 'u2', fullName: 'Dr. Sarah Chen', affiliation: 'Clean Energy Institute', role: 'Research Director', score: 9200, moves: 8, time: 35, season: 'Season 1' },
  { id: 's2', userId: 'u3', fullName: 'Prof. James Martinez', affiliation: 'GreenTech University', role: 'Professor', score: 8500, moves: 12, time: 42, season: 'Season 1' },
];
