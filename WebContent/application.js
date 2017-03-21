
let component;
let component2;

function application() {

	component = new HeroListCompenent();
	component.fetchAll().then(function () {
		component.render();
	});

	component2 = new MovieListCompenent();
	component2.fetchAll().then(function (movie) {
		component2.render();
	});

}

//25ms after
$(document).ready(function () {
	application();
});