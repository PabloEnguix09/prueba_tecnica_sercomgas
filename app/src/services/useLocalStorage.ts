import React from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T) => void] {

    const [value, setValue] = React.useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const updateValue = (newValue: T) => {
        setValue(newValue);
    };

    return [value, updateValue];
}