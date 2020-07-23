// ----------> CRIAÇÂO DAS ROTAS <-----------------

const express = require("express")
const routes = express.Router()
const teachers = require('../src/app/controllers/teachers')
const students = require('../src/app/controllers/students')

// Rota Inicial
routes.get("/", function(req, res) {
    return res.render("index")
})

// ROTAS PROFESSORES
routes.get("/teachers", teachers.index)  // Index
routes.get("/teachers/create", teachers.create)  // Index
routes.post("/teachers", teachers.post)  // Salvar no banco
routes.get('/teachers/:id', teachers.show) // Ler do banco e mostrar na tela
routes.get('/teachers/:id/edit', teachers.edit) // Tela de Edição 
routes.put("/teachers", teachers.put) // Atualizar e retornar página index
routes.delete("/teachers", teachers.delete) // Deleta e retorna para pagina index


// ROTAS ESTUDANTES
routes.get("/students", students.index)  
routes.get("/students/create", students.create)  
routes.post("/students", students.post)  
routes.get('/students/:id', students.show) 
routes.get('/students/:id/edit', students.edit) 
routes.put("/students", students.put) 
routes.delete("/students", students.delete) 


module.exports = routes