import { db } from "../db.js";

export async function getRentals(req, res){

    try{
        const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
        games.id as "gameId", games.name as "gameName" FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;`);

        const rentalList = rentals.rows.map((rental) => {
            const customer = {id: rental.customerId, name: rental.customerName};
            const game = {id: rental.gameId, name: rental.gameName};

            return ({
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: rental.rentDate,
                daysRented: rental.daysRented,
                returnDate: rental.returnDate,
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                customer,
                game
            })
        })
        return res.status(200).send(rentalList);
    }catch(error){
        return res.status(500).send(error);
    }

}

export async function addRental(req, res){
    const {customerId, gameId, daysRented} = req.body;
    if(daysRented <= 0) return res.sendStatus(400);
    let price;
    try{
        price = await db.query('SELECT * FROM games WHERE id = $1;', [gameId]);
        if(!price.rows[0]) return res.sendStatus(400);
        const user = await db.query('SELECT * FROM customers WHERE id = $1;', [customerId]);
        if(!user.rows[0]) return res.sendStatus(400);
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao buscar o jogo.")
    }

    try{
        const remainingGames = await db.query(`SELECT games.*, rentals."gameId", rentals."returnDate"
        FROM games, rentals 
        WHERE games.id = $1 AND rentals."gameId" = $1 AND rentals."returnDate" ISNULL`, [gameId]);
        // console.log("Rows: " + remainingGames.rowCount);
        // console.log("Stock: " + remainingGames.rows[0]);
        if(remainingGames.rowCount > 0){
            if(remainingGames.rowCount >= remainingGames.rows[0].stockTotal){
                return res.sendStatus(400);
            }
        }
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao tentar cadastrar um novo aluguél.");
    }

    try{
        await db.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, now(), $3, null, $4, null)`, [customerId, gameId, daysRented, (price.rows[0].pricePerDay * daysRented) ]);
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao tentar adicionar um aluguel.");
    }
    
}

export async function finishRental(req, res){
    const {id} = req.params;
    let rental;
    try{
        rental = await db.query(`SELECT (now() - rentals."rentDate") as delayFee, rentals."daysRented", rentals."returnDate", games."pricePerDay" FROM rentals
        JOIN games ON rentals."gameId" = games.id AND rentals.id = $1`, [id]);
        if(rental.rowCount === 0) return res.sendStatus(404);
        if(rental.rows[0].returnDate !== null) return res.sendStatus(400);
        console.log(rental.rows[0]);
    }catch(error){}
    console.log(rental.rows[0].delayfee.days - rental.rows[0].daysRented);

    let multa;
    if((rental.rows[0].delayfee.days - rental.rows[0].daysRented) <= 0){
        multa = 0;
    }else{
        multa = (rental.rows[0].delayfee.days * rental.rows[0].pricePerDay) - rental.rows[0].daysRented;
    }

    try{
        await db.query('UPDATE rentals SET "returnDate" = now(), "delayFee" = $2 WHERE id = $1', [id, multa]);
        return res.sendStatus(200);
    }catch(error){
        return res.status(500).send(error)
    }
}

export async function deleteRental(req, res){
    const {id} = req.params;

    try{
        const rental = await db.query('SELECT id, "returnDate" FROM rentals WHERE id = $1 ', [id]);
        if(rental.rowCount === 0) return res.sendStatus(404);
        if(!rental.rows[0].returnDate){
            console.log(rental.rows[0].returnDate);
            return res.sendStatus(400);
        }else{
            await db.query('DELETE FROM rentals WHERE id = $1 ', [id]);
        }
        console.log(rental.rows[0].renturDate);
        return res.sendStatus(202);
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao tentar deletar um aluguél")
    }
}

// {
//     id: 1,
//     customerId: 1,
//     gameId: 1,
//     rentDate: '2021-06-20',    // data em que o aluguel foi feito
//     daysRented: 3,             // por quantos dias o cliente agendou o aluguel
//     returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
//     originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
//     delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
//   }