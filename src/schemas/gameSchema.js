import Joi from "joi";

export const gameSchema = Joi.object({
        Name: Joi.string()
                .required(),

        Stock: Joi.number()
                .min(1)
                .required(),

        Price: Joi.number()
                .min(1)
                .required()
})