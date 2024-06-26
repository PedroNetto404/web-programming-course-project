const create = (order) => {
    order.id = Date.now().toString();
    const orders = getAll();

    if(orders.length === 0) {
        orders.push(order);
    }

    localStorage.setItem('orders', JSON.stringify(orders));
}

const getAll = () => JSON.parse(localStorage.getItem('orders')) || [];

const getById = (id) => {
    const orders = getAll();
    return orders.find(order => order.id === id);
}

const update = (order) => {
    const orders = getAll();
    const index = orders.findIndex(o => o.id === order.id);
    orders[index] = order;
    localStorage.setItem('orders', JSON.stringify(orders));
}

const remove = (id) => {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const index = orders.findIndex(o => o.id === id);
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
}

export default {
    create,
    getAll,
    getById,
    update,
    remove
}