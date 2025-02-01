import { ApiCache } from '~/utils/api.cache';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('ApiCache', () => {
	let cache: ApiCache;

	beforeEach(() => {
		cache = new ApiCache();
		vi.useFakeTimers();
	});

	it('stores and retrieves data within expiration time', () => {
		cache.set('key1', 'value1', 1000 * 60); // 1 minute
		expect(cache.get('key1')).toBe('value1');
	});

	it('returns null for expired data', () => {
		cache.set('key2', 'value2', 1); // 1 millisecond
		vi.advanceTimersByTime(2); // advance time by 2 milliseconds
		expect(cache.get('key2')).toBeNull();
	});

	it('deletes data from cache', () => {
		cache.set('key3', 'value3');
		cache.delete('key3');
		expect(cache.get('key3')).toBeNull();
	});

	it('overwrites existing data with the same key', () => {
		cache.set('key4', 'value4');
		cache.set('key4', 'newValue4');
		expect(cache.get('key4')).toBe('newValue4');
	});

	it('handles non-existent keys gracefully', () => {
		expect(cache.get('nonExistentKey')).toBeNull();
	});
});
