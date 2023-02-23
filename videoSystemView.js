import VideoSystem from "./videoSystemModel.js";

//MVC - VISTA
class VideoSystemView {

  totalWindows = [];

  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  constructor() {
    this.main = $('main');
    this.menu = $('.navbar-nav');
    this.categories = $('#categories');
    this.productionWindow = null;
  }

  init(Categories, RandomProductions) {

    this.main.empty();

    let title = $(`<h1 id="categories-title">CATEGORÍAS</h1>`);

    this.main.append(title);

    //Para cargar las categorías iniciales
    let container = $(`<div id="categories" class="card-group">
        </div>`);
    for (let category of Categories) {
      let div = $(`<div class="card mt-3">
          <a data-category="${category.name}" href="#">
            <img src="${category.image}" class="card-img-top" alt="${category.name}">
            <div class="card-body">
              <h5 class="card-title">${category.name}</h5>
              </a>
              <p class="card-text">${category.description}.</p>
            </div>
          </div>`);
      container.append(div);
    }

    this.main.append(container);

    let title2 = $(`<h4 id="producciones-title">PRODUCCIONES</h4>`);

    this.main.append(title2);

    //Para cargar las 3 producciones aleatorias iniciales
    let container2 = $(`<div id="productions" class="card-group">
      </div>`);
    for (let production of RandomProductions) {
      let div2 = $(`<div class="card">
      <a data-production="${production.title}" href="#">
          <img src="${production.image}" class="card-img-top" alt="${production.title}">
          <div class="card-body">
            <h5 class="card-title">${production.title}</h5>
      </a>
            <p class="card-text">${production.synopsis}.</p>
          </div>
        </div>`);
      container2.append(div2);
    }

    this.main.append(container2);

    //let botonCerrar = $(`<button class="btn btn-primary text-uppercase m-2 px4" onClick="closeAll()">Cerrar todas las ventanas</button>)`);

    //this.main.append(botonCerrar);

  }

  //Actores en el menú
  showActorsInMenu(Actors) {
    let li = $(`<li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" id="navActors" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Actores
      </a>
      </li>`);
    let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
    //if (!category.done) shopping
    for (let actor of Actors) {
      container.append(`<a data-actor="${actor.name}"
      class="dropdown-item" href="#">${actor.name} ${actor.lastname1} ${actor.lastname2}</a>`);
    }
    li.append(container);
    this.menu.append(li);
  }

  //Directores en el menú
  showDirectorsInMenu(Directors) {
    let li = $(`<li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" id="navDirectors" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Directores
      </a>
      </li>`);
    let container = $('<div class="dropdown-menu" aria-labelledby="navDirs"></div>');
    //if (!category.done) shopping
    for (let director of Directors) {
      container.append(`<a data-director="${director.name}"
      class="dropdown-item" href="#">${director.name} ${director.lastname1} ${director.lastname2}</a>`);
    }
    li.append(container);
    this.menu.append(li);
  }

