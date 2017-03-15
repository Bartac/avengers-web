
//State of application
let globalHeroes = [];

function application (){
	
	fetchHeroes().then(function(heroes){
		console.log('found heroes', heroes);

		//changed the State
		globalHeroes = heroes;

		displayHeroes(heroes)
	});
}

function fetchHeroes(){
	
	console.log('fetching heroes');
	return fetch("marvel/heroes").then(resp => resp.json() );
} 

function displayHeroes(heroes){
	//create <ul></ul>
	const ul = document.createElement("ul");
	document.body.appendChild(ul);

	heroes.forEach(hero => displayHero(hero));
}

function displayHero(hero){
	console.log('hero', hero.name);

	//search ul
	const ul = document.querySelector('ul');
	//create <li></li>
	const li = document.createElement("li");
	const text = document.createTextNode(hero.name);
	li.appendChild(text);
	ul.appendChild(li);

	// ADD button
	const button = document.createElement('button');
	button.appendChild(document.createTextNode('Delete ' + hero.name));
	li.appendChild(button);

	/*button.addEventListener('click', function(event) {
		
		removeHero(hero.id);
	})*/
}

/*function removeUser(id){
	fetch('api/users/'+id, {method:'delete'})
		.catch(error => application());
	globalUsers = globalUsers.filter( users => users.id !== id);
	document.body.removeChild(document.querySelector("ul"));
	displayUsers(globalUsers);
}*/

application();