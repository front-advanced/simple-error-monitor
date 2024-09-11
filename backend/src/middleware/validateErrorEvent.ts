import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const errorEventSchema = Joi.object({
  message: Joi.string().required(),
  stack: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  url: Joi.string().uri().required(),
  userAgent: Joi.string().required(),
  projectId: Joi.string().required(),
  environment: Joi.string().valid('production', 'development', 'staging').required(),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
  metadata: Joi.object().pattern(Joi.string(), Joi.any()),
  version: Joi.string().optional(),
});

export const validateErrorEvent = (req: Request, res: Response, next: NextFunction) => {
  const { error } = errorEventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};