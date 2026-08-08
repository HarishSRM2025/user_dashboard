export const fetchWithAuth = async (url, options = {}) => {
  const userDataStr = localStorage.getItem("hrm_user_data");
  let token = "";
  
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      // Fallback chain attempting to find token
      token = userData?.data?.data?.token || userData?.data?.token || userData?.token || "";
    } catch (e) {
      console.error("Error parsing user data for auth logic:", e);
    }
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });
    return response;
  } catch (err) {
    console.warn("Fetch with auth warning:", err);
    throw err;
  }
};
