import VideoSystem from "./videoSystemModel.js";
import {
  showFeedBack, defaultCheckElement, newCategoryValidation, removeCategoryValidation, newPersonValidation, removePersonValidation,
  newAssignDeassignValidation, newProductionValidation, removeProductionValidation
} from "./validation.js";

//MVC - VISTA
class VideoSystemView {

  totalWindows = [];

  //Handle para el history
  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    try {
      handler(...handlerArguments);
      $(scrollElement).get(0).scrollIntoView();
      history.pushState(data, null, url);
      event.preventDefault();
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    this.main = $('main');
    this.menu = $('.navbar-nav');
    this.categories = $('#categories');
    this.productionWindow = null;
  }

  //Init que se ejecutara al darle a inicio
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
    let link = $('#navActors');

    let container;
    if (link.length === 1) {
      container = link.next();
      container.children().remove();
      link.parent().append(container);
    } else {
      container = $('<div class="dropdown-menu" aria-labelledby="navActors"></div>');
      let li = $(`<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navActors" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Actores
				</a>
			</li>`);
      li.append(container);
      this.menu.append(li);
    }

    for (let actor of Actors) {
      container.append(`<a data-actor="${actor.name}" class="dropdown-item" id="item-actor" href="#">${actor.name} ${actor.lastname1} ${actor.lastname2}</a>`);
    }


  }

  //Directores en el menú
  showDirectorsInMenu(Directors) {
    let link = $('#navDirectors');

    let container;
    if (link.length === 1) {
      container = link.next();
      container.children().remove();
      link.parent().append(container);
    } else {
      container = $('<div class="dropdown-menu" aria-labelledby="navDirectors"></div>');
      let li = $(`<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navDirectors" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Directores
				</a>
			</li>`);
      li.append(container);
      this.menu.append(li);
    }

    for (let director of Directors) {
      container.append(`<a data-director="${director.name}" class="dropdown-item" id="item-actor" href="#">${director.name} ${director.lastname1} ${director.lastname2}</a>`);
    }
  }

  //Categorías en el menu
  showCategoriesInMenu(Categories) {

    let link = $('#navCategories');

    let container;
    if (link.length === 1) {
      container = link.next();
      container.children().remove();
      link.parent().append(container);
    } else {
      container = $('<div class="dropdown-menu" aria-labelledby="navActs"></div>');
      let li = $(`<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navCategories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Categorías
				</a>
			</li>`);
      li.append(container);
      this.menu.append(li);
    }

    for (let category of Categories) {
      container.append(`<a data-category="${category.name}" class="dropdown-item" id="item-category" href="#">${category.name}</a>`);
    }
  }

  //Para mostrar el panel de administradción en el menú
  showAdministrationMenu() {
    let li = $(`<li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navAdmin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Administración
      </a>
      </li>`);

    let container = $(`<div class="dropdown-menu" arialabelledby="navAdmin">
      <a id="newCategory" class="dropdown-item" href="#new-category">Crear categoría</a>
      <a id="delCategory" class="dropdown-item" href="#remove-category">Eliminar categoría</a>
      <a id="newProduction" class="dropdown-item" href="#new-production">Crear producción</a>
      <a id="delProduction" class="dropdown-item" href="#remove-production">Eliminar producción</a>
      <a id="newPerson" class="dropdown-item" href="#new-person">Crear persona</a>
      <a id="delPerson" class="dropdown-item" href="#remove-person">Eliminar persona</a>
      <a id="assignDeassign" class="dropdown-item" href="#assign-deassign">Asignar/Deasignar actores/directores</a>
      </div>`);

    li.append(container);

    this.menu.append(li);
  }


  //Para mostrar el formulario de nueva categoría
  showNewCategoryForm() {
    this.main.empty();

    let container = $(`<div id="new-category" class="container my-3">
      <h1 class="display-5">Nueva categoría</h1>
      <form name="fNewCategory" role="form" novalidate>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="ncTitle">Título *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El título es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="ncUrl">URL *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="urlPrepend"><i
      class="fas fa-image"></i></span>
      </div>
      <input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="http://www.imagen.es"
      aria-describedby="urlPrepend" value="" required>
      <div class="invalid-feedback">La URL no es válida.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-12 mb-3">
      <label for="ncDescription">Descripción</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="descPrepend"><i class="fas fa-align-left"></i></span>
      </div>
      <input type="text" class="form-control" id="ncDescription" name="ncDescription"
      aria-describedby="descPrepend" value="" required>
      <div class="invalid-feedback"></div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
      </form>
      </div>
      </div>`);
    this.main.append(container);
  }

  //Bind para las nuevas categorías
  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  //Modal que avisa de la creación de una nueva categoría
  showNewCategoryModal(done, cat, error) {
    $(document.fNewCategory).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${cat.name}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let newCategoryModal = $('#newCategoryModal');
      newCategoryModal.modal('show');
      newCategoryModal.find('button').click(() => {
        newCategoryModal.on('hidden.bs.modal', function (event) {
          document.fNewCategory.reset();
          document.fNewCategory.ncTitle.focus();
          this.remove();
        });
        newCategoryModal.modal('hide');
      })
    } else {
      $(document.fNewCategory).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`);
    }
  }


  //Para mostrar el form de borrar categoría
  showRemoveCategoryForm() {

    this.main.empty();

    let container = $(`<div id="remove-category" class="container my-3">
    <h1 class="display-5">Borrar categoría</h1>
    <form name="fremoveCategory" role="form" novalidate>
    <div class="form-row">
    <div class="col-md-6 mb-3">
    <label for="rcTitle">Título de la Categoría *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
    </div>
    <input type="text" class="form-control" id="rcTitle" name="rcTitle" placeholder="Título de la producción"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El título es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <button class="btn btn-primary" type="submit">Enviar</button>
    <button class="btn btn-primary" type="reset">Cancelar</button>
    </form>
    </div>
    </div>`);
    this.main.append(container);
  }

  //Bind para borrar las categorías
  bindRemoveCategoryForm(handler) {
    removeCategoryValidation(handler);
  }


  //Modal que manuncia el borrado de las categorías
  showRemoveCategoryModal(done, cat, error) {
    $('remove-category').find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removeCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${cat.name}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let removeCategoryModal = $('#removeCategoryModal');
      removeCategoryModal.modal('show');
      removeCategoryModal.find('button').click(() => {
        removeCategoryModal.on('hidden.bs.modal', function (event) {
          document.fremoveCategory.reset();
          document.fremoveCategory.rcTitle.focus();
          this.remove();
        });
        removeCategoryModal.modal('hide');
      })
    } else {
      $('#removeCategoryModal').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> no existe.</div>`);
    }
  }

  //Para mostrar el formulario de nuevas personas
  showNewPersonForm() {
    this.main.empty();

    let container = $(`<div id="new-person" class="container my-3">
      <h1 class="display-5">Nueva persona</h1>
      <form name="fNewPerson" role="form" novalidate>
      <div class="form-row">

      <label for="npRole">Tipo de persona *</label>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="npRole" id="npRole1">
      <label class="form-check-label" for="npRole1">
        Actor
      </label>
      </div>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="npRole" id="npRole2">
      <label class="form-check-label" for="npRole2">
        Director
      </label>
      </div>

      <div class="col-md-6 mb-3">
      <label for="npName">Nombre *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
      </div>
      <input type="text" class="form-control" id="npName" name="npName" placeholder="Nombre de la persona"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El nombre es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="npLastname1">Apellido 1 *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
      </div>
      <input type="text" class="form-control" id="npLastname1" name="npLastname1" placeholder="Primer apellido"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El primer apellido es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="npLastname2">Apellido 2 *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
      </div>
      <input type="text" class="form-control" id="npLastname2" name="npLastname2" placeholder="Segundo apellido"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El segundo apellido es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="npBorn">Fecha nacimiento *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-regular fa-calendar-days"></i></span>
      </div>
      <input type="date" class="form-control" id="npBorn" name="npBorn"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">La fecha de nacimiento es obligatoria.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-12 mb-3">
      <label for="npUrl">URL *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="urlPrepend"><i
      class="fas fa-image"></i></span>
      </div>
      <input type="url" class="form-control" id="npUrl" name="npUrl" placeholder="http://www.imagen.es"
      aria-describedby="urlPrepend" value="" required>
      <div class="invalid-feedback">La URL no es válida.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
      </form>
      </div>
      </div>`);
    this.main.append(container);
  }


  //Bind para la creación de nuevas personas
  bindNewPersonForm(handler) {
    newPersonValidation(handler);
  }

  //Modal que anuncia la creación de nuevas personas
  showNewPersonModal(done, per, error) {
    $(document.fNewPerson).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newPersonModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newPersonModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newPersonModalLabel">Persona creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La persona <strong>${per.name} ${per.lastname1} ${per.lastname2}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let newPersonModal = $('#newPersonModal');
      newPersonModal.modal('show');
      newPersonModal.find('button').click(() => {
        newPersonModal.on('hidden.bs.modal', function (event) {
          document.fNewPerson.reset();
          document.fNewPerson.npName.focus();
          this.remove();
        });
        newPersonModal.modal('hide');
      })
    } else {
      $(document.fNewPerson).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${per.name} ${per.lastname1} ${per.lastname2}</strong> ya está creada.</div>`);
    }
  }

  //Para mostrar el formulario de borrado de personas
  showRemovePersonForm() {

    this.main.empty();

    let container = $(`<div id="remove-person" class="container my-3">
    <h1 class="display-5">Borrar persona</h1>
    <form name="fremovePerson" role="form" novalidate>
    <div class="form-row">

    <label for="rpType">Borrar actor o director *</label>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="rpType" id="rpType1">
    <label class="form-check-label" for="rpType1">
      Actor
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="rpType" id="rpType2">
    <label class="form-check-label" for="rpType2">
      Director
    </label>
    </div>

    <div class="col-md-6 mb-3">
    <label for="rpName">Nombre *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
    </div>
    <input type="text" class="form-control" id="rpName" name="rpName" placeholder="Nombre de la persona"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El nombre es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <button class="btn btn-primary" type="submit">Enviar</button>
    <button class="btn btn-primary" type="reset">Cancelar</button>
    </form>
    </div>
    </div>`);
    this.main.append(container);
  }

  //Bind para el borrado de personas
  bindRemovePersonForm(handler) {
    removePersonValidation(handler);
  }

  //Modal que anuncia el borrado de personas
  showRemovePersonModal(done, per, error) {
    $('remove-person').find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removePersonModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removePersonModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removePersonModalLabel">Persona eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La persona <strong>${per.name} ${per.lastname1} ${per.lastname2}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let removePersonModal = $('#removePersonModal');
      removePersonModal.modal('show');
      removePersonModal.find('button').click(() => {
        removePersonModal.on('hidden.bs.modal', function (event) {
          document.fremovePerson.reset();
          document.fremovePerson.rpName.focus();
          this.remove();
        });
        removePersonModal.modal('hide');
      })
    } else {
      $('#removePersonModal').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${per.name} ${per.lastname1} ${per.lastname2}</strong> no existe.</div>`);
    }
  }


  //Formulario para asignar o desasignar actor y director a una producción
  ShowNewAssignDeassignForm() {
    this.main.empty();

    let container = $(`<div id="assign-deassign" class="container my-3">
      <h1 class="display-5">Asignar/Desasignar actores y directores</h1>
      <form name="fnewAssignDeassign" role="form" novalidate>
      <div class="form-row">

      <label for="nadType">Tipo de operación *</label>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="nadType" id="nadType1">
      <label class="form-check-label" for="nadType1">
        Asignar
      </label>
      </div>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="nadType" id="nadType2">
      <label class="form-check-label" for="nadType2">
        Desasignar
      </label>
      </div>

      <div class="col-md-6 mb-3">
      <label for="nadTitle">Nombre de la Producción *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="text" class="form-control" id="nadTitle" name="nadTitle" placeholder="Nombre de la producción"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El título es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="nadActor">Nombre del Actor *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
      </div>
      <input type="text" class="form-control" id="nadActor" name="nadActor" placeholder="Actor"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El nombre del actor es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="nadDirector">Nombre del Director *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
      </div>
      <input type="text" class="form-control" id="nadDirector" name="nadDirector" placeholder="Director"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El nombre del director es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
      </form>
      </div>
      </div>`);
    this.main.append(container);
  }

  //Bind para asignar o desasignar actores y directores a una producción
  bindNewAssignDeassignForm(handler) {
    newAssignDeassignValidation(handler);
  }

  //Modal que anuncia la asignación o desasignación de actores y directores a una producción
  showNewAssignDeassignModal(done, act, dir, pro, error) {
    $(document.fAssignDeassign).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newAssignDeassignModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newAssignDeassignModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newAssignDeassignModalLabel">Asignación/Desasignación realizada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							A la producción <strong>${pro.title}</strong> se le ha asignado/deasignado correctamente el actor <strong>${act.name}</strong> y el director <strong>${dir.name}</strong>.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let newAssignDeassignModal = $('#newAssignDeassignModal');
      newAssignDeassignModal.modal('show');
      newAssignDeassignModal.find('button').click(() => {
        newAssignDeassignModal.on('hidden.bs.modal', function (event) {
          document.fnewAssignDeassign.reset();
          document.fnewAssignDeassign.nadTitle.focus();
          this.remove();
        });
        newAssignDeassignModal.modal('hide');
      })
    }
  }

  //Para mostrar el formulario de creación de nuevas producciones
  showNewProductionForm() {
    this.main.empty();

    let container = $(`<div id="new-production" class="container my-3">
    <h1 class="display-5">Nueva producción</h1>
    <form name="fnewProduction" role="form" novalidate>
    <div class="form-row">

    <label for="nproType">Tipo de producción *</label>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="nproType" id="nproType1">
    <label class="form-check-label" for="nproType1">
      Película
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="nproType" id="nproType2">
    <label class="form-check-label" for="nproType2">
      Serie
    </label>
    </div>

    <div class="col-md-6 mb-3">
    <label for="nproTitle">Título de la Producción *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
    </div>
    <input type="text" class="form-control" id="nproTitle" name="nproTitle" placeholder="Título de la producción"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El título es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    <div class="col-md-6 mb-3">
    <label for="nproNationality">Nacionalidad *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-earth-americas"></i></span>
    </div>
    <input type="text" class="form-control" id="nproNationality" name="nproNationality" placeholder="Nacionalidad"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">La nacionalidad es obligatoria.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <div class="form-row">
    <div class="col-md-6 mb-3">
    <label for="nproPublication">Fecha de estreno *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-regular fa-calendar-days"></i></span>
    </div>
    <input type="date" class="form-control" id="nproPublication" name="nproPublication"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">La fecha de estreno es obligatoria.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    <div class="col-md-6 mb-3">
    <label for="nproSynopsis">Sinopsis *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fas fa-align-left"></i></span>
    </div>
    <input type="text" class="form-control" id="nproSynopsis" name="nproSynopsis" placeholder="Sinopsis"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">La sinopsis es obligatoria.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <div class="form-row">
    <div class="col-md-12 mb-3">
    <label for="nproUrl">URL *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="urlPrepend"><i
    class="fas fa-image"></i></span>
    </div>
    <input type="url" class="form-control" id="nproUrl" name="nproUrl" placeholder="http://www.imagen.es"
    aria-describedby="urlPrepend" value="" required>
    <div class="invalid-feedback">La URL no es válida.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <div class="form-row">
    <div class="col-md-6 mb-3">
    <label for="nproDirector">Director *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
    </div>
    <input type="text" class="form-control" id="nproDirector" name="nproDirector" placeholder="Nombre del director"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El director es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    <div class="col-md-6 mb-3">
    <label for="nproActor1">Actor 1 *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
    </div>
    <input type="text" class="form-control" id="nproActor1" name="nproActor1" placeholder="Nombre del actor 1"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El actor 1 es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <div class="form-row">
    <div class="col-md-6 mb-3">
    <label for="nproActor2">Actor 2 *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fa-solid fa-person"></i></span>
    </div>
    <input type="text" class="form-control" id="nproActor2" name="nproActor2" placeholder="Nombre del actor 2"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El actor 2 es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    <div class="col-md-6 mb-3">
    <label for="nproCategory">Categoría *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
    </div>
    <input type="text" class="form-control" id="nproCategory" name="nproCategory" placeholder="Nombre de la categoría a la que pertenece"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">La categoría es obligatoria.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <button class="btn btn-primary" type="submit">Enviar</button>
    <button class="btn btn-primary" type="reset">Cancelar</button>
    </form>
    </div>
    </div>`);
    this.main.append(container);
  }

  //Bind para la creación de nuevas producciones
  bindNewProductionForm(handler) {
    newProductionValidation(handler);
  }

  //Modal que anuncia la creación de nuevas producciones
  showNewProductionModal(done, pro, error) {
    $(document.fnewProduction).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newProductionModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newProductionModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newProductionModalLabel">Producción creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La producción <strong>${pro.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let newProductionModal = $('#newProductionModal');
      newProductionModal.modal('show');
      newProductionModal.find('button').click(() => {
        newProductionModal.on('hidden.bs.modal', function (event) {
          document.fnewProduction.reset();
          document.fnewProduction.nproTitle.focus();
          this.remove();
        });
        newProductionModal.modal('hide');
      })
    } else {
      $(document.fnewProduction).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La producción <strong>${pro.title}</strong> ya está creada.</div>`);
    }
  }

  //Para mostrar el formulario de borrado de producciones
  showRemoveProductionForm() {
    this.main.empty();

    let container = $(`<div id="remove-production" class="container my-3">
    <h1 class="display-5">Borrar producción</h1>
    <form name="fremoveProduction" role="form" novalidate>
    <div class="form-row">
    <div class="col-md-6 mb-3">
    <label for="rproTitle">Título de la Producción *</label>
    <div class="input-group">
    <div class="input-group-prepend">
    <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
    </div>
    <input type="text" class="form-control" id="rproTitle" name="rproTitle" placeholder="Título de la producción"
    aria-describedby="titlePrepend" value="" required>
    <div class="invalid-feedback">El título es obligatorio.</div>
    <div class="valid-feedback">Correcto.</div>
    </div>
    </div>
    </div>
    <button class="btn btn-primary" type="submit">Enviar</button>
    <button class="btn btn-primary" type="reset">Cancelar</button>
    </form>
    </div>
    </div>`);
    this.main.append(container);
  }

  //Bind para el borrado de producciones
  bindRemoveProductionForm(handler) {
    removeProductionValidation(handler);
  }

  //Modal que anuncia el borrado de producciones
  showRemoveProductionModal(done, pro, error) {
    $(document.fAssignDeassign).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removeProductionModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeProductionModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeProductionModalLabel">Asignación/Desasignación realizada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La producción <strong>${pro.title}</strong> ha sido eliminada correctamente.</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $('body').append(modal);
      let removeProductionModal = $('#removeProductionModal');
      removeProductionModal.modal('show');
      removeProductionModal.find('button').click(() => {
        removeProductionModal.on('hidden.bs.modal', function (event) {
          document.fremoveProduction.reset();
          document.fremoveProduction.rproTitle.focus();
          this.remove();
        });
        removeProductionModal.modal('hide');
      })
    }
  }


  //Para controlar la navegación en el apartado de administración del menú
  bindAdministrationMenu(hNewCategory, hRemoveCategory, hNewPerson, hRemovePerson, hAssignDeassign, hNewProduction, hRemoveProduction) {
    $('#newCategory').click((event) => {
      this.#excecuteHandler(hNewCategory, [], '#new-category', { action: 'newCategory' }, '#', event);
    });
    $('#delCategory').click((event) => {
      this.#excecuteHandler(hRemoveCategory, [], '#remove-category', { action: 'removeCategory' }, '#', event);
    });
    $('#newPerson').click((event) => {
      this.#excecuteHandler(hNewPerson, [], '#new-person', { action: 'newPerson' }, '#', event);
    });
    $('#delPerson').click((event) => {
      this.#excecuteHandler(hRemovePerson, [], '#remove-person', { action: 'removePerson' }, '#', event);
    });
    $('#assignDeassign').click((event) => {
      this.#excecuteHandler(hAssignDeassign, [], '#assign-deassign', { action: 'assignActorsDirectors' }, '#', event);
    });
    $('#newProduction').click((event) => {
      this.#excecuteHandler(hNewProduction, [], '#new-production', { action: 'newProduction' }, '#', event);
    });
    $('#delProduction').click((event) => {
      this.#excecuteHandler(hRemoveProduction, [], '#remove-production', { action: 'removeProduction' }, '#', event);
    });
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
        { action: 'productionsCategoryList', category: category },
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
        { action: 'productionsCategoryList', category: category },
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
        { action: 'productionsActorList', actor: actor },
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
        { action: 'productionsDirectorList', director: director },
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
        { action: 'productionInfo', production: production },
        '#productions', event
      );
    });
    $('#productions-cat').find('a').click((event) => {
      let production = $(event.target).closest($('a')).get(0).dataset.production;
      this.#excecuteHandler(
        handler, [production],
        '#production-info',
        { action: 'productionInfo', production: production },
        '#productions-cat', event
      );
    });
    $('#productions-act').find('a').click((event) => {
      let production = $(event.target).closest($('a')).get(0).dataset.production;
      this.#excecuteHandler(
        handler, [production],
        '#production-info',
        { action: 'productionInfo', production: production },
        '#productions-act', event
      );
    });
    $('#productions-dir').find('a').click((event) => {
      let production = $(event.target).closest($('a')).get(0).dataset.production;
      this.#excecuteHandler(
        handler, [production],
        '#production-info',
        { action: 'productionInfo', production: production },
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

      } else {
        if ($(this.productionWindow.document).find('header nav h1').get(0).dataset.title !== event.target.dataset.title) {
          this.productionWindow = window.open("production.html", event.target.dataset.title,
            "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar = no, location = no");

          this.productionWindow.addEventListener('DOMContentLoaded', () => {
            handler(event.target.dataset.title)
          });
        }
        this.productionWindow.focus();

        this.totalWindows.push(this.productionWindow);
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
        { action: 'ActorOutsideMenu', actor: actor },
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

/*`<div id="new-production" class="container my-3">
      <h1 class="display-5">Nueva producción</h1>
      <form name="fnewProduction" role="form" novalidate>
      <div class="form-row">

      <label for="nproType">Tipo de producción *</label>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="nproType" id="nproType1">
      <label class="form-check-label" for="nproType1">
        Película
      </label>
      </div>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="nproType" id="nproType2">
      <label class="form-check-label" for="nproType2">
        Serie
      </label>
      </div>

      <div class="col-md-6 mb-3">
      <label for="nproTitle">Título de la Producción *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="text" class="form-control" id="nproTitle" name="nproTitle" placeholder="Título de la producción"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El título es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="nproNationality">Nacionalidad *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="text" class="form-control" id="nproNationality" name="nproNationality" placeholder="Nacionalidad"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">La nacionalidad es obligatoria.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="nproPublication">Fecha de estreno *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproPublication" name="nproPublication"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">La fecha de estreno es obligatoria.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="nproSynopsis">Sinopsis *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproSynopsis" name="nproSynopsis" placeholder="Sinopsis"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">La sinopsis es obligatoria.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-12 mb-3">
      <label for="nproUrl">URL *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="urlPrepend"><i
      class="fas fa-image"></i></span>
      </div>
      <input type="url" class="form-control" id="nproUrl" name="nproUrl" placeholder="http://www.imagen.es"
      aria-describedby="urlPrepend" value="" required>
      <div class="invalid-feedback">La URL no es válida.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="nproDirector">Director *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproDirector" name="nproDirector" placeholder="Nombre del director"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El director es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="nproActor1">Actor 1 *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproActor1" name="nproActor1" placeholder="Nombre del actor 1"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El actor 1 es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <div class="form-row">
      <div class="col-md-6 mb-3">
      <label for="nproActor2">Actor 2 *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproActor2" name="nproActor2" placeholder="Nombre del actor 2"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">El actor 2 es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      <div class="col-md-6 mb-3">
      <label for="nproCategory">Categoría *</label>
      <div class="input-group">
      <div class="input-group-prepend">
      <span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
      </div>
      <input type="date" class="form-control" id="nproCategory" name="nproCategory" placeholder="Nombre de la categoría a la que pertenece"
      aria-describedby="titlePrepend" value="" required>
      <div class="invalid-feedback">La categoría es obligatoria.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>
      </div>
      </div>
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
      </form>
      </div>
      </div>`*/