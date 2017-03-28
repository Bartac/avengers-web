/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = HeroListCompenent;
/* unused harmony export HeroItem */
let hero;

function HeroListCompenent() {

}

HeroListCompenent.prototype = {
    fetchAll: function () {
        return $.get('marvel/heroes')
            //.then(resp => resp.json(1))
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    hero = new HeroItem(data, this);
                    this.collection.push(hero);
                });
                return this.collection;
            });
    },
    render: function () {

        // Create Template
        const template = `<div class='hero'>
		<h1>Hero List</h1>
		<ul class='hero'>
		</ul>
			<form>
			Name: <input class='name' type="text" name="name" value=""></br>
			Real name: <input class='realname' type="text" name="realname" value=""></br>
			Team name: <input class='teamname' type="text" name="realname" value=""></br>
				<button class="create" type="button">Create</button></br>
			</form> 
		<footer> Some footer</footer>
		</div>`;

        //cached component element
        this.$el = $(template);
        console.log(this.$el);

        //Create button click
        const button = this.$el.find('button.create').on('click', evt => this.add());  // Fat arrow already binded to this

        // Render Hero data
        this.collection.forEach(hero => this.$el.find('ul.hero').append(hero.render()));

        // Add data to the body
        $('body').append(this.$el);
        return this.$el;

    },

    add: function () {
        // Recuperer les valeurs du formulaire
        const name = $('input.name').val();
        const real_name = $('input.realname').val();
        const team_name = $('input.teamname').val();

        const heroadded = { name, real_name, team_name };

        //Create les valeurs dans la base de données
        fetch('marvel/heroes',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(heroadded)
            })
            .then(resp => {
                // const item = new HeroItem(heroadded, this);
                //this.collection.push(item);

                //Add item to the end
                //this.$el.append(item.render());

                // Case 2 : Delete body and render all
                $('div.hero').remove();
                component.fetchAll().then(function () {
                    component.render();
                });
            });
    }

}

function HeroItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

HeroItem.prototype = {

    render() {

        // Create Template
        const template = `<li>
		Name : ${this.name} </br>
		Real name : ${this.real_name}</br>
		Team name : ${this.team_name}</br>
		<button class="delete" value="${this.id}">Delete ${this.name}</button>
		</li>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        const button = this.$el.find('button.delete').on('click', evt => this.remove());  // Fat arrow already binded to this
        return this.$el;


    },
    remove() {
        fetch('marvel/heroes/' + this.id, { method: 'delete' })
            .catch(error => application());

        // newsgtate
        component.collection = component.collection.filter(hero => hero.id !== this.id);
        console.log('Deleted :' + this.name);
        this.$el.remove();
    },

    renderC() {
        // Create Template
        const template = `<li>
        <input class='check' type="Checkbox" value="${this.id}">${this.name}</br>
		</li>`;

        // Element queryfied
        this.$el = $(template);
        console.log("Added " + this.name);
        return this.$el;
    },
    renderS() {

        // Create Template
        const template = `<option value="${this.id}">${this.name}</option>`;


        // Element queryfied
        this.$el = $(template);

        // Catch the button without readin all dom with find()
        return this.$el;


    }

}








/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroes__ = __webpack_require__(0);


let component;

function application() {

	component = new __WEBPACK_IMPORTED_MODULE_0__heroes__["a" /* HeroListCompenent */]();
	component.fetchAll().then(function () {
		component.render();
	});
}

//25ms after
$(document).ready(function () {
	application();
});

/***/ })
/******/ ]);