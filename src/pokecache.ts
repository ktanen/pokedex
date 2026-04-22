type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const newEntry: CacheEntry<T> = {
        createdAt: Date.now(),
        val: val
    };

    this.#cache.set(key, newEntry);
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap() {
    const latestPreserveTime = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache) {
        if (entry.createdAt < latestPreserveTime) {
            this.#cache.delete(key);
        }
    }

  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}