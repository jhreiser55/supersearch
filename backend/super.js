const express = require("express");
const bodyParser = require("body-parser");
const argon = require("argon2");
const cors = require("cors");
const app = express();


app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "supersearch",
	password: "abc123",
	database: "places"
};

const pool = new Pool(config);

app.post("/api/login", async(req, res) =>{
	const username = req.body.username;
	const password = req.body.password;
	try{
		const template = "SELECT password, zip from users where username = $1";
		const response = await pool.query(template, [username]);
		if(response.rowCount == 1){
			if(await argon.verify(response.rows[0].password, password)){
				const zip = response.rows[0].zip;
				console.log(username + " " + zip);
				res.json({"status" : "success", "username" : username, "zip" : zip});
			}else{
				res.json({"status" : "Password incorrect"});
			}
		}else{
			res.json({"status" : "Username not found"});
		}
	}catch (err){
		console.log("in catch of /api/login" + err);
	}
});

//GET list of users
app.get("/api", async (req, res) => {
	try {
		let type;
		const zipCode = req.query.zip;
		console.log("zip is " + zipCode);
		if(zipCode === undefined || zipCode === "undefined"){
			if (req.query.q == "movies" || req.query.q == "Movies"){
				console.log("In the if");
				const template = "SELECT movie, theater, address, city, zip FROM movies";
				const response = await pool.query(template);
				res.json({type: 'movies', results: response.rows});
			}
			else {//add Zip to all these selects
				console.log("in first else");
				const template = "SELECT movie, theater, address, city, zip FROM movies WHERE movie ilike $1";
				const response = await pool.query(template,[`%${req.query.q}%`]);
				if(response.rowCount == 0){
					type = 'stores';
					const template2 = "SELECT DISTINCT stores.name, types.typeName, stores.address, stores.city, stores.zip FROM stores join types on stores.storeID = types.storeID WHERE stores.name ilike $1 OR types.typeName ilike $1 ORDER BY stores.name;";
					const response2 = await pool.query(template2,[`%${req.query.q}%`]);
					res.json({type: 'stores', results: response2.rows});
				}else{
					type = 'movies';
					res.json({type: 'movies', results: response.rows});
				}
			}
		}
		//select statements without the zip code
		else{
			console.log("In the else");
			if (req.query.q == "movies" || req.query.q == "Movies"){
				console.log("in if of movies where zip defined");
				const template = "SELECT movie, theater, address, city, zip FROM movies WHERE zip = $1";
				const response = await pool.query(template, [zipCode]);
				res.json({type: 'movies', results: response.rows});
			}
			//adding zip code to the select statements
			else {
				const template = "SELECT movie, theater, address, city, zip FROM movies WHERE movie ilike $1 AND zip = $2";
				const response = await pool.query(template,[`%${req.query.q}%`, zipCode]);
				if(response.rowCount == 0){
					type = 'stores';
					const template2 = "SELECT DISTINCT stores.name, types.typeName, stores.address, stores.city, stores.zip FROM stores join types on stores.storeID = types.storeID WHERE (stores.name ilike $1 OR types.typeName ilike $1) AND (stores.zip = $2) ORDER BY stores.name;";
					const response2 = await pool.query(template2,[`%${req.query.q}%`, zipCode]);
					res.json({type: 'stores', results: response2.rows});
				}else{
					type = 'movies';
					res.json({type: 'movies', results: response.rows});
				}
				
			}
		}
	}catch(err){
		console.log("in catch of search" + err.stack);
	}

});

//creating a user
app.post("/api/create-user", async (req, res) =>{
	console.log("in create user backend");
	const username = req.body.username;
	const password = req.body.password;
	const zip = req.body.zip;
	let password;
	try{
		password = await argon.hash(password);
		const template = "SELECT username FROM users WHERE username = $1;"; 
		const response = await pool.query(template, [username]);

		if (response.rowCount == 0){
			const template = "INSERT INTO users (username, password, zip) values ($1, $2, $3)";
			const response = await pool.query(template, [
				username,
				password,
				zip
			]);
			res.json({ "status": "You are registered!"});
		}
		else{
			res.json({"status": "Username already exists"});
		}
	}catch(err){
		console.log("this is a big ol error" + err);
	}
});


app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
});
