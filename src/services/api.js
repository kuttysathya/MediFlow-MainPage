import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",    // JSON Server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;