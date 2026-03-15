class InvalidQueryParameter extends Error{
    constructor(){
        super(
            `Invalid Query Parameter !`
        );
        this.name = "InvalidQueryParameter";
    }
}

export default InvalidQueryParameter;