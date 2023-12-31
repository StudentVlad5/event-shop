import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "helpers/constants";

async function fetchData(pathParams) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}${pathParams}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
  return await axiosInstance.get();
}

async function deleteData(pathParams) {
  const formData = new FormData();
  return axios.delete(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function createFormRegistration(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== USERS ==== //

async function createUserData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("name", body.name);
  formData.append("surname", body.surname);
  formData.append("email", body.email);
  formData.append("password", body.password);
  formData.append("phone", body.phone);
  formData.append("birthday", body.birthday);
  formData.append("company", body.company);
  formData.append("position", body.position);
  body.events.forEach((value) => {
    formData.append("events[]", value);
  });
  body.packages.forEach((value) => {
    formData.append("packages[]", JSON.stringify(value));
  });
  formData.append("status", body.status);
  formData.append("role", body.role);

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function editUserData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("name", body.name);
  formData.append("surname", body.surname);
  formData.append("email", body.email);
  formData.append("phone", body.phone);
  formData.append("birthday", body.birthday);
  formData.append("company", body.company);
  formData.append("position", body.position);
  body.events.forEach((value) => {
    formData.append("events[]", value);
  });
  body.packages.forEach((value, i) => {
    formData.append("packages[]", JSON.stringify(value));
    // formData.append(`packages[${i}].name`, value.name);
    // formData.append(`packages[${i}].termActive.from`, value.termActive.from);
    // formData.append(`packages[${i}].termActive.to`, value.termActive.to);
    // // Object.entries(value).forEach(([key, value]) => {
    // //   formData.append(`packages[${i}].${key}`, value);
    // // });
  });
  formData.append("status", body.status);
  formData.append("role", body.role);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function updateUserData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("name", body.name);
  formData.append("surname", body.surname);
  formData.append("email", body.email);
  formData.append("phone", body.phone);
  formData.append("birthday", body.birthday);
  formData.append("company", body.company);
  formData.append("position", body.position);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function changePassword(pathParams, body) {
  const formData = new FormData();
  formData.append("password", body);
  return axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== CATEGORIES ==== //

async function updateCategoryData(pathParams, body) {
  return await axios.patch(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function createCategoryData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function deleteCategoryData(pathParams, body) {
  return await axios.delete(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== SPECIALISTS ==== //

async function updateSpecialistData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function createSpecialistData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function deleteSpecialistData(pathParams, body) {
  return await axios.delete(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== EVENTS ==== //

async function updateEventData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function createEventData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function deleteEventData(pathParams, body) {
  return await axios.delete(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}


// ==== ACTIVATE EVENTS ==== //

async function updateActiveEventData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function createActiveEventData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function deleteActiveEventData(pathParams, body) {
  return await axios.delete(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== ORDERS ==== //

async function updateOrderData(pathParams, body) {
  return await axios.post(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function deleteOrderData(pathParams, body) {
  return await axios.delete(`${BASE_URL}${pathParams}`, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// IMAGES

async function createImg(pathParams, body, file) {
  const formData = new FormData();
  formData.append("name", body.name);
  file && formData.set("avatar", file);
  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

fetchData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

deleteData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

updateUserData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};

editUserData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};

createUserData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};

deleteCategoryData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

updateCategoryData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createCategoryData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createFormRegistration.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

updateSpecialistData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createSpecialistData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

deleteSpecialistData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

updateEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

deleteEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

updateActiveEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createActiveEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

deleteActiveEventData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};
updateOrderData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

deleteOrderData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createImg.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};
export {
  fetchData,
  createFormRegistration,
  updateUserData,
  createUserData,
  editUserData,
  deleteData,
  changePassword,
  updateCategoryData,
  createCategoryData,
  deleteCategoryData,
  updateSpecialistData,
  createSpecialistData,
  deleteSpecialistData,
  updateEventData,
  createEventData,
  deleteEventData,
  updateActiveEventData,
  deleteActiveEventData,
  createActiveEventData,
  updateOrderData,
  deleteOrderData,
  createImg,
};
