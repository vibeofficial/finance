const joi = require('joi');


exports.validateRegister = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).trim().required().pattern(/^[A-Za-z]+$/).messages({
      'string.empty': 'Firstname is required',
      'string.min': 'Firstname must be at least 3 characters long',
      'string.pattern.base': 'Invalid characters for firstname'
    }),
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.changePasswordValidation = (req, res, next) => {
  const schema = joi.object({
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
    newPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
    confirmPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.forgetPasswordValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.resetPasswordValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    newPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/).required().messages({
      'string.empty': 'New password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
    confirmPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().optional().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.updateProfileValidation = (req, res, next) => {
  const schema = joi.object({
    phoneNumber: joi.string().trim().pattern(/^\d{11}$/).optional().messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be 11 digits',
    }),
    profilePicture: joi.optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};