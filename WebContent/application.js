import {HeroListCompenent} from './heroes'
import {MovieListCompenent} from './movie'
import {TeamListCompenent} from './teams'

let component;
let component2;
let component3;


function application() {

	component = new HeroListCompenent();
	component.fetchAll().then(function () {
		component.render();
	});

	component2 = new MovieListCompenent();
	component2.fetchAll().then(function () {
		component2.render();
	});

	component3 = new TeamListCompenent();
	component3.fetchAll().then(function () {
		component3.render();
	});

}

//25ms after
$(document).ready(function () {
	application();
});