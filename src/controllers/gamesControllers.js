import { db } from "../db.js"

export async function getGames(req, res) {

    const {name, offset, limit, order, desc} = req.query;
    if(name){
        try{
            const games = await db.query(`SELECT * FROM games WHERE name ILIKE $1`, [name+'%'])
            return res.status(200).send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else if(order && desc){
        try{
            const games = await db.query(`SELECT * FROM games ORDER BY "${order}" DESC;`);
            res.send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else if(order){
        try{
            const games = await db.query(`SELECT * FROM games ORDER BY "${order}" ASC;`);
            res.send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else if(offset && limit){
        try{
            const games = await db.query('SELECT * FROM games OFFSET $1 LIMIT $2;', [offset, limit]);
            res.send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else if(offset){
        try{

            const games = await db.query('SELECT * FROM games OFFSET $1;', [offset]);
            res.send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else if(limit){
        try{
            const games = await db.query('SELECT * FROM games LIMIT $1;', [limit]);
            res.send(games.rows);
        }catch(error){
            return res.status(500).send(error);
        }
    }else{
        try{
            const games = await db.query('SELECT * FROM games;');
            res.send(games.rows);
        }catch(error){
            res.status(500).send(error)
        }
    }
}

export async function postGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{
        const game = (await db.query('SELECT name FROM games WHERE name = $1', [name])).rows;
        if(game.length >= 1){
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