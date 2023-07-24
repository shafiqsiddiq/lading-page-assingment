const users = [
  {
    id: 1,
    role: "admin",
    email: "admin@leadingly.com",
  },
  {
    id: 2,
    role: "corporate",
    email: "corporate@leadingly.com",
  },
  {
    id: 3,
    role: "individual",
    email: "individual@leadingly.com",
  },
];

const USER_ROLES = [
  {
    id: 1,
    name: "corporate",
  },
  {
    id: 2,
    name: "admin",
  },
  {
    id: 3,
    name: "individual",
  },
];

const authenticateUser = (user) => {
  const findUser = users.find((item) => item.email === user.email);
  if (findUser) {
    return findUser;
  }
  return false;
};

export const getRoleName = (roleId) =>
  USER_ROLES.find((item) => item.id === roleId).name;

export default authenticateUser;
