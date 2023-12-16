async function retrieveEvents(filters) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${process.env.API_BASE}/events?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export { retrieveEvents };
