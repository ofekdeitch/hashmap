import hash from "object-hash";
import deepEqual from "deep-equal";

export class HashMap<K, V> {
  private buckets: Record<string, Bucket<K, V>> = {};

  set(key: K, value: V) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    if (bucket) {
      this.removeFromBucket(bucket, key);
      bucket.push({ key, value });
    } else {
      this.buckets[hash] = [{ key, value }];
    }
  }

  get(key: K): V | null {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    if (!bucket) {
      return null;
    }

    return this.findInBucket(bucket, key);
  }

  keys(): K[] {
    const keys: K[] = [];

    for (const bucket of Object.values(this.buckets)) {
      for (const tuple of bucket) {
        keys.push(tuple.key);
      }
    }

    return keys;
  }

  private hash(key: K): string {
    return hash(key as any);
  }

  private deepEqual(a: any, b: any): boolean {
    return deepEqual(a, b);
  }

  private findInBucket(bucket: Bucket<K, V>, key: K): V | null {
    const tuple = bucket.find((tuple) => this.deepEqual(tuple.key, key));
    return tuple?.value ?? null;
  }

  private removeFromBucket(bucket: Bucket<K, V>, key: K): void {
    const index = bucket.findIndex((tuple) => this.deepEqual(tuple.key, key));
    bucket.splice(index, 1);
  }
}

interface Tuple<K, V> {
  key: K;
  value: V;
}

type Bucket<K, V> = Tuple<K, V>[];
