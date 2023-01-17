"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "u1",
        email: "user1@email",
        password: "123ç"
    }, {
        id: "u2",
        email: "user2@email",
        password: "321ç"
    }
];
exports.products = [
    {
        id: "p1",
        name: "blusa",
        price: 25,
        category: types_1.Category.CLOTHES
    },
    {
        id: "p2",
        name: "colar",
        price: 7,
        category: types_1.Category.ACCESSORIES
    }
];
exports.purchase = [
    {
        userId: "u2",
        productId: "p2",
        quantity: 2,
        totalPrice: 14
    }, {
        userId: "u1",
        productId: "p1",
        quantity: 4,
        totalPrice: 100
    }
];
function createUser(id, email, password) {
    exports.users.push({ id, email, password });
    return ("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({ id, name, price, category });
    return ("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((product) => {
        return product.id === idToSearch;
    });
}
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    return exports.products.filter((product) => {
        return (product.name.toLowerCase().includes(q.toLowerCase()));
    });
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    exports.purchase.push({ userId, productId, quantity, totalPrice });
    return ("Compra criada com sucesso");
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdSearch) => {
    return exports.purchase.filter((purchase) => {
        return (purchase.userId.toLowerCase().includes(userIdSearch));
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map