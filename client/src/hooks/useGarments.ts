import { useEffect, useState, useCallback } from 'react';

export type Garment = any;

const API = '/api/garments';

export function useGarments() {
	const [garments, setGarments] = useState<Garment[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchGarments = useCallback(async () => {
		setLoading(true);
		const res = await fetch(API);
		const data = await res.json();
		setGarments(data || []);
		setLoading(false);
	}, []);

	useEffect(() => {
		void fetchGarments();
	}, [fetchGarments]);

	async function createGarment(payload: any) {
		const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
		const data = await res.json();
		await fetchGarments();
		return data;
	}

	async function updateGarment(id: number, payload: any) {
		const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
		const data = await res.json();
		await fetchGarments();
		return data;
	}

	async function deleteGarment(id: number) {
		const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
		const data = await res.json();
		await fetchGarments();
		return data;
	}

	return { garments, loading, fetchGarments, createGarment, updateGarment, deleteGarment };
}

