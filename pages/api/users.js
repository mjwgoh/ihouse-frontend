async function validateUsers(token) {
  try {
    const response = await fetch(`${process.env.API_BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();

    console.log(result)

    return Boolean(result.isValid);
  } catch (error) {
    console.error(error);
  }
}

export { validateUsers };
