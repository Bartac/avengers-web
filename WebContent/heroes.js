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
		<footer> Some footer</footer>
		</div>`;

		//cached component element
		this.$el = $(template);
		console.log(this.$el);

		this.collection.forEach(hero => this.$el.find('ul').append(hero.render()));
		$('body').append(this.$el);
		return this.$el;

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


