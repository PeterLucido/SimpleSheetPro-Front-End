

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/dives`;


async function getDives() {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (response.ok) {
      const diveData = await response.json();
      return diveData;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving dive data:', error);
    throw error;
  }
}

export { getDives };
