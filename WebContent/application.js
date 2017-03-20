
let component;

function application() {
	component = new HeroListCompenent();
    component.fetchAll().then(function (heroes) {
		component.render();
	});
}

//25ms after
$(document).ready(function(){
	application();
});