import { gameSchema } from "../schemas/gameSchema.js";

export function validateGame(req, res, next){
    const {name, stockTotal, pricePerDay} = req.body;

    if(gameSchema.validate({Name: name, Stock: stockTotal, Price: pricePerDay}).error !== undefined){
        
        return res.sendStatus(400);
    }else{
        next();
    }

}