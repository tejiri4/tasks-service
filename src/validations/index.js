export default schema => (req, res, next)=> {
  const { error, value } = schema.validate({ ...req.body, ...req.query, ...req.params });

  // checks if error exist in request object
  if (error) {
    return res.status(400).json({
      message: error.details.map((e) => e.message.replace(/['"]/g, ''))[0]
    })
  }

  req.filtered = value;

  return next();
};
