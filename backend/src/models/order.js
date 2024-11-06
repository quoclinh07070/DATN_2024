class Order {
    constructor(id, user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.total_amount = total_amount;
        this.payment_method = payment_method;
        this.status = status;
        this.payment_amount = payment_amount;
        this.address = address;
        this.phone_number = phone_number;
        this.voucher_id = voucher_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Order;
