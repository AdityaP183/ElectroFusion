import { useState } from "react";

type UseFetch<TParams, TResponse> = (params: TParams) => Promise<TResponse>;

const useFetch = <TParams, TResponse>(
	cb: UseFetch<TParams, TResponse>,
	params?: TParams
) => {
	const [data, setData] = useState<TResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fn = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await cb(params as TParams);
			setData(response);
			setError(null);
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fn };
};

export default useFetch;