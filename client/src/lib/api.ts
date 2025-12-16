import axios from "axios";

export const api = axios.create({
  baseURL: "https://hyper-csv.onrender.com/",
});
