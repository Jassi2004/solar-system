// src/constants/planetConstants.js

export const PLANET_CONFIG = {
  mercury: {
    speed: 1.0, // Orbit speed
    radius: 10, // Orbit radius
    centerX: -45, // Orbit center X position
    centerZ: 0, // Orbit center Z position
    scale: [0.009, 0.009, 0.009], // Scale of Mercury
  },
  venus: {
    speed: 0.8,
    radius: 15,
    centerX: -55,
    centerZ: 0,
    scale: [1.2, 1.2, 1.2],
  },
  earth: {
    speed: 0.7,
    radius: 20,
    centerX: -65,
    centerZ: 0,
    scale: [1, 1, 1],
  },
  mars: {
    speed: 0.6,
    radius: 25,
    centerX: -75,
    centerZ: 0,
    scale: [1.2, 1.2, 1.2],
  },
  jupiter: {
    speed: 0.4,
    radius: 35,
    centerX: -90,
    centerZ: 0,
    scale: [0.03, 0.03, 0.03],
  },
  saturn: {
    speed: 0.3,
    radius: 45,
    centerX: -110,
    centerZ: 0,
    scale: [3, 3, 3],
  },
  neptune: {
    speed: 0.2,
    radius: 60,
    centerX: -150,
    centerZ: 0,
    scale: [0.25, 0.25, 0.25],
  },
};
