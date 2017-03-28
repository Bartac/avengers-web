import {HeroListCompenent} from './heroes'

let component;

function application() {

	component = new HeroListCompenent();
	component.fetchAll().then(function () {
		component.render();
	});
}

//25ms after
$(document).ready(function () {
	application();
});