import axios from "axios";
// const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/event_id/";

export default async function getbitaEventId(bitaeventId) {
  console.log("ID", bitaeventId);
  try {
    const resp = await axios.get(`${ENDPOINT}${bitaeventId}`);
    return resp.data[0];
  } catch (error) {
    console.log("ERROR BITACORA", error);
    return error;
  }
}
