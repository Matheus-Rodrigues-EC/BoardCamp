import Joi from "joi";

export const customerSchema = Joi.object({
        Name: Joi.string()
                .required(),

        Phone: Joi.string()
                .alphanum()
                .min(10)
                .max(11),

        CPF: Joi.string()
                .pattern(new RegExp('^[0-9]{11}$'))
                .required(),

        Birthday: Joi.date()
})