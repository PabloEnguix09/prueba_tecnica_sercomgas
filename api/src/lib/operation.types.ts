export interface OperationType {
    id: number;
    marketer_id: number;
    client_id: number;
    type: string;
    amount: number;
    price: number;
    created_at: Date;
}