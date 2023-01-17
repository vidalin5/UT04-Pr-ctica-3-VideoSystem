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