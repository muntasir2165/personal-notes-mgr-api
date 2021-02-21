const User = require('./../models/user');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(403)
      .json({ error: { message: 'Email already in use!' } });
  const newUser = new User({ firstName, lastName, email, password });
  await newUser.save();
  res.status(200).json({ message: 'success' });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(403)
      .json({ error: { message: 'Invalid email/password' } });
  const isValid = await user.isPasswordValid(password);
  if (!isValid)
    return res
      .status(403)
      .json({ error: { message: 'Invalid email/password' } });
  res.status(200).json({ message: 'success' });
};
