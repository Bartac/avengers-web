import {HeroListCompenent} from './heroes'
import {HeroItem} from './heroes'
let movie;

export function MovieListCompenent() {

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
        let me = this.$el;
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.createmovie').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Movie data
        this.collection.forEach(movie => this.$el.find('ul.movie').append(movie.render()))

        // Render Hero Checkbox data
        const temp = new HeroListCompenent();
        temp.fetchAll().then(function(){
            temp.collection.forEach(hero => me.find('div.checkhero').append(hero.renderC()));
        });

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

export function MovieItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
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
        //component2.collection = component2.collection.filter(movie => movie.id !== this.id);
        console.log('Deleted :'+this.name);
        this.$el.remove();
    }

}