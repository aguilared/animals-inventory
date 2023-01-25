import axios from "axios";
// const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "animals/";

export default async function getAnimalId(bitaeventId) {
  console.log("ID", bitaeventId);
  console.log("ENDPOINT", ENDPOINT);
  try {
    const resp = await axios.get(`${ENDPOINT}${bitaeventId}`);
    console.log("RESP", resp);
    console.log("RESDATA", resp.data);
    return resp.data;
  } catch (error) {
    console.log("ERROR BITACORA", error);
    return error;
  }
}
