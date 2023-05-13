import { db } from "../db.js";
import dayjs from "dayjs";

export async function getCustomers(req, res){
    const {cpf} = req.query;
    if(!cpf){
        try{
            const customers = await db.query("SELECT * FROM customers;");
            const customerList = customers.rows.map((client) => {
                return (
                    {
                        id: client.id,
                        name: client.name,
                        phone: client.phone,
                        cpf: client.cpf,
                        birthday: dayjs(client.birthday).format("YYYY-MM-DD")
                    }
                )
            })
            return res.status(200).send(customerList);
        }catch(error){
            console.log(error)
            return res.status(500).send(error);
        }
    }else{
        try{
            const customers = await db.query("SELECT * FROM customers WHERE cpf ILIKE $1", [cpf+'%']);
            const customerList = customers.rows.map((client) => {
                return (
                    {
                        id: client.id,
                        name: client.name,
                        phone: client.phone,
                        cpf: client.cpf,
                        birthday: dayjs(client.birthday).format("YYYY-MM-DD")
                    }
                )
            })
            return res.status(200).send(customerList);
        }catch(error){
            console.log(error)
            return res.status(500).send(error);
        }
    }

}

export async function getCustomerId(req, res){
    const {id} = req.params;

    try{
        const customer = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
        if(customer.rows.length === 0){
            return res.sendStatus(404);
        }
        return res.status(200).send({
            id: customer.rows[0].id,
            name: customer.rows[0].name,
            phone: customer.rows[0].phone,
            cpf: customer.rows[0].cpf,
            birthday: dayjs(customer.rows[0].birthday).format("YYYY-MM-DD")
        });
    }catch(error){
        return res.status(500).send(error);
    }
}

export async function postCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    // Faz a busca para verificar se existe algum usuário com esse mesmo cpf
    try{
        const customer = await db.query('SELECT cpf FROM customers WHERE cpf = $1', [cpf]);
        if(customer.rows.length >=1) return res.sendStatus(409);
    }catch(error){
        return res.status(500).send(error);
    }
    // faz o cadastro de um novo usuário
    try{
        await db.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)", [name, phone, cpf, birthday]);
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send(error);
    }
}

export async function putCustomer(req, res){
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;
    try{
        if(cpf){
            const customers = await db.query('SELECT * FROM customers WHERE id = $1 OR cpf = $2', [id, cpf]);
            if((customers.rowCount > 1)) {
                return res.sendStatus(409);
            }
        }
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        if(!cpf){
            await db.query('UPDATE customers SET name = $1, phone = $2, birthday = $3 WHERE id = $4', [name, phone, birthday, id]);
            return res.sendStatus(200);
        }else{
            await db.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5', [name, phone, cpf, birthday, id]);
            return res.sendStatus(200);
        }
    }catch(error){
        return res.status(500).send(error)
    }
}