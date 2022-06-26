import { writable } from 'svelte/store';
import { Filters, type Store } from './types';

export const STORAGE_NAME = 'store';

const createStore = () => {

	const localStore: Store = JSON.parse(localStorage.getItem(STORAGE_NAME));

	const { subscribe, set, update } = writable<Store>(localStore || {
		todos: [],
		newItem: '',
		idCounter: 0,
		filter: Filters.All
	});

	const methods = {
		addTodo: (text: string) => update((state: Store) => ({
			...state,
			todos: [...state.todos, { id: state.idCounter, text, done: false }],
			idCounter: state.idCounter + 1
		})),
		removeTodo: (id: number) => update((state: Store) => ({
			...state,
			todos: state.todos.filter((t) => t.id !== id)
		})),
		setFilter: (filter: Filters) => update((state: Store) => ({
			...state,
			filter
		})),
		refresh: () => update((state: Store) => ({
			...state
		})),
		setStorage: (store: Store) => localStorage.setItem(STORAGE_NAME, JSON.stringify(store))
	};

	return {
		subscribe,
		set,
		update,
		...methods
	};
}

export const store = createStore();