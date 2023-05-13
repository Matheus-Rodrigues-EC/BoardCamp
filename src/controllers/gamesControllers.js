import { db } from "../db.js"

export async function getGames(req, res) {

    const {name} = req.query;
    if(!name){
        try{
            const games = await db.query('SELECT * FROM games;');
            console.table(games.rows);
            res.send(games.rows);
        }catch(error){
            console.log(error);
            res.status(500).send(error)
        }
    }else{
        try{
            const games = await db.query(`SELECT * FROM games WHERE name ILIKE $1`, [name+'%'])
            return res.status(200).send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }
}

export async function postGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{
        const game = (await db.query('SELECT name FROM games WHERE name = $1', [name])).rows;
        if(game.length >= 1){
            // console.log(game);
            return res.sendStatus(409);
        }
    }catch(error){
        return res.status(500).send(error);
    }
    
    try{
        await db.query('INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay]);
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send(error)
    }
}