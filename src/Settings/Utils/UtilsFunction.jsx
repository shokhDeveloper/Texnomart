export const setItem = (key, value) => window.localStorage.setItem(key, typeof value !== "object" ? value: JSON.stringify(value))
export const getItem = (key) => window.localStorage.getItem(key)
