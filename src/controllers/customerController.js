import { db } from "../db.js";

export async function getCustomers(req, res){
    try{
        const customers = await db.query("SELECT * FROM customers;");
        console.table(customers.rows);
        return res.status(200).send(customers.rows);
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
}

export async function getCustomerId(req, res){
    const {id} = req.params;

    try{
        const customer = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
        if(customer.rows.length === 0){
            return res.sendStatus(404);
        }
        return res.status(200).send(customer.rows[0]);
    }catch(error){
        return res.status(500).send(error);
    }
}

export async function postCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    // Faz a busca para verificar se existe algum usuário com esse mesmo cpf
    try{
        const customer = await db.query("SELECT cpf FROM customers WHERE cpf = $1", [cpf]);
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
    
}