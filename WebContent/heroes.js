function HeroListCompenent() {

}

HeroListCompenent.prototype = {
	fetchAll: function () {
		return $.get('marvel/heroes')
			//.then(resp => resp.json())
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					const hero = new HeroItem(data, this);
					this.collection.push(hero);
				});
				return this.collection;
			});
	},
	render: function () {
		const template = `<div>
		<h1>Hero List</h1>
		<ul>
		</ul>
			<form>
			name:<br>
				<input class='name' type="text" name="name" value="">
				<br>
			real name:<br>
				<input class='realname' type="text" name="realname" value="">
				<br>
			team name:<br>
				<input class='teamname' name="teamname" value="">
				<br>
				<button class="create" type="button">Create</button>
			</form> 
		<footer> Some footer</footer>
		</div>`;

		//cached component element
		this.$el = $(template);
		console.log(this.$el);

		//Create button click
		const button = this.$el.find('button.create').on('click', evt => this.add());  // Fat arrow already binded to this


		this.collection.forEach(hero => this.$el.find('ul').append(hero.render()));
		$('body').append(this.$el);
		return this.$el;

	},
	
	add: function() {
		// Recuperer les valeurs du formulaire
		const name = $('input.name').val();
		const real_name = $('input.realname').val();
		const team_name = $('input.teamname').val();

		const hero = {name:name,real_name,team_name};

		//Create les valeurs dans la base de données
		fetch('marvel/heroes',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(hero)
			})
			.then(resp => {
				const item = new HeroItem(hero, this);
				this.collection.push(item);
				this.$el.append(item.render());
				//this.$el.remove();
				//this.render();
			});

		// Mettre à jour l'affichage
		//this.fetchAll();
		//this.render();
	}
	
}


function HeroItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
}

HeroItem.prototype = {

	render() {

		const template = `<li>
		Name : ${this.name} </br>
		Real name : ${this.real_name}</br>
		Team name : ${this.team_name}</br>
		</li>`;


		// Element queryfied
		this.$el = $(template);
		// Catch the button without readin all dom with find()
		//const button = this.$el.find('button').on('click', evt => this.remove());  // Fat arrow already binded to this
		return this.$el;


	},
	/*remove() {
		fetch('api/users/' + this.id, { method: 'delete' })
			.catch(error => application());

		// newsgtate
		component.collection = component.collection.filter(user => user.id !== this.id);

		this.$el.remove();
	}*/

	
}


