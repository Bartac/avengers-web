function MovieListCompenent() {

}

MovieListCompenent.prototype = {
    fetchAll: function () {
        return $.get('marvel/movies')
            //.then(resp => resp.json())
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    const movie = new MovieItem(data, this);
                    this.collection.push(movie);
                });
                return this.collection;
            });
    },
    render: function () {
        const template = `<div>
		<h1>Movie List</h1>
		<ul>
		</ul>
       		 <form>
			Movie name:<br>
				<input class='movie' type="text" name="movies" value="">
				<br>
				<button class="create" type="button">Create</button>
			</form> 
		<footer> Some footer</footer>
		</div>`;

        //cached component element
        this.$el = $(template);
        console.log(this.$el);
	
        this.collection.forEach(movie => this.$el.find('ul').append(movie.render()));
        $('body').append(this.$el);
        return this.$el;

    }
}


function MovieItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

MovieItem.prototype = {

    render() {

        const template = `<li>
		Movie Name : ${this.name} </br>
        Heroes  : ${this.heroes_name} </br>
<button class='delete' value='${this.id}>Delete ${this.name}</button>

		</li>`;


        // Element queryfied
        this.$el = $(template);
        // Catch the button without readin all dom with find()
        const button = this.$el.find('button.delete').on('click', evt => this.remove());  // Fat arrow already binded to this
        return this.$el;


    },
	remove() {
		fetch('marvel/movies/' + this.id, { method: 'delete' })
			.catch(error => application());

		// newsgtate
		component.collection = component.collection.filter(user => user.id !== this.id);

		this.$el.remove();
	}
}


