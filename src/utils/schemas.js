import * as Yup from 'yup';

// ----- USERS -----//
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Name must includes only Latin alphabet',
    )
    .required('Require field'),
  surname: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Name must includes only Latin alphabet',
    )
    .required('Require field'),
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, 'Email must be without spaces')
    .matches(/\S{7,}/, 'Email too short (min 7 symbols)')
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      'Invalid email',
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      'Dashes should only be inside email',
    )
    .required('Require field'),
  phone: Yup.number()
    .nullable(true)
    .required('Require field')
    .min(99999)
    .max(999999999999),
  company: Yup.string()
    .matches(/\S{2,}/, 'Company too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Company must includes only Latin alphabet',
    )
    .required('Require field'),
  position: Yup.string()
    .matches(/\S{2,}/, 'Position too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Position must includes only Latin alphabet',
    )
    .required('Require field'),
  packages: Yup.string(),
});

const schemasLogin = Yup.object().shape({
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, 'Email must be without spaces')
    .matches(/\S{7,}/, 'Email too short (min 7 symbols)')
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      'Invalid email',
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      'Dashes should only be inside email',
    )
    .required('Require'),
  password: Yup.string()
    .min(4, 'Password too short (min 4)')
    .max(32, 'Password too long (max 32)')
    .matches(/^\s*\S+\s*$/, 'Password must be without spaces')
    .required('Require'),
});

const changePasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, 'Email must be without spaces')
    .matches(/\S{7,}/, 'Email too short (min 7 symbols)')
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      'Invalid email',
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      'Dashes should only be inside email',
    )
    .required('Require field'),
});

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Name must includes only Latin alphabet',
    )
    .required('Require field'),
  surname: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Surname must includes only Latin alphabet',
    ),
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, 'Email must be without spaces')
    .matches(/\S{7,}/, 'Email too short (min 7 symbols)')
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      'Invalid email',
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      'Dashes should only be inside email',
    )
    .required('Require field'),
  phone: Yup.number()
    .nullable(true)
    .required('Require field')
    .min(99999)
    .max(999999999999),
  birthday: Yup.date(),
  company: Yup.string()
    .matches(/\S{2,}/, 'Company too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Company must includes only Latin alphabet',
    )
    .required('Require field'),
  position: Yup.string()
    .matches(/\S{2,}/, 'Position too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Position must includes only Latin alphabet',
    )
    .required('Require field'),
  avatar: Yup.string(),
  packages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      termActive: Yup.object().shape({
        from: Yup.date(),
        to: Yup.date(),
      }),
    }),
  ),
  events: Yup.array(),
  role: Yup.string(),
  status: Yup.string(),
});

const createUserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Name must includes only Latin alphabet',
    )
    .required('Require field'),
  surname: Yup.string()
    .matches(/\S{2,}/, 'Name too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Surname must includes only Latin alphabet',
    ),
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, 'Email must be without spaces')
    .matches(/\S{7,}/, 'Email too short (min 7 symbols)')
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      'Invalid email',
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      'Dashes should only be inside email',
    )
    .required('Require field'),
  password: Yup.string()
    .min(7, 'Password too short (min 7)')
    .max(32, 'Password too long (max 32)')
    .matches(/^\s*\S+\s*$/, 'Password must be without spaces')
    .required('Require field'),
  phone: Yup.number()
    .nullable(true)
    .required('Require field')
    .min(99999)
    .max(999999999999),
  birthday: Yup.date(),
  company: Yup.string()
    .matches(/\S{2,}/, 'Company too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Company must includes only Latin alphabet',
    )
    .required('Require field'),
  position: Yup.string()
    .matches(/\S{2,}/, 'Position too short (min 2)')
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      'Position must includes only Latin alphabet',
    )
    .required('Require field'),
  avatar: Yup.string(),
  packages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      termActive: Yup.object().shape({
        from: Yup.date(),
        to: Yup.date(),
      }),
    }),
  ),
  events: Yup.array(),
  role: Yup.string(),
  status: Yup.string(),
});

const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, 'Password too short (min 7)')
    .max(32, 'Password too long (max 32)')
    .matches(/^\s*\S+\s*$/, 'Password must be without spaces')
    .required('Require field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Require field'),
});

// ----- EVENTS -----//
const schemasEvents = Yup.object().shape({
  date: Yup.date().required('Require field'),
  time: Yup.string().required('Require field'),
  image: Yup.string(),
 
  durationEn: Yup.string(),
  locationEn: Yup.string().required('Require field'),
  titleEn: Yup.string().required('Require field'),
  descriptionEn: Yup.string().required('Require field'),
  planEn: Yup.array(),
  speakersEn: Yup.array().required('Require field'),
  moderatorEn: Yup.string(),
  packagesEn: Yup.array().required('Require field'),
 
  durationUa: Yup.string(),
  locationUa: Yup.string().required('Require field'),
  titleUa: Yup.string().required('Require field'),
  descriptionUa: Yup.string().required('Require field'),
  planUa: Yup.array(),
  speakersUa: Yup.array().required('Require field'),
  moderatorUa: Yup.string(),
  packagesUa: Yup.array().required('Require field'),

  durationDe: Yup.string(),
  locationDe: Yup.string().required('Require field'),
  titleDe: Yup.string().required('Require field'),
  descriptionDe: Yup.string().required('Require field'),
  planDe: Yup.array(),
  speakersDe: Yup.array().required('Require field'),
  moderatorDe: Yup.string(),
  packagesDe: Yup.array().required('Require field'),
});

// ----- PACKAGES -----//
const schemasPackage = Yup.object().shape({
  titleEn: Yup.string().required('Require field'),
  priceEn: Yup.string().required('Require field'),
  contentEn: Yup.string().required('Require field'),
  featuresEn: Yup.array().required('Require field'),
  titleUa: Yup.string().required('Require field'),
  priceUa: Yup.string().required('Require field'),
  contentUa: Yup.string().required('Require field'),
  featuresUa: Yup.array().required('Require field'),
  titleDe: Yup.string().required('Require field'),
  priceDe: Yup.string().required('Require field'),
  contentDe: Yup.string().required('Require field'),
  featuresDe: Yup.array().required('Require field'),
});

const schemas = {
  registerSchema,
  schemasLogin,
  changePasswordSchema,
  updateUserSchema,
  createUserSchema,
  updatePasswordSchema,
  schemasEvents,
  schemasPackage,
};

export default schemas;
