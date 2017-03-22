import {TeamListCompenent} from './teams'

let component3;


function application() {

	component3 = new TeamListCompenent();
	component3.fetchAll().then(function () {
		component3.render();
	});

}

//25ms after
$(document).ready(function () {
	application();
});