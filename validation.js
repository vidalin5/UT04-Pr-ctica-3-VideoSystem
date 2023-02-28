//Función para que nos muestre el feedback en los formularios
function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

//Función para checkear el valor de los elementos del form
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

//Función para validar los campos del form de nuevas categorías
function newCategoryValidation(handler) {
    let form = document.forms.fNewCategory;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        this.ncDescription.value = this.ncDescription.value.trim();
        showFeedBack($(this.ncDescription), true);

        if (!this.ncUrl.checkValidity()) {
            isValid = false;
            showFeedBack($(this.ncUrl), false);
            firstInvalidElement = this.ncUrl;
        } else {
            showFeedBack($(this.ncUrl), true);
        }

        if (!this.ncTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.ncTitle), false);
            firstInvalidElement = this.ncTitle;
        } else {
            showFeedBack($(this.ncTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ncTitle.value, this.ncUrl.value, this.ncDescription.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.ncTitle).change(defaultCheckElement);
    $(form.ncUrl).change(defaultCheckElement);
}

//Función para validar los campos del form de borrado de categorías
function removeCategoryValidation(handler) {

    let form = document.forms.fremoveCategory;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.rcTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.rcTitle), false);
            firstInvalidElement = this.rcTitle;
        } else {
            showFeedBack($(this.rcTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.rcTitle.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.rcTitle).change(defaultCheckElement);

}

//Función para validar los campos del form de nuevas personas
function newPersonValidation(handler) {

    let form = document.forms.fNewPerson;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.npUrl.checkValidity()) {
            isValid = false;
            showFeedBack($(this.npUrl), false);
            firstInvalidElement = this.npUrl;
        } else {
            showFeedBack($(this.npUrl), true);
        }

        let isActor = false;
        if (document.getElementById("npRole1").checked) {
            isActor = true;
        }

        let born = new Date(this.npBorn.value);

        if (!this.npLastname2.checkValidity()) {
            isValid = false;
            showFeedBack($(this.npLastname2), false);
            firstInvalidElement = this.npLastname2;
        } else {
            showFeedBack($(this.npLastname2), true);
        }

        if (!this.npLastname1.checkValidity()) {
            isValid = false;
            showFeedBack($(this.npLastname1), false);
            firstInvalidElement = this.npLastname1;
        } else {
            showFeedBack($(this.npLastname1), true);
        }

        if (!this.npName.checkValidity()) {
            isValid = false;
            showFeedBack($(this.npName), false);
            firstInvalidElement = this.npName;
        } else {
            showFeedBack($(this.npName), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.npName.value, this.npLastname1.value, this.npLastname2.value, born, this.npUrl.value, isActor);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.npUrl).change(defaultCheckElement);
    $(form.npLastname2).change(defaultCheckElement);
    $(form.npLastname1).change(defaultCheckElement);
    $(form.npName).change(defaultCheckElement);

}

//Función para validar los campos del form de borrado de personas
function removePersonValidation(handler) {

    let form = document.forms.fremovePerson;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let isActor = false;
        if (document.getElementById("rpType1").checked) {
            isActor = true;
        }

        if (!this.rpName.checkValidity()) {
            isValid = false;
            showFeedBack($(this.rpName), false);
            firstInvalidElement = this.rpName;
        } else {
            showFeedBack($(this.rpName), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.rpName.value, isActor);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.rpName).change(defaultCheckElement);

}

//Función para validar los campos del form de nuevas asignaciones/desasignaciones
function newAssignDeassignValidation(handler) {

    let form = document.forms.fnewAssignDeassign;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let isAssign = false;
        if (document.getElementById("nadType1").checked) {
            isAssign = true;
        }

        if (!this.nadDirector.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nadDirector), false);
            firstInvalidElement = this.nadDirector;
        } else {
            showFeedBack($(this.nadDirector), true);
        }

        if (!this.nadActor.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nadActor), false);
            firstInvalidElement = this.nadActor;
        } else {
            showFeedBack($(this.nadActor), true);
        }

        if (!this.nadTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nadTitle), false);
            firstInvalidElement = this.nadTitle;
        } else {
            showFeedBack($(this.nadTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.nadTitle.value, this.nadActor.value, this.nadDirector.value, isAssign);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.nadDirector).change(defaultCheckElement);
    $(form.nadActor).change(defaultCheckElement);
    $(form.nadTitle).change(defaultCheckElement);

}

//Función para validar los campos del form de nuevas producciones
function newProductionValidation(handler) {

    let form = document.forms.fnewProduction;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let isFilm = false;
        if (document.getElementById("nproType1").checked) {
            isFilm = true;
        }

        if (!this.nproCategory.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproCategory), false);
            firstInvalidElement = this.nproCategory;
        } else {
            showFeedBack($(this.nproCategory), true);
        }

        if (!this.nproActor2.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproActor2), false);
            firstInvalidElement = this.nproActor2;
        } else {
            showFeedBack($(this.nproActor2), true);
        }

        if (!this.nproActor1.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproActor1), false);
            firstInvalidElement = this.nproActor1;
        } else {
            showFeedBack($(this.nproActor1), true);
        }

        if (!this.nproDirector.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproDirector), false);
            firstInvalidElement = this.nproDirector;
        } else {
            showFeedBack($(this.nproDirector), true);
        }

        if (!this.nproUrl.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproUrl), false);
            firstInvalidElement = this.nproUrl;
        } else {
            showFeedBack($(this.nproUrl), true);
        }

        this.nproSynopsis.value = this.nproSynopsis.value.trim();
        showFeedBack($(this.nproSynopsis), true);

        let publication = new Date(this.nproPublication.value);

        if (!this.nproNationality.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproNationality), false);
            firstInvalidElement = this.nproNationality;
        } else {
            showFeedBack($(this.nproNationality), true);
        }

        if (!this.nproTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nproTitle), false);
            firstInvalidElement = this.nproTitle;
        } else {
            showFeedBack($(this.nproTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.nproTitle.value, this.nproNationality.value, publication, this.nproSynopsis.value, this.nproUrl.value,
                this.nproDirector.value, this.nproActor1.value, this.nproActor2.value, this.nproCategory.value, isFilm);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.nproCategory).change(defaultCheckElement);
    $(form.nproActor2).change(defaultCheckElement);
    $(form.nproActor1).change(defaultCheckElement);
    $(form.nproDirector).change(defaultCheckElement);
    $(form.nproUrl).change(defaultCheckElement);
    $(form.nproSynopsis).change(defaultCheckElement);
    $(form.nproPublication).change(defaultCheckElement);
    $(form.nproNationality).change(defaultCheckElement);
    $(form.nproTitle).change(defaultCheckElement);

}

//Función para validar los campos del form de borrado de producciones
function removeProductionValidation(handler) {

    let form = document.forms.fremoveProduction;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.rproTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.rproTitle), false);
            firstInvalidElement = this.rproTitle;
        } else {
            showFeedBack($(this.rproTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.rproTitle.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.rproTitle).change(defaultCheckElement);

}



export {showFeedBack, defaultCheckElement, newCategoryValidation, removeCategoryValidation, newPersonValidation, removePersonValidation, newAssignDeassignValidation, 
    newProductionValidation, removeProductionValidation};