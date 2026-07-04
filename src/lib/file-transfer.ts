const DB_NAME = 'toolboximage-transfer';
const DB_VERSION = 1;
const STORE_NAME = 'pending-files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME, { autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

const SESSION_KEY = 'toolboximage:transfer';

export function markTransfer(): void {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, '1');
  }
}

export function hasTransfer(): boolean {
  return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1';
}

export function clearTransfer(): void {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export async function storeFiles(files: File[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  for (const f of files) {
    store.put(f);
  }
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function retrieveFiles(): Promise<File[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const all: File[] = [];
  await new Promise<void>((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => {
      all.push(...(req.result as File[]));
      resolve();
    };
    req.onerror = () => reject(req.error);
  });
  store.clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  return all;
}
