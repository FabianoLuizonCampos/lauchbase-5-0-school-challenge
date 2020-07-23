# !!!! THIS NOTES BELOW IS FOR OWNER ORIENTATION ONLY / ESTA NOTAS ABAIXO É APENAS PARA ORIENTAÇÃO DO PROPRIETÁRIO

## Criando uma aplicação

* `estruturas de pasta`         Criar uma estrutura de pastas a qual sera utilizada no projeto geral

## Criando uma aplicação com Express
 
* `server.js`                   Criar o arquivo que será o server Backend

* `npm init -y`                 Inicializa o npm

* `npm install express`         Instala o Express para a sua aplicação

* `npm install nodemon -D`      Automatiza o restart do servidor node mon(inotaramento), somente para desenvolvimento

* `package.json`                Editar o arquivo, na seção scripts, criar atalho para o arquivo do servidor
    "scripts": {
        "start": "node src/server.js"
    },

## Criando uma aplicação com Nunjucks

* `npm install nunjucks`        Instalar o NunJucks.js - HTML com superpoderes

* `server.js`                   Inserir as configurações básicas no servidor

### Inserir as configurações básicas no servidor

```js 

// include os frameworks
const express = require("express")
const nunjucks = require("nunjucks")

// instanciando o server
const server = express()

// include do database
const recipes = require("./database/data")

// configurações do servidor e do template engine
server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false, 
    noCache: true
})

```

## Base de Arquivo Layout.njk

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- TITLE -->
    {% block title %}
        <title>Foodfy by FabianoLC</title>
    {% endblock title %}

    <link rel="stylesheet" href="/styles/main.css">

    <!-- STYLES PAGE -->
    {% block styles %}
    {% endblock styles %}    
</head>
<body>

   
    <!-- PAGE ID -->
    <div id="{{ pageId }}">

        <!-- INCLUDE DO HEADER -->

        <!-- PAGE CONTENT -->
        {% block content %}
        {% endblock content %}

        <!-- INCLUDE DO FOOTER -->

    </div>

    <!-- MODAL -->
    {% block modal %}
    {% endblock modal %} 

    <!-- SCRIPTS -->
    {% block scripts %}
    {% endblock scripts %}

</body>
</html>

```

## Base de Arquivo page-xxx.njk

```html

{% extends "layout.njk" %}

{% set pageId = "page-home" %}

<!-- TITLE -->
{% block title %}  
{% endblock title %}

<!-- STYLES PAGE -->
{% block styles %}
{% endblock styles %}  
    

<!-- PAGE CONTENT -->
{% block content %}
    <!-- HEADER -->
    {% include "partials/page-header.njk" %} 

    <!-- CONTENT -->

    <!-- FOOTER -->
    {% include "partials/page-footer.njk" %}
{% endblock content %}
   
<!-- MODAL -->
{% block modal %}
{% endblock modal %} 

<!-- SCRIPTS -->
{% block scripts %}
{% endblock scripts %} 

<!-- FOOTER -->
{% block footer %}
{% endblock footer %}

```

## Dependências para atualizar o browser  automaticamente

* `npm install browser-sync npm-run-all -D`                   Dependências para atualizar o browser  automaticamente - `npm-run-all -D ` para rodar varios serviços dentro do servidor

## Alterar o arquivo package.json na seção scripts

```json

{
  "name": "4_1_academy",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "npm-run-all -p nodemon browsersync",
    "nodemon": "nodemon src/server.js",
    "browsersync": "browser-sync start --proxy http://localhost:5000 --files 'public,src'"
  },
  "dependencies": {
    "express": "^4.17.1",
    "nunjucks": "^3.2.1"
  },
  "devDependencies": {
    "browser-sync": "^2.26.7",
    "nodemon": "^2.0.4",
    "npm-run-all": "^4.1.5"
  }
}


```

## HTTP VERBS

* `GET:` Receber RESOURCE
* `POST:` Criar um novo RESOURCE com dados enviados
* `PUT:` Atualizar RESOURCE
* `DELETE:` Deletar RESOURCE


## METHOD-OVERRIDE

* `npm intall method-override`          Permite utilizar o PUT e DELETE pois em formulários de html só é permitido usar o GET e o POST


## CONEXÃO COM BANCO DE DADOS POSTGRES

* `npm intall pg`                       Instala as dependencias referente ao uso do banco de dados Postgres