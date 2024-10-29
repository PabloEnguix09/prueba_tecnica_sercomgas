export async function list<T>(route: string): Promise<T[]> {
    const res = await fetch(`http://localhost:8080/${route}`);
    const response = await res.json();
    return response.data;
}

export async function create<T>(route: string, data: T): Promise<T> {
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