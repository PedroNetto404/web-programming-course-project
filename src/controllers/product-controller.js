import getDatabase from "../shared/scripts/database.js";

const TABLE_NAME = 'products';
const database = getDatabase(TABLE_NAME);

const getAll = () => database.getAll();
const getById = (id) => database.getById(id);
const save = (product) => database.save(product);
const remove = (id) => database.remove(id);
const update = (product) => database.update(product);

export default {
    getAll,
    getById,
    save,
    remove,
    update
}