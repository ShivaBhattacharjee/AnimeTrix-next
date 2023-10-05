import { useCallback } from "react";

const useDebounce = <T extends string[]>(callback: (...args: T) => void, delay: number) => {
    const debouncedCallback = useCallback(
        (...args: T) => {
            const handler = setTimeout(() => {
                callback(...args);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [callback, delay],
    );

    return debouncedCallback;
};

export default useDebounce;
