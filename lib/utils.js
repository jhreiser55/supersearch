require ("isomorphic-fetch");
import BPromise from "bluebird";
import jsCookie from "js-cookie";

function getItem(item){
	const zip = jsCookie.get("zip");
	return fetch(`http://35.245.223.113:8080/api?q=${item}&zip=${zip}`).then(function(resp){
		return resp.json();
	})
}

async function getUser(user){
	const params = new URLSearchParams(user);
	return await fetch("http://35.245.223.113:8080/api/login",
		{method: "POST",
		cache: 'no-cache',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	}).then(function(resp){
		return resp.json();
	});
}

function handleError(error){
	console.warn(error);
	return null;
}

async function handleCreate(user){
	const params = new URLSearchParams(user);
	return await fetch("http://35.245.223.113:8080/api/create-user",
		{method: "POST",
		cache: 'no-cache',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	}).then(function(resp){
		return resp.json();
	});
}

module.exports = {
	getCreate: function(user){
		return handleCreate(user).catch(handleError);
	},
	getInfo: function(item){
		return getItem(item).catch(handleError);
	},

	getLogin: function(user){
		return getUser(user).catch(handleError);
	}
}
