const defaultExpirationTime = 1000 * 60 * 5; // 5 minutes

export class ApiCache {
	private cache: Map<string, { data: any; expirationTime: number }> = new Map();

	set(key: string, data: any, expirationTime: number = defaultExpirationTime) {
		this.cache.set(key, { data, expirationTime: Date.now() + expirationTime });
	}

	get(key: string) {
		const cachedData = this.cache.get(key);
		if (cachedData && cachedData.expirationTime > Date.now()) {
			return cachedData.data;
		} else {
			this.cache.delete(key);
			return null;
		}
	}

	delete(key: string) {
		this.cache.delete(key);
	}
}
