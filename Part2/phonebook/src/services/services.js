import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

//dunno if we will need to updated in this part, so we are saving this here
//from: d) Altering data in server - Extracting Communication with the Backend into a Separate Module
// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject);
// };

export default {
  getAll: getAll,
  create: create,
  //   update: update,
};
