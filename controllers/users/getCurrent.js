const getCurrent = async (req, res) => {
  const { email, fullName, role, id } = req.user;

  res.json({
    id,
    email,
    fullName,
    role,
  });
};

module.exports = getCurrent;
