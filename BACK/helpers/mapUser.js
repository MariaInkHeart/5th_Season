module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    registeredAt: user.createdAt.toLocaleString("ru", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
  };
};
