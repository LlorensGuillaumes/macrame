const BASE_URL = "http://localhost:5000";

const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        headers: {},
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error GET", error);
      throw error;
    }
  },
  getSesion: async (endpoint) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        credentials: "include",
        headers: {},
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error GET", error);
      throw error;
    }
  },
  login: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  },
  
  logout: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  },
  post: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  },

  put: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      throw error;
    }
  },

  delete: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
      throw error;
    }
  },
  postFormData: async (endpoint, formData) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición POST con FormData:", error);
      throw error;
    }
  },
};
export default api;
