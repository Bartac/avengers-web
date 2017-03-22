import {MovieListCompenent} from './movie'

let component2;


function application() {

	component2 = new MovieListCompenent();
	component2.fetchAll().then(function () {
		component2.render();
	});

}

//25ms after
$(document).ready(function () {
	application();
});