import * as Yup from "yup";

// ----- USERS -----//
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Require field"),
  email: Yup.string().email("Invalid email").required("Require field"),
  phone: Yup.number().nullable(true).required("Require field"),
});

const schemasLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Require"),
  password: Yup.string()
    .min(4, "Password too short (min 4)")
    .max(32, "Password too long (max 32)")
    .matches(/^\s*\S+\s*$/, "Password must be without spaces")
    .required("Require"),
});

const changePasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Require field"),
});

const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("Require field"),
  surname: Yup.string(),
  email: Yup.string().email("Invalid email").required("Require field"),
  phone: Yup.number(),
  // .nullable(true)
  // .required("Require field")
  // .matches(phoneRegExp, "Phone number is not valid"),
  avatar: Yup.string(),
  favorites: Yup.array(),
  events: Yup.array(),
  role: Yup.string(),
});

const createUserSchema = Yup.object().shape({
  name: Yup.string().required("Require field"),
  surname: Yup.string(),
  email: Yup.string().email("Invalid email").required("Require field"),
  password: Yup.string(),
  // .min(7, "Password too short (min 7)")
  // .max(32, "Password too long (max 32)")
  // .matches(/^\s*\S+\s*$/, "Password must be without spaces")
  // .required("Require field"),
  phone: Yup.number(),
  // .nullable(true)
  // .required("Require field")
  // .matches(phoneRegExp, "Phone number is not valid"),
  avatar: Yup.string(),
  favorites: Yup.array(),
  events: Yup.array(),
  role: Yup.string(),
});

const updatePasswordSchema = Yup.object().shape({
  password: Yup.string(),
  // .min(7, "Password too short (min 7)")
  // .max(32, "Password too long (max 32)")
  // .matches(/^\s*\S+\s*$/, "Password must be without spaces")
  // .required("Require field"),
  confirmPassword: Yup.string(),
  // .oneOf([Yup.ref("password")], "Your passwords do not match")
  // .required("Require field"),
});

// ----- EVENTS -----//
// const schemasEvents = Yup.object().shape({
//   article_event: Yup.string(),
//   date: Yup.date().required("Require field"),
//   time: Yup.string().required("Require field"),
//   image: Yup.string().required("Require field"),
//   duration: Yup.string().required("Require field"),
//   price: Yup.string().required("Require field"),
//   seats: Yup.number().nullable(true).required("Require field"),
//   booking: Yup.number().nullable(true),
//   vacancies: Yup.number().nullable(true),

//   nameFr: Yup.string().required("Require field"),
//   locationFr: Yup.string().required("Require field"),
//   adressFr: Yup.string().required("Require field"),
//   descriptionFr: Yup.string().required("Require field"),
//   categoryFr: Yup.string().required("Require field"),

//   nameUa: Yup.string().required("Require field"),
//   locationUa: Yup.string().required("Require field"),
//   adressUa: Yup.string().required("Require field"),
//   descriptionUa: Yup.string().required("Require field"),
//   categoryUa: Yup.string().required("Require field"),

//   nameRu: Yup.string().required("Require field"),
//   locationRu: Yup.string().required("Require field"),
//   adressRu: Yup.string().required("Require field"),
//   descriptionRu: Yup.string().required("Require field"),
//   categoryRu: Yup.string().required("Require field"),
// });

// ----- Team -----//
// const schemasTeam = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Require field"),
//   phone: Yup.number()
//     .nullable(true)
//     .required("Require field")
//     .matches(phoneRegExp, "Phone number is not valid"),
//   rating: Yup.number().nullable(true),
//   image: Yup.string().required("Require field"),
//   status: Yup.string().required("Require field"),

//   nameFr: Yup.string().required("Require field"),
//   descriptionFr: Yup.string().required("Require field"),

//   nameUa: Yup.string().required("Require field"),
//   descriptionUa: Yup.string().required("Require field"),

//   nameRu: Yup.string().required("Require field"),
//   descriptionRu: Yup.string().required("Require field"),
// });

const schemas = {
  registerSchema,
  schemasLogin,
  changePasswordSchema,
  updateUserSchema,
  createUserSchema,
  updatePasswordSchema,
  // schemasEvents,
  // schemasTeam,
};

export default schemas;
