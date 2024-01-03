async function submitNewEvent(event) {

  try {
    const response = await fetch(`${process.env.API_BASE}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateEvent(event_id, event) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/<${event_id}>`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function retrieveEvent(event_id) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/<${event_id}>`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export { submitNewEvent, retrieveEvent };
