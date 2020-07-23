// ----------> CRIAÇÂO DO BACKEND <-----------------

// Frameworks
const express = require("express")
const nunjucks = require("nunjucks")

// Rotas
const routes = require("./routes")

// Override para métodos PUT e DELETE
const methodOverride = require("method-override")

// Instancia do Server
const server = express()

// Middleware
server.use(express.urlencoded({ extended: true }))  // Utilizado para receber requisições tipo body
server.use(express.static('public'))
server.use(methodOverride('_method'))  // Deve-se colocar antes da rota para poder sobrescrever
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false, 
    noCache: true
})

// Execução do Server
server.listen(5000, function () {
    console.log("server is running")    
})