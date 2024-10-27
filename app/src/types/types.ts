export type OperationTable = {
    id: number,
    proveedor: string,
    cliente: string,
    litros_de_gas: number,
    precio_total: number,
    operacion: string,
    fecha: string
}

export type Operation = {
    id?: number,
    marketer_id: number,
    client_id: number,
    type: string,
    amount: number,
    price: number,
    created_at?: Date
}

export type Marketer = {
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

export type Option = {
    value: string | number,
    label: string
}