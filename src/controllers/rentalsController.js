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
    
}

export async function finishRental(req, res){

}

export async function deleteRental(req, res){

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