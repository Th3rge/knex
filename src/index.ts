import  connection  from "./connection";
import app from './app'

app.get("/", async (req, res) => {
    try {
        // const result = await connection.raw(
        //     `SELECT * FROM actor;`
        // )

        const result = await connection("Actor")
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.sqlMessage || error.message)
    }
})

app.post("/actor", async (req, res) => {
    try {
        //TERCEIRA FORMA DE FAZER DESESTRUTURANDO DADOS

        // const [name, salary, birth_date, gender] = req.body

        // const novoAtor = {
        //     name,
        //     salary,
        //     birth_date,
        //     gender
        // }

        //PRIMEIRA FORMA DE FAZER UTILIZANDO VARIAVEL
        const novoAtor = {
            name: req.body.name,
            salary: req.body.salary,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            hometown: req.body.hometown
        }

        await connection("Actor").insert(novoAtor)

        //SEGUNDA FORMA DE FAZER UTILIZANDO QUERY

        // await connection.raw(`
        //     INSERT INTO Actor
        //     (name, salary, birth_date, gender)
        //     VALUES (
                
        //         "${req.body.name}",
        //         ${req.body.salary},
        //         "${req.body.birth_date}",
        //         "${req.body.gender}"
        //     )
        // `)

        
        res.status(200).send("Dados enviados!")
    } catch (error: any) {
        res.status(400).send(error.sqlMessage || error.message)
    }
})

app.put("/actor/:id", async (req, res) =>{
    try {
        await connection(`Actor`)
        .update({
            name: req.body.name,
            salary: req.body.salary,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            speciality: req.body.speciality        
        })
        .where({id: req.params.id})
        res.status(200).send("Dados atualizados")
    } catch (error: any) {
        res.status(400).send(error.sqlMessage || error.message)
    }
})

app.delete("/actor/:id",async (req, res) => {
    try {
        await connection(`Actor`)
        .delete()
        .where({id: req.params.id})
        res.status(200).send("Dados deletados")
    } catch (error: any) {
        res.status(400).send(error.sqlMessage || error.message)
    }
})