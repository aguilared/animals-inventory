import axios from "axios";
// const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/events/";

export default async function getBitacoraEvents(bitacoraId) {
  try {
    const resp = await axios.get(`${ENDPOINT}${bitacoraId}`);
    return resp.data;
  } catch (error) {
    console.log("ERROR BITACORA", error);
    return error;
  }
}
