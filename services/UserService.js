class UserService {
    constructor() {
        this.a = 'UserService: Getting a User from Database';
    }

    async getUser() {
        return this.a;
    }
}

module.exports = UserService;
