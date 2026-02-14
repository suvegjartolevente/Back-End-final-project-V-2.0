class DuplicateUsernameError extends Error{
    constructor(fieldName){
        super(
            `${fieldName} already in use !`
        );
        this.name = "DuplicateUsernameError";
    }
}

export default DuplicateUsernameError;