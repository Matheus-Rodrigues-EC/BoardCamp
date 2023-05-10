import { customerSchema } from "../schemas/customerSchema.js";

export function validateCustomer(req, res, next){
    const {name, phone, cpf, birthday} = req.body;

    if(customerSchema.validate({Name: name, Phone: phone, CPF: cpf, Birthday: birthday}).error !== undefined){
        
        return res.sendStatus(400);
        
    }else{
        next();
    }
}