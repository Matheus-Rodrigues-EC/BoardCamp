import { db } from "../db.js";

export async function getRentals(req, res) {
    const { customerId, gameId, offset, limit, order, desc, status, startDate } = req.query;
    if (customerId) {
        // return res.status(200).send(customerId);
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            WHERE customers.id = $1`, [customerId]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    } else if (gameId) {
        // return res.status(200).send(gameId);
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            WHERE games.id = $1`, [gameId]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(order && desc){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            ORDER BY rentals."${order}" DESC;`);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(order){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			ORDER BY rentals."${order}"`);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(offset && limit){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            OFFSET $1 LIMIT $2;`, [offset, limit]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(offset){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            OFFSET $1;`, [offset]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(limit){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            LIMIT $1;`, [limit]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(startDate && status === 'open'){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			WHERE rentals."rentDate" >= $1 AND rentals."returnDate" ISNULL;`, [startDate]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(startDate && status === 'closed'){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			WHERE rentals."rentDate" >= $1 AND rentals."returnDate" NOTNULL;`, [startDate]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(status === 'open'){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			WHERE rentals."returnDate" ISNULL;`);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(status === 'closed'){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			WHERE rentals."returnDate" NOTNULL;`);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else if(startDate){
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
			WHERE rentals."rentDate" >= $1;`, [startDate]);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
    }else {
        try {
            const rentals = await db.query(`SELECT rentals.*, customers.id as "customerId", customers.name as "customerName", 
            games.id as "gameId", games.name as "gameName" FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id;`);

            const rentalList = rentals.rows.map((rental) => {
                const customer = { id: rental.customerId, name: rental.customerName };
                const game = { id: rental.gameId, name: rental.gameName };

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
        } catch (error) {
            return res.status(500).send(error);
        }
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
        VALUES ($1, $2, CURRENT_DATE, $3, null, $4, null)`, [customerId, gameId, daysRented, (price.rows[0].pricePerDay * daysRented) ]);
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao tentar adicionar um aluguel.");
    }
    
}

export async function finishRental(req, res){
    const {id} = req.params;
    let rental;
    try{
        rental = await db.query(`SELECT ((CURRENT_DATE) - (rentals."rentDate" + rentals."daysRented")) as delayFee, rentals."returnDate", games."pricePerDay" FROM rentals
        JOIN games ON rentals."gameId" = games.id AND rentals.id = $1`, [id]);
        if(rental.rowCount === 0) return res.sendStatus(404);
        if(rental.rows[0].returnDate !== null) return res.sendStatus(400);
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        let multa;
        if(rental.rows[0].delayfee <= 0){
            multa = 0;
        }else{
            multa = (rental.rows[0].delayfee * rental.rows[0].pricePerDay)
        }
        await db.query('UPDATE rentals SET "returnDate" = CURRENT_DATE, "delayFee" = $2 WHERE id = $1', [id, multa]);
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
            return res.sendStatus(400);
        }else{
            await db.query('DELETE FROM rentals WHERE id = $1 ', [id]);
        }
        return res.sendStatus(200);
    }catch(error){
        return res.status(500).send("Ocorreu um erro ao tentar deletar um aluguél")
    }
}