// voucher.js
class Voucher {
    constructor(id, price, discount_percent, status, created_at, updated_at) {
        this.id = id;
        this.price = price;
        this.discount_percent = discount_percent;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Voucher;
