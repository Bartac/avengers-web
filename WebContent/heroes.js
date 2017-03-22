let movie;
let hero;
let team;

function HeroListCompenent() {

}

function MovieListCompenent() {

}

function TeamListCompenent() {

}

HeroListCompenent.prototype = {
    fetchAll: function () {
        return $.get('marvel/heroes')
            //.then(resp => resp.json(1))
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    hero = new HeroItem(data, this);
                    this.collection.push(hero);
                });
                return this.collection;
            });
    },
    render: function () {

        // Create Template
        const template = `<div class='hero'>
		<h1>Hero List</h1>
		<ul class='hero'>
		</ul>
			<form>
			Name: <input class='name' type="text" name="name" value=""></br>
			Real name: <input class='realname' type="text" name="realname" value=""></br>
			Team name: <input class='teamname' type="text" name="realname" value=""></br>
				<button class="create" type="button">Create</button></br>
			</form> 
		<footer> Some footer</footer>
		</div>`;

        //cached component element
        this.$el = $(template);
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.create').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Hero data
        this.collection.forEach(hero => this.$el.find('ul.hero').append(hero.render()));

        // Add data to the body
        $('body').append(this.$el);
        return this.$el;

    },

    add: function () {
        // Recuperer les valeurs du formulaire
        const name = $('input.name').val();
        const real_name = $('input.realname').val();
        const team_name = $('input.teamname').val();

        const heroadded = {name, real_name, team_name };

        //Create les valeurs dans la base de données
        fetch('marvel/heroes',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(heroadded)
            })
            .then(resp => {
               // const item = new HeroItem(heroadded, this);
                //this.collection.push(item);

                //Add item to the end
                //this.$el.append(item.render());

                // Case 2 : Delete body and render all
                $('div.hero').remove();
                component.fetchAll().then(function () {
                    component.render();
                });
            });
    }

}

MovieListCompenent.prototype = {
    fetchAll: function () {
        return $.get('marvel/movies')
            //.then(resp => resp.json(1))
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    movie = new MovieItem(data, this);
                    this.collection.push(movie);
                });
                return this.collection;
            });
    },
    render: function () {

        // Create Template
        const template = `<div class='movie'>
		<h1>Movie List</h1>
		<ul class='movie'>
		</ul>
            <form>
            Movie: <input class='moviename' type="text" name="moviename" value=""></br>
            <div class='checkhero'></div>
				<button class="createmovie" type="button">Create</button></br>
			</form> 
		<footer> Some footer</footer>
		</div>`;


        //TODO Add form : Create Movie with a list of heroes

        //cached component element
        this.$el = $(template);
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.createmovie').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Movie data
        this.collection.forEach(movie => this.$el.find('ul.movie').append(movie.render()))

        // Render Hero Checkbox data
        component.collection.forEach(hero => this.$el.find('div.checkhero').append(hero.renderC()));

        // Add data to the body
        $('body').append(this.$el);
        return this.$el;

    },

    add: function () {
        // Recuperer les valeurs du formulaire
        const name = $('input.moviename').val();
        const heroes_name = [];
        $('input.check:checked').each(function () {
            heroes_name.push($(this).val());
        });
        const movieadded = {name, heroes_name };
        console.log('Movie added '+ movieadded.name);
        console.log('Heroes added '+ movieadded.heroes_name);

        //Create les valeurs dans la base de données
        fetch('marvel/movies',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(movieadded)
            })
            .then(resp => {
                $('div.movie').remove();
                component2.fetchAll().then(function () {
                    component2.render();
                });
                //const itemM = new MovieItem(movieadded, this);
                //this.collection.push(itemM);

                //Add item to the end
                //this.$el.append(item.render());

                // Case 2 : Delete body and render all
                //this.$el.remove();
                //this.render();
            });
    }

}

