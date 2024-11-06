// user.js
class User {
    constructor(id, fullname, password, phone_number, role, email, status, created_at, updated_at) {
        this.id = id;
        this.fullname = fullname;
        this.password = password;
        this.phone_number = phone_number;
        this.role = role;
        this.email = email;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = User;
