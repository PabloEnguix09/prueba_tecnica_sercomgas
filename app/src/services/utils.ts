import { Marketer, Operation, OperationTable, Option } from "../types/types";

export function convertOperationData(operations: Operation[], marketers: Marketer[]): OperationTable[] {
    return operations.map((operation) => {
        const providerName = marketers.find((marketer) => marketer.id === operation.marketer_id)?.name;
        const clientName = marketers.find((marketer) => marketer.id === operation.client_id)?.name;
        return {
            id: operation.id!,
            proveedor: providerName ? providerName : "ERROR",
            cliente: clientName ? clientName : "ERROR",
            litros_de_gas: operation.amount,
            precio_total: operation.price,
            operacion: operation.type,
            fecha: operation.created_at!.toLocaleString(),
        };
    });
}

export function convertMarketerToOption(marketers: Marketer[]): Option[] {
    return marketers.map((marketer) => {
        return {
            value: marketer.id,
            label: marketer.name
        }
    })
}