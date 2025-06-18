import { useSyncExternalStore } from "react";

const store = new Map();

const initializeStateInStore = (key, initial) => {
    if (!store.has(key)) {
        store.set(key, {
            value: initial,
            listeners: new Set(),
        })
    }
}

const subscribeToStore = (key, listener) => {
    const entry = store.get(key);
    if (!entry) return () => { };
    entry.listeners.add(listener);
    return () => entry.listeners.delete(listener);
}

const getSnapshotFromStore = (key) => {
    const entry = store.get(key)
    return entry?.value
}

const setStateInStoree = (key, newValue) => {
    const entry = store.get(key)
    if (entry) {
        entry.value = newValue;
        entry.listeners.forEach((fn) => fn());
    }
}

const useGlobalState = (key, initialValue) => {

    initializeStateInStore(key, initialValue);

    const globalState = useSyncExternalStore(
        (cb) => subscribeToStore(key, cb),
        () => getSnapshotFromStore(key)
    );

    return [globalState, (newValue) => setStateInStoree(key, newValue)]
}

export default useGlobalState;
