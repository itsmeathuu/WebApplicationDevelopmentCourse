class CustomError extends Error {
    constructor(name, ...params) {
        super();
        this.name = name;

        for (const value of params) {
            if (value[0] != 'name') this[value[0]] = value[1];
        }
    }
}

export default CustomError;