  //Categorías en el menu
  showCategoriesInMenu(Categories) {
    let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navCategories" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categorías
        </a>
        </li>`);
    let container = $('<div class="dropdown-menu" aria-labelledby="navActs"></div>');
    //if (!category.done) shopping
    for (let category of Categories) {
      container.append(`<a data-category="${category.name}"
        class="dropdown-item" id="item-category" href="#">${category.name}</a>`);
    }
    li.append(container);
    this.menu.append(li);
  }

  //PRODUCCIONES DE CADA CATEGORIA -------------------------------------------->
  listProductions(productions, category) {

    this.main.empty();

    let title = $(`<h1 id="pro-title-cat">Producciones de ${category.name}</h1>`);

    this.main.append(title);

    let container = $(`<div id="productions-cat" class="card-group">
    </div>`);
    let production = productions.next();
    while (!production.done) {
      let div = $(`<div class="card">
      <a data-production="${production.value.title}" href="#">
          <img src="${production.value.image}" class="card-img-top" alt="${production.value.title}">
          <div class="card-body">
            <h5 class="card-title">${production.value.title}</h5>
            </a>
            <p class="card-text">${production.value.synopsis}.</p>
          </div>
        </div>`);
      container.append(div);
      production = productions.next();
    }

    this.main.append(container);

  }

  //Los bind para el click en las categorías o en el menú de navegación
  bindProductionsCategoryList(handler) {
		$('#categories').find('a').click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#pro-title-cat',
				{action: 'productionsCategoryList', category: category},
				'#categories', event
			);
		});
  }
  bindProductionsCategoryListInMenu(handler) {
		$('#navCategories').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#pro-title-cat',
				{action: 'productionsCategoryList', category: category},
				'#navCategories', event
			);
		});
  }

  //INFO Y PRODUCCIONES DE CADA ACTOR -------------------------------------------->
  actorInfo(productions, actor) {

    this.main.empty();

    let container2 = $(`<div id="act-info" class="card-group">
    <div class="card">
      <img src="${actor.picture}" class="card-img-top" alt="${actor.name}">
      <div class="card-body">
        <h5 class="card-title">${actor.name} ${actor.lastname1} ${actor.lastname2}</h5>
        <p class="card-text">${actor.born}.</p>
      </div>
    </div>
    </div>`);

    this.main.append(container2);

    let title = $(`<h1 id="pro-title-act">Producciones</h1>`);

    this.main.append(title);


    let container = $(`<div id="productions-act" class="card-group">
      </div>`);
    let production = productions.next();
    while (!production.done) {
      let div = $(`<div class="card">
      <a data-production="${production.value.title}" href="#">
            <img src="${production.value.image}" class="card-img-top" alt="${production.value.title}">
            <div class="card-body">
              <h5 class="card-title">${production.value.title}</h5>
              </a>
              <p class="card-text">${production.value.synopsis}.</p>
            </div>
          </div>`);
      container.append(div);
      production = productions.next();
    }

    this.main.append(container);

  }

  //Bind para el click en los actores del menú de navegación
  bindProductionsActorListInMenu(handler) {
		$('#navActors').next().children().click((event) => {
			let actor = $(event.target).closest($('a')).get(0).dataset.actor;
			this.#excecuteHandler(
				handler, [actor],
				'#act-info',
				{action: 'productionsActorList', actor: actor},
				'#navActors', event
			);
		});
  }


  //INFO Y PRODUCCIONES DE CADA DIRECTOR -------------------------------------------->
  directorInfo(productions, director) {

    this.main.empty();

    let container2 = $(`<div id="dir-info" class="card-group">
    <div class="card">
      <img src="${director.picture}" class="card-img-top" alt="${director.name}">
      <div class="card-body">
        <h5 class="card-title">${director.name} ${director.lastname1} ${director.lastname2}</h5>
        <p class="card-text">${director.born}.</p>
      </div>
    </div>
    </div>`);

    this.main.append(container2);

    let title = $(`<h1 id="pro-title-dir">Producciones</h1>`);

    this.main.append(title);

    let container = $(`<div id="productions-dir" class="card-group">
        </div>`);
    let production = productions.next();
    while (!production.done) {
      let div = $(`<div class="card">
      <a data-production="${production.value.title}" href="#">
              <img src="${production.value.image}" class="card-img-top" alt="${production.value.title}">
              <div class="card-body">
                <h5 class="card-title">${production.value.title}</h5>
                </a>
                <p class="card-text">${production.value.synopsis}.</p>
              </div>
            </div>`);
      container.append(div);
      production = productions.next();
    }

    this.main.append(container);

  }

  //Bind para el click de los directores en el menú de navegación
  bindProductionsDirectorListInMenu(handler) {
		$('#navDirectors').next().children().click((event) => {
			let director = $(event.target).closest($('a')).get(0).dataset.director;
			this.#excecuteHandler(
				handler, [director],
				'#dir-info',
				{action: 'productionsDirectorList', director: director},
				'#navDirectors', event
			);
		});
  }

  //INFO, ACTORES Y DIRECTORES DE CADA PRODUCCION -------------------------------------------->
  productionInfo(production, actors, directors) {

    this.main.empty();

    let container = $(`<div id="production-info" class="card-group">
        <div class="card">
            <img src="${production.image}" class="card-img-top productionI" alt="${production.title}">
            <div class="card-body">
              <h5 class="card-title">${production.title}</h5>
              <p class="card-synopsis">${production.synopsis}.</p>
              <p class="card-nationality">${production.nationality}.</p>
              <p class="card-publication">Publicación: ${production.publication}.</p>
            </div>
          </div>
          </div>
          <div class="cart mt-4 d-flex align-items-center justify-content-center">
          <button id="p-open" data-title="${production.title}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
          </div>`);

    this.main.append(container);

    let title = $(`<h1 id="pro-title-directors">Director</h1>`);

    this.main.append(title);

    let container2 = $(`<div id="production-directors" class="card-group">
    </div>`);
    let director = directors.next();
    while (!director.done) {
      let div = $(`<div class="card">
      <a data-director="${director.value.name}" href="#">
          <img src="${director.value.picture}" class="card-img-top directoresI" alt="${director.value.name}">
          <div class="card-body">
            <h5 class="card-title">${director.value.name} ${director.value.lastname1} ${director.value.lastname2}</h5>
            </a>
          </div>
        </div>`);
      container2.append(div);
      director = directors.next();
    }

    this.main.append(container2);

    let title2 = $(`<h1 id="pro-title-actors">Actores</h1>`);

    this.main.append(title2);

    let container3 = $(`<div id="production-actors" class="card-group">
        </div>`);
    let actor = actors.next();
    while (!actor.done) {
      let div = $(`<div class="card">
      <a data-actor="${actor.value.name}" href="#">
              <img src="${actor.value.picture}" class="card-img-top actoresI" alt="${actor.value.name}">
              <div class="card-body">
                <h5 class="card-title">${actor.value.name} ${actor.value.lastname1} ${actor.value.lastname2}</h5>
                </a>
              </div>
            </div>`);
      container3.append(div);
      actor = actors.next();
    }

    this.main.append(container3);

  }

  //Bind para el click en las producciones por toda la página
  bindProductionInfo(handler) {
		$('#productions').find('a').click((event) => {
			let production = $(event.target).closest($('a')).get(0).dataset.production;
			this.#excecuteHandler(
				handler, [production],
				'#production-info',
				{action: 'productionInfo', production: production},
				'#productions', event
			);
		});
		$('#productions-cat').find('a').click((event) => {
			let production = $(event.target).closest($('a')).get(0).dataset.production;
			this.#excecuteHandler(
				handler, [production],
				'#production-info',
				{action: 'productionInfo', production: production},
				'#productions-cat', event
			);
		});
		$('#productions-act').find('a').click((event) => {
			let production = $(event.target).closest($('a')).get(0).dataset.production;
			this.#excecuteHandler(
				handler, [production],
				'#production-info',
				{action: 'productionInfo', production: production},
				'#productions-act', event
			);
		});
		$('#productions-dir').find('a').click((event) => {
			let production = $(event.target).closest($('a')).get(0).dataset.production;
			this.#excecuteHandler(
				handler, [production],
				'#production-info',
				{action: 'productionInfo', production: production},
				'#productions-dir', event
			);
		});
  }


  //INFO, ACTORES Y DIRECTORES DE CADA PRODUCCION EN UNA VENTANA NUEVA -------------------------------------------->
  productionInfoInNewWindow(production, actors, directors) {

    let main = $(this.productionWindow.document).find('main');
    let header = $(this.productionWindow.document).find('header nav');

    main.empty();
    header.empty();

    this.productionWindow.document.title = `${production.title}`;

    header.append(`<h1 data-title="${production.title}" class="display5">${production.title}</h1>`);

    let container = $(`<div id="production-info" class="card-group">
    <div class="card">
        <img src="${production.image}" class="card-img-top productionI" alt="${production.title}">
        <div class="card-body">
          <h5 class="card-title">${production.title}</h5>
          <p class="card-text">${production.synopsis}.</p>
          <p class="card-nationality">${production.nationality}.</p>
          <p class="card-publication">Publicación: ${production.publication}.</p>
        </div>
      </div>
      </div>
      </div>`);

    main.append(container);

    let title = $(`<h1 id="pro-title-directors">Director</h1>`);

    main.append(title);

    let container2 = $(`<div id="production-directors" class="card-group">
    </div>`);
    let director = directors.next();
    while (!director.done) {
      let div = $(`<div class="card">
      <img src="${director.value.picture}" class="card-img-top directoresI" alt="${director.value.name}">
      <div class="card-body">
        <h5 class="card-title">${director.value.name} ${director.value.lastname1} ${director.value.lastname2}</h5>
      </div>
    </div>`);
      container2.append(div);
      director = directors.next();
    }

    main.append(container2);

    let title2 = $(`<h1 id="pro-title-actors">Actores</h1>`);

    main.append(title2);

    let container3 = $(`<div id="production-actors" class="card-group">
    </div>`);
    let actor = actors.next();
    while (!actor.done) {
      let div = $(`<div class="card">
          <img src="${actor.value.picture}" class="card-img-top actoresI" alt="${actor.value.name}">
          <div class="card-body">
            <h5 class="card-title">${actor.value.name} ${actor.value.lastname1} ${actor.value.lastname2}</h5>
          </div>
        </div>`);
      container3.append(div);
      actor = actors.next();
    }

    main.append(container3);

    let cerrar = $(`<div class="cart mt-4 d-flex align-items-center justify-content-center">
      <button class="btn btn-primary text-uppercase m-2 px4" onClick="window.close()">Cerrar Ventana</button>
    </div>`);

    main.append(cerrar);

    this.productionWindow.document.body.scrollIntoView();

  }

  bindShowProductionInNewWindow(handler) {
    $('#p-open').click((event) => {
      if (!this.productionWindow || this.productionWindow.closed) {
        this.productionWindow = window.open("production.html", event.target.dataset.title,
          "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar = no, location = no");

        this.productionWindow.addEventListener('DOMContentLoaded', () => {
          handler(event.target.dataset.title)
        });

        this.totalWindows.push(this.productionWindow);
        console.log(this.totalWindows);

      } else {
        if ($(this.productionWindow.document).find('header nav h1').get(0).dataset.title !== event.target.dataset.title) {
          console.log($(this.productionWindow.document).find('header nav h1').get(0).dataset.title);
          console.log(event.target.dataset.title);
          this.productionWindow = window.open("production.html", event.target.dataset.title,
          "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar = no, location = no");

        this.productionWindow.addEventListener('DOMContentLoaded', () => {
          handler(event.target.dataset.title)
        });
        }
        this.productionWindow.focus();

        this.totalWindows.push(this.productionWindow);
        console.log(this.totalWindows);
      }
    });
  }

  bindCloseAllWindows(handler) {
    $('#cerrarTodo').click(() => {
      handler();
    });
  }



  //Bind para el click en los actores fuera del menú de navegación
  bindProductionsActorListOutsideMenu(handler) {
		$('#production-actors').find('a').click((event) => {
			let actor = $(event.target).closest($('a')).get(0).dataset.actor;
			this.#excecuteHandler(
				handler, [actor],
				'#act-info',
				{action: 'ActorOutsideMenu', actor: actor},
				'#production-actors', event
			);
		});
  }

  //Bind para el click en los directores fuera del menú de navegación
  bindProductionsDirectorListOutsideMenu(handler) {
    $('#production-directors').find('a').click(function (event) {
      handler(this.dataset.director);
    });
  }


  //Para la funcionalidad del logo y del botón de inicio del menú de navegación
  bindInit(handler) {
    $('#init').click((event) => {
      this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
    });
    $('#logo').click((event) => {
      this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
    });
  }


}

export default VideoSystemView;