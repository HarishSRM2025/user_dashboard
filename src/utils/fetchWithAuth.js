export const fetchWithAuth = async (url, options = {}) => {
  const userDataStr = localStorage.getItem("hrm_user_data");
  let token = "";
  
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      // Fallback chain attempting to find token due to deeply nested Gateway structures
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

  const response = await fetch(url, { ...options, headers });

  // Gateway returns 401 or 403 on expired/missing tokens
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("hrm_user_data");
    if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
    }
    return Promise.reject(new Error("Session expired. Please log in again."));
  }

  return response;
};
