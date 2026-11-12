import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
import "dotenv/config"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: process.env.HOST_BANCO,
    user: process.env.USUARIO_BANCO,
    password: process.env.SENHA_BANCO,
    database: process.env.NOME_BANCO
})

app.get("/", (request, response) => {
    const comandoSelect = "SELECT * FROM musicas_igorreis"

    sql.query(comandoSelect, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ mensagem: "Erro ao buscar músicas!" })
        }

        response.json(data)
    })
})

app.post("/cadastrar", (request, response) => {

    const { titulo, artista, genero, ano, duracao } = request.body

    const comandoInsert = "INSERT INTO musicas_rodolfoteizen (titulo, artista, genero, ano, duracao) VALUES (?, ?, ?, ?, ?)"

    sql.query(comandoInsert, [titulo, artista, genero, ano, duracao], (error) => {

        if (error) {
            console.log(error)
            return response.status(500).json({ mensagem: "Erro ao cadastrar música!" })
        }

        response.status(201).json({ mensagem: "Música cadastrada com sucesso!" })

    })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

export default app