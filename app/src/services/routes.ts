import { Marketer, Operation } from "../types/types";

export async function list(route: string) {
    const res = await fetch(`http://localhost:8080/${route}`);
    const response = await res.json();
    return response.data;
}

export async function create(route: string, data: Marketer | Operation) {
    const res = await fetch(`http://localhost:8080/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
}