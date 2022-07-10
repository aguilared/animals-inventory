import axios from "axios";
// const ENDPOINT = "http://localhost:3000/api/bitacora/";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/";

export default async function getBitacora(bitacoraId) {
  try {
    const resp = await axios.get(`${ENDPOINT}${bitacoraId}`);
    const data = resp.data;
    //console.log("DATAGET Bitacora", data[0]);
    console.log("GET Bitacora", resp);
    return data;
  } catch (error) {
    return error;
  }
}