TeamListCompenent.prototype = {
    fetchAll: function () {
        return $.get('marvel/teams')
            //.then(resp => resp.json(1))
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    team = new TeamItem(data, this);
                    this.collection.push(team);
                });
                return this.collection;
            });
    },
    render: function () {

        // Create Template
        const template = `<div class='team'>
		<h1>Team List</h1>
		<ul class='team'>
		</ul>
            <form class='team'>
            Team
            <select class='team'>
            </select></br>
            <select class='hero'>
            </select></br>
			</form> 
		<footer> Some footer</footer>
		</div>`;


        //TODO Add form : Create Movie with a list of heroes

        //cached component element
        this.$el = $(template);
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.createteam').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Movie data
        this.collection.forEach(team => this.$el.find('ul.team').append(team.render()))

        //Render Selected Movie
        this.collection.forEach(team => this.$el.find('select.team').append(team.renderS()))

        // Render Selected Hero
        hero.collection.forEach(hero => this.$el.find('select.hero').append(hero.renderS()))

        //component.collection.forEach(team => this.$el.find('div.checkhero').append(team.renderC()));

        // Add data to the body
        $('body').append(this.$el);
        return this.$el;

    },

    add: function () {
        // Recuperer les valeurs du formulaire
        const name = $('input.moviename').val();
        const heroes_name = [];
        $('input.check:checked').each(function () {
            heroes_name.push($(this).val());
        });
        const movieadded = {name, heroes_name };
        console.log('Movie added '+ movieadded.name);
        console.log('Heroes added '+ movieadded.heroes_name);

        //Create les valeurs dans la base de données
        fetch('marvel/heroes',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(movieadded)
            })
            .then(resp => {
                $('div.movie').remove();
                component3.fetchAll().then(function () {
                    component3.render();
                });
                //const itemM = new MovieItem(movieadded, this);
                //this.collection.push(itemM);

                //Add item to the end
                //this.$el.append(item.render());

                // Case 2 : Delete body and render all
                //this.$el.remove();
                //this.render();
            });
    }

}


function HeroItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

function MovieItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

function TeamItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

HeroItem.prototype = {

    render() {

        // Create Template
        const template = `<li>
		Name : ${this.name} </br>
		Real name : ${this.real_name}</br>
		Team name : ${this.team_name}</br>
		<button class="delete" value="${this.id}">Delete ${this.name}</button>
		</li>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        const button = this.$el.find('button.delete').on('click', evt => this.remove());  // Fat arrow already binded to this
        return this.$el;


    },
    remove() {
        fetch('marvel/heroes/' + this.id, { method: 'delete' })
            .catch(error => application());

        // newsgtate
        component.collection = component.collection.filter(hero => hero.id !== this.id);
        console.log('Deleted :'+this.name);
        this.$el.remove();
    },

    renderC() {
        // Create Template
        const template = `<li>
        <input class='check' type="Checkbox" value="${this.id}">${this.name}</br>
		</li>`;

        // Element queryfied
        this.$el = $(template);
        console.log("Added " + this.name);
        return this.$el;
    },
    renderS() {

        // Create Template
        const template = `<option value="${this.id}">${this.name}</option>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        return this.$el;


    }

}

MovieItem.prototype = {

    render() {

        // Create Template
        const template = `<li>
		Movie : ${this.name} </br>
		Heroes name : ${this.heroes_name}</br>
		<button class="deletemovie" value="${this.id}">Delete ${this.name}</button></br>
		</li>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        const button = this.$el.find('button.deletemovie').on('click', evt => this.remove());  // Fat arrow already binded to this
        return this.$el;


    },
    remove() {
        fetch('marvel/movies/' + this.id, { method: 'delete' })
            .catch(error => application());

        // newsgtate
        component2.collection = component2.collection.filter(movie => movie.id !== this.id);
        console.log('Deleted :'+this.name);
        this.$el.remove();
    }

}

TeamItem.prototype = {

    render() {

        // Create Template
        const template = `<li>
		Team : ${this.team_name} </br>
		Heroes name : ${this.heroes_name}</br>
		<button class="deleteteam" value="${this.id}">Delete ${this.team_name}</button>
		</li>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        const button = this.$el.find('button.deleteteam').on('click', evt => this.remove());  // Fat arrow already binded to this
        return this.$el;


    },
    remove() {
        fetch('marvel/teams/' + this.id, { method: 'delete' })
            .catch(error => application());

        // newsgtate
        component3collection = component3.collection.filter(team => team.id !== this.id);
        console.log('Deleted :'+this.team_name);
        this.$el.remove();
    },

        renderS() {

        // Create Template
        const template = `<option value="${this.id}">${this.team_name}</option>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        return this.$el;


    }

}


