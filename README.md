<h1 align="center">
    <img height=150px src="foto-logo.png">
</h1>

<h2 align="center">
    Fabiano Luizon Campos
</h2>

<h3 align="center">
    Software Developer
</h3>

---

https://github.com/FabianoLuizonCampos

---

## 👾 About
**School Registration ** This website is to control the number of teachers and students, and the relationship between them. That´s a challenge from Rocketseat's Lauchbase Bootcamp !!!

## 🖥️ Screenshots

<h1 align="center">
    <img src="school.gif">
</h1>

## Setup for Web Site

1. First clone de repository - If you need help acess: https://help.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository
2. Open your computer´s terminal and change to folder that was cloned
3. You already have NodeJs installed in you computer;
4. Install in terminal with line commands  
5. `npm install express`
6. `npm install nodemon -D`
7. `npm install nunjucks`
8. Then you can start server
9. `npm start`
10. In browser go to url: `localhost:5000`

## Setup for Database

1. Install PostgreSQL Database
2. Run follow query:

```sql

CREATE DATABASE schoolmanager;

```
3. Make connection with this database and run follow querys:

```sql

CREATE TABLE teachers(
  id serial PRIMARY KEY,
  avatar_url TEXT NOT NULL,
	name TEXT NOT NULL,
	birth_date TIMESTAMP NOT NULL,
	education_level TEXT NOT NULL,
	class_type TEXT NOT NULL,
	subjects_taught TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL
);

CREATE TABLE students(
  id serial PRIMARY KEY,
  avatar_url TEXT NOT NULL,
	name TEXT NOT NULL,
	birth_date TIMESTAMP NOT NULL,
	email TEXT NOT NULL,
	current_year TEXT NOT NULL,
	week_hours INTEGER NOT NULL,
	created_at TIMESTAMP NOT NULL,
  teacher_id INTEGER NOT NULL
);

```




## ✔️ Languages Used
- HTML
- CSS
- JavaScript 
- Node / Express
- Nunjucks - Template Engine
- PostgreSQL Database

## 📇 Contacts
- <a href="https://github.com/FabianoLuizonCampos" target="_blank">Github</a>
- <a href="https://www.linkedin.com/in/fabianoluizoncampos" target="_blank">LinkedIn</a>
- <a href="mailto:fabianoluizoncampos@gmail.com" target="_blank">Email</a>

## 📇 Backgroung Image Reference

<h1 align="center">
    <img src="public\assets\design_for_education_illustration_tubik.png">
</h1>

This image belows to: 

- <a href="https://tubikstudio.com/" target="_blank">Tubik Studio</a>

And link used is from:

- <a href="https://dribbble.com/shots/6665427-Design-for-Education-Illustration?utm_source=Clipboard_Shot&utm_campaign=Tubik&utm_content=Design%20for%20Education%20Illustration&utm_medium=Social_Share" target="_blank">Dribble</a>

