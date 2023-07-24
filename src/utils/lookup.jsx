const USER_ROLE = [
  {
    lookupId: 1,
    text: "Super Admin",
    value: "SuperAdmin",
    type: "Role",
  },
  {
    lookupId: 2,
    text: "Patient",
    value: "Patient",
    order: 2,
    type: "Role",
  },
  {
    lookupId: 3,
    type: "Role",
    text: "Physician",
    value: "Physician",
  },
];
const GENDER = [
  {
    lookupId: 101,

    text: "Male",
    value: "Male",
    order: 1,
  },
  {
    lookupId: 102,

    text: "Female",
    value: "Female",
    order: 2,
  },
  {
    lookupId: 103,
    text: "Other",
    value: "Other",
    order: 3,
  },
];


const LOOKUP = {
  USER_ROLE,
  GENDER,
};

export default LOOKUP;
