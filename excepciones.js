//EXCEPCIONES

//Excepción base genérica
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción de acceso inválido al constructor. Extiende de BaseException
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("ERROR: El constructor no puede ser llamado como función.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

//Excepción de clase abstracta. Extiende de BaseException
class AbstractClassException extends BaseException {
    constructor(className, fileName, lineNumber) {
        super(`ERROR: La clase ${className} es abstracta.`, fileName, lineNumber);
        this.className = className;
        this.name = "AbstractClassException";
    }
}

//Excepción de valores vacíos. Extiende de BaseException
class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("ERROR: El parámetro " + param + " está vacío", fileName, lineNumber);
        this.name = "EmptyValueException";
        this.param = param;
    }
}

//Excepción de valores no válidos. Extiende de BaseException
class InvalidValueException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El parámetro ${param} tiene un valor no válido. (${param}: ${value})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "InvalidValueException";
    }
}

//Excepción genérica de VideoSystem. Extiende de BaseException
class VideoSystemException extends BaseException {
	constructor(message = "ERROR: Excepción genérica de VideoSystem.",fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "ImageManagerException";
	}
}

//Excepción de cursos que ya existen. Extiende de VideoSystem
class CategoryAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: La ${param} ya está registrada. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "CategoryAlreadyRegisteredException";
    }
}

//Excepción de cursos que no existen. Extiende de VideoSystem
class CategoryDoesntExistException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: La ${param} que intentas eliminar no existe. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "CategoryDoesntExistException";
    }
}

//Excepción de username de usuario que ya existe. Extiende de VideoSystem
class UsernameAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: el ${param} ya está registrado. (${param}: ${value.username})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "UsernameAlreadyRegisteredException";
    }
}

//Excepción de email de usuario que ya existe. Extiende de VideoSystem
class EmailAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: el ${param} ya está registrado. (${param}: ${value.email})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "EmailAlreadyRegisteredException";
    }
}

//Excepción de usuarios que no existen. Extiende de VideoSystem
class UserDoesntExistException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El ${param} que intentas eliminar no existe. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "UserDoesntExistException";
    }
}

//Excepción de producción que ya existe. Extiende de VideoSystem
class ProductionAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: La ${param} ya está registrada. (${param}: ${value.title})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "ProductionAlreadyRegisteredException";
    }
}

//Excepción de usuarios que no existen. Extiende de VideoSystem
class ProductionDoesntExistException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: La ${param} que intentas eliminar no existe. (${param}: ${value.title})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "ProductionDoesntExistException";
    }
}

//Excepción de actor que ya existe. Extiende de VideoSystem
class ActorAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El ${param} ya está registrado. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "ActorAlreadyRegisteredException";
    }
}

//Excepción de actores que no existen. Extiende de VideoSystem
class ActorDoesntExistException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El ${param} que intentas eliminar no existe. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "ActorDoesntExistException";
    }
}

//Excepción de director que ya existe. Extiende de VideoSystem
class DirectorAlreadyRegisteredException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El ${param} ya está registrado. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "DirectorAlreadyRegisteredException";
    }
}

//Excepción de directores que no existen. Extiende de VideoSystem
class DirectorDoesntExistException extends VideoSystemException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El ${param} que intentas eliminar no existe. (${param}: ${value.name})`, fileName, lineNumber);
        this.param = param;
        this.value = value;
        this.name = "DirectorDoesntExistException";
    }
}


export {BaseException,
	InvalidAccessConstructorException,
    AbstractClassException,
	EmptyValueException,
	InvalidValueException,
    VideoSystemException,
    CategoryAlreadyRegisteredException,
    CategoryDoesntExistException,
    UsernameAlreadyRegisteredException,
    EmailAlreadyRegisteredException,
    UserDoesntExistException,
    ProductionAlreadyRegisteredException,
    ProductionDoesntExistException,
    ActorAlreadyRegisteredException,
    ActorDoesntExistException,
    DirectorAlreadyRegisteredException,
    DirectorDoesntExistException};