import getDatabase from "../shared/scripts/database.js";

const TABLE_NAME = 'menus';
const database = getDatabase(TABLE_NAME);

const getAll = () => database.getAll();
const getById = (id) => database.getById(id);
const save = (menu) => database.save(menu);
const remove = (id) => database.remove(id);
const update = (menu) => database.update(menu);

const getTodaysMenus = async () => {
    const today = new Date().toLocaleDateString();
    const menus = await getAll();
    return menus.filter(menu => menu.date === today);
}

export default {
    getAll,
    getById,
    save,
    remove,
    update,
    getTodaysMenus
}