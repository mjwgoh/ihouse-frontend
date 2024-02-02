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

async function updateStaffing(event_id, email_id, step, add_del) {

  let response;

  try {
    response = await fetch(`${process.env.API_BASE}/events/${event_id}/${step}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_id, add_del }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    };

  } catch (error) {
    console.error(error);
    console.log(response);
  }

}

async function retrieveStaffing(event_id, step) {

  try {
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}/${step}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    };

    return await response.json();

  } catch (error) {
    console.error(error);
    console.log(response);
  }

}

async function updateEvent(event_id, event) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}`, {
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
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}`, {
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
    console.log(error);
  }
}

async function retrieveStaffingReq(event_id, role) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}/staffing/${role}`, {
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
    console.log(error);
  }
}

async function updateStaffingReq(event_id, role, email_id, add_del) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}/staffing/${role}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_id, add_del }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function createStaffingReq(event_id, role, req) {
  try {
    const response = await fetch(`${process.env.API_BASE}/events/${event_id}/staffing/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export { submitNewEvent, retrieveEvent, updateStaffing, retrieveStaffing, retrieveStaffingReq, updateStaffingReq, createStaffingReq};
