import { ref, watchEffect } from "vue";

export function useLocalStorageRef<T>(initialValue: T, key: string) {
    const localStorageValue = window.localStorage.getItem(key)
    let val = initialValue;
    if (localStorageValue !== null) {
        try {
            val = JSON.parse(localStorageValue)
        } catch {

        }
    }
    const outRef = ref(val)
    watchEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(outRef.value))
    });
    return outRef
}