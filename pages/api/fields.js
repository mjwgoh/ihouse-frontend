async function retrieveFields(fields) {
  try {
    const response = await fetch(`${process.env.API_BASE}/fields?fields=${fields}`, {
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

async function submitFields(fields, values) {
  try {
    const response = await fetch(`${process.env.API_BASE}/fields?fields=${fields}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function editFields(fields, id, values) {

  try {
    const response = await fetch(`${process.env.API_BASE}/fields/${fields}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteFields(fields, id) {
  try {
    const response = await fetch(`${process.env.API_BASE}/fields/${fields}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function retrieveEventChecklist() {

  try {
    const response = await fetch(`${process.env.API_BASE}/events/checklist`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }

}

async function createEventChecklist(values) {

  try {
    const response = await fetch(`${process.env.API_BASE}/events/checklist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }

}

async function updateEventChecklist(id, values) {
  
    try {
      const response = await fetch(`${process.env.API_BASE}/events/checklist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  
  }

  async function deleteEventChecklist(id) {
    
      try {
        const response = await fetch(`${process.env.API_BASE}/events/checklist/${id}`, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    
    }

export { retrieveFields, submitFields, editFields, deleteFields, retrieveEventChecklist, createEventChecklist, updateEventChecklist, deleteEventChecklist };
