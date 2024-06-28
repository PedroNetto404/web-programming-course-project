let db = null;
const request = indexedDB.open('lunchbox', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('menus', { keyPath: 'id', autoIncrement: true });
};

const dbPromise = new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
        db = event.target.result;
        resolve(db);
    };

    request.onerror = (event) => {
        reject(event.target.errorCode);
    };
});

const getDatabase = (table) => {
    const getStore = async (mode) => {
        db = await dbPromise;
        const tx = db.transaction(table, mode);

        return ({
            store: tx.objectStore(table),
            transaction: tx
        });
    };

    const runOperation = async (operation) => {
        const { store, transaction } = await getStore('readwrite');
        await operation(store);
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = (event) => reject(event.target.error);
        });
    };

    return {
        getAll: async () => {
            const { store } = await getStore('readonly');
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        },
        getById: async (id) => {
            const { store } = await getStore('readonly');
            return new Promise((resolve, reject) => {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        },
        save: async (entity) => runOperation(store => store.put(entity)),
        remove: async (id) => runOperation(store => store.delete(id)),
        update: async (entity) => runOperation(store => store.put(entity))
    };
};

(async () => {
    const seedsFileName = [
        'product-seed.json',
        'menu-seed.json'
    ];

    const promises = seedsFileName.map(async seedFileName => {
        const response = await fetch(`/seeds/${seedFileName}`);
        const data = await response.json();

        const datababse = getDatabase(data.table);
        const allItems = await datababse.getAll();
        if (allItems.length > 0) return;

        const database = getDatabase(data.table);
        return Promise.all(data['seed-data'].map(entity => database.save(entity)));
    });

    await Promise.all(promises);
})();

export default getDatabase;
