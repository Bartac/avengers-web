
let component;
let component2;

function application() {
	component2 = new MovieListCompenent();
	component2.fetchAll().then(function (movie) {
		component2.render();
	});
	component = new HeroListCompenent();
	component.fetchAll().then(function (heroes) {
		component.render();
	});


}

//25ms after
$(document).ready(function () {
	application();
});