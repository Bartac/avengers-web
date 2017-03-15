

function application() {

	fetchHeroes().then(function (heroes) {
		console.log('Found heroes', heroes);
		displayHeroes(heroes);
	});
}

function fetchHeroes() {
	console.log('Fetching Heroes');
	return fetch('marvel/heroes').then(resp => resp.json());

}

function displayHeroes(heroes) {
	// Create ul
	const ul = document.createElement("ul");
	document.body.appendChild(ul);
	heroes.forEach(heroes => displayHero(heroes));
}

function displayHero(hero) {
	console.log("hero ", hero.name);

	// search ul
	const ul = document.querySelector("ul");

	// create <li></li>
	const li = document.createElement("li");
	const text = document.createTextNode(hero.name);
	li.appendChild(text);
	ul.appendChild(li)

	// create button
	const button = document.createElement("button");
	button.appendChild(document.createTextNode("Delete " + hero.name));
	li.appendChild(button);
	button.addEventListener('click', function (event) {
		console.log(hero.name + " deleted");
		removeUser(hero.id);
	});
}

function removeUser(id) {

}

application()