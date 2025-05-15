const Joi = require('joi');

const validationMiddleware = {
  // Player Registration Validation (Middleware)
  validateRegistration: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      walletAddress: Joi.string()
        .pattern(/^0x[a-fA-F0-9]{40}$/)
        .required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ 
      error: error.details[0].message 
    });
    next();
  },

  // NFT Creation Validation (Middleware)
  validateNFTCreation: (req, res, next) => {
    const { error } = validationSchemas.validateNFTInput(req.body);
    if (error) return res.status(400).json({ 
      error: error.details[0].message 
    });
    next();
  },

  // Battle Request Validation (Middleware)
  validateBattleRequest: (req, res, next) => {
    const { error } = validationSchemas.validateBattleInput(req.body);
    if (error) return res.status(400).json({ 
      error: error.details[0].message 
    });
    next();
  }
};

const validationSchemas = {
  // NFT Input Schema (Reusable)
  validateNFTInput: (data) => {
    const schema = Joi.object({
      metadataURI: Joi.string().uri().required(),
      attributes: Joi.object({
        attack: Joi.number().min(1).max(100).required(),
        defense: Joi.number().min(1).max(100).required(),
        health: Joi.number().min(50).max(200).required()
      }).required()
    });
    return schema.validate(data);
  },

  // Battle Input Schema (Reusable)
  validateBattleInput: (data) => {
    const schema = Joi.object({
      opponentId: Joi.string().hex().length(24).required(),
      stakeAmount: Joi.number().min(0).optional()
    });
    return schema.validate(data);
  }
};

module.exports = {
  ...validationMiddleware,
  ...validationSchemas
};