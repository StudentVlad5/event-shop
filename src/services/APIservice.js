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

// ==== EVENTS ==== //

async function updateEventsData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("image", file);
  formData.append("date", body.date);
  formData.append("time", body.time);

  formData.append("durationEn", body.durationEn);
  formData.append("locationEn", body.locationEn);
  formData.append("titleEn", body.titleEn);
  formData.append("descriptionEn", body.descriptionEn);
  body.planEn.forEach((value) => {
    formData.append("planEn[]", value);
  });
  body.speakersEn.forEach((value) => {
    formData.append("speakersEn[]", value);
  });
  formData.append("moderatorEn", body.moderatorEn);
  body.packagesEn.forEach((value) => {
    formData.append("packagesEn[]", value);
  });

  formData.append("durationUa", body.durationUa);
  formData.append("locationUa", body.locationUa);
  formData.append("titleUa", body.titleUa);
  formData.append("descriptionUa", body.descriptionUa);
  body.planUa.forEach((value) => {
    formData.append("planUa[]", value);
  });
  body.speakersUa.forEach((value) => {
    formData.append("speakersUa[]", value);
  });
  formData.append("moderatorUa", body.moderatorUa);
  body.packagesUa.forEach((value) => {
    formData.append("packagesUa[]", value);
  });
  formData.append("durationDe", body.durationDe);
  formData.append("locationDe", body.locationDe);
  formData.append("titleDe", body.titleDe);
  formData.append("descriptionDe", body.descriptionDe);
  body.planDe.forEach((value) => {
    formData.append("planDe[]", value);
  });
  body.speakersDe.forEach((value) => {
    formData.append("speakersDe[]", value);
  });
  formData.append("moderatorDe", body.moderatorDe);
  body.packagesDe.forEach((value) => {
    formData.append("packagesDe[]", value);
  });

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function createEventsData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("image", file);
  formData.append("date", body.date);
  formData.append("time", body.time);
  formData.append("durationEn", body.durationEn);
  formData.append("locationEn", body.locationEn);
  formData.append("titleEn", body.titleEn);
  formData.append("descriptionEn", body.descriptionEn);
  body.planEn.forEach((value) => {
    formData.append("planEn[]", value);
  });
  body.speakersEn.forEach((value) => {
    formData.append("speakersEn[]", value);
  });
  formData.append("moderatorEn", body.moderatorEn);
  body.packagesEn.forEach((value) => {
    formData.append("packagesEn[]", value);
  });
  formData.append("durationUa", body.durationUa);
  formData.append("locationUa", body.locationUa);
  formData.append("titleUa", body.titleUa);
  formData.append("descriptionUa", body.descriptionUa);
  body.planUa.forEach((value) => {
    formData.append("planUa[]", value);
  });
  body.speakersUa.forEach((value) => {
    formData.append("speakersUa[]", value);
  });
  formData.append("moderatorUa", body.moderatorUa);
  body.packagesUa.forEach((value) => {
    formData.append("packagesUa[]", value);
  });
  formData.append("durationDe", body.durationDe);
  formData.append("locationDe", body.locationDe);
  formData.append("titleDe", body.titleDe);
  formData.append("descriptionDe", body.descriptionDe);
  body.planDe.forEach((value) => {
    formData.append("planDe[]", value);
  });
  body.speakersDe.forEach((value) => {
    formData.append("speakersDe[]", value);
  });
  formData.append("moderatorDe", body.moderatorDe);
  body.packagesDe.forEach((value) => {
    formData.append("packagesDe[]", value);
  });

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

// ==== PACKAGES ==== //

async function createPackagesData(pathParams, body) {
  const formData = new FormData();
  formData.append("titleEn", body.titleEn);
  formData.append("priceEn", body.priceEn);
  formData.append("contentEn", body.contentEn);
  formData.append("featuresEn", body.featuresEn);
  formData.append("titleUa", body.titleUa);
  formData.append("priceUa", body.priceUa);
  formData.append("contentUa", body.contentUa);
  formData.append("featuresUa", body.featuresUa);
  formData.append("titleDe", body.titleDe);
  formData.append("priceDe", body.priceDe);
  formData.append("contentDe", body.contentDe);
  formData.append("featuresDe", body.featuresDe);

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function updatePackageData(pathParams, body) {
  // console.log(body);
  const formData = new FormData();
  formData.append("titleEn", body.titleEn);
  formData.append("priceEn", body.priceEn);
  formData.append("contentEn", body.contentEn);
  formData.append("featuresEn", body.featuresEn);
  formData.append("titleUa", body.titleUa);
  formData.append("priceUa", body.priceUa);
  formData.append("contentUa", body.contentUa);
  formData.append("featuresUa", body.featuresUa);
  formData.append("titleDe", body.titleDe);
  formData.append("priceDe", body.priceDe);
  formData.append("contentDe", body.contentDe);
  formData.append("featuresDe", body.featuresDe);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "application/json",
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

updateEventsData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

updatePackageData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createEventsData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createPackagesData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createFormRegistration.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

export {
  fetchData,
  createFormRegistration,
  updateUserData,
  createUserData,
  editUserData,
  createEventsData,
  updateEventsData,
  deleteData,
  changePassword,
  createPackagesData,
  updatePackageData,
};
