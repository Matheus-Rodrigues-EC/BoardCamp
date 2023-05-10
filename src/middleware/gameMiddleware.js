import { gameSchema } from "../schemas/gameSchema.js";

export function validateGame(req, res, next){
    const {name, stockTotal, pricePerDay} = req.body;

    if(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error !== undefined){
        
        if(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error.message === '"Stock" must be greater than or equal to 1'){
            return res.sendStatus(400);
        }

        if(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error.message === '"Price" must be greater than or equal to 1'){
            return res.sendStatus(400);
        }

        if(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error.message === '"Name" is not allowed to be empty'){
            return res.sendStatus(400);
        }
        console.log(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error.message);
        return res.status(422).send(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error.message);
    }else{
        next();
    }

}