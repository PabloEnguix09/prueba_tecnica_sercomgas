export type OperationTable = {
    id: number,
    proveedor: string,
    cliente: string,
    litros_de_gas: number,
    precio_total: number,
    operacion: string,
    fecha: string
}

export type NewOperationType = {
    marketer_id: number,
    client_id: number,
    type: string,
    amount: number,
    price: number
}