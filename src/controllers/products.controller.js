const checkName = (body) => {
  if (!Object.keys(body).includes('name')) {
    return { type: false, message: '"name" is required', error: 400 };
  }
  if (body.name.length < 5) {
    return { type: false, message: '"name" length must be at least 5 characters long', error: 422 };
  }
  return { type: true };
};

module.exports = { checkName };