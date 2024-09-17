import axios from "axios";
import { API_V1_URL } from "../www/api";

export async function getFoobar() {
  const res = await axios.get(`${API_V1_URL}/foobar`);
  return res.data;
}

export async function getFoobarError() {
  const res = await axios.get(`${API_V1_URL}/foobar/error`);
  return res.data;
}
