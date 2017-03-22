import {HeroListCompenent} from './heroes'
import {HeroItem} from './heroes'
import {MovieListCompenent} from './movie'
let team;

export function TeamListCompenent() {

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
            <button class="createteam" type="button">Create</button></br>
			</form> 
		<footer> Some footer</footer>
		</div>`;


        //TODO Add form : Create Movie with a list of heroes

        //cached component element
        this.$el = $(template);
        let me = this.$el;
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.createteam').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Team data
        this.collection.forEach(team => this.$el.find('ul.team').append(team.render()))

        //Render Selected Team
        this.collection.forEach(team => this.$el.find('select.team').append(team.renderS()))

        // Render Selected Hero
        const temp = new HeroListCompenent();
        temp.fetchAll().then(function(){
            temp.collection.forEach(hero => me.find('select.hero').append(hero.renderS()));
        });

        //component.collection.forEach(team => this.$el.find('div.checkhero').append(team.renderC()));

        // Add data to the body
        $('body').append(this.$el);
        return this.$el;

    },

    add: function () {
        // Recuperer les valeurs du formulaire
        const team_name = $('input.moviename').val();
        const heroes_name = [];
        $('input.check:checked').each(function () {
            heroes_name.push($(this).val());
        });
        const movieadded = { name, heroes_name };
        console.log('Movie added ' + movieadded.name);
        console.log('Heroes added ' + movieadded.heroes_name);

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
                const me = this;
                me.fetchAll().then(function () {
                    me.render();
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

export function TeamItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
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
        //component3collection = component3.collection.filter(team => team.id !== this.id);
        console.log('Deleted :' + this.team_name);
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