export declare class Transaction {
    id: number;
    order_id: string;
    customer_id: number;
    product_id: number;
    quantity: number;
    total: number;
    price: number;
    line: number;
    date: string;
    status: string;
    type: string;
    constructor(partial: Partial<Transaction>);
}
