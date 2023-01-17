"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
console.log((0, database_1.createUser)("u3", "user3@email.com", "1234"));
console.table((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("p3", "calça", 4321, types_1.Category.CLOTHES));
console.table((0, database_1.getAllProducts)());
console.log((0, database_1.createProduct)("p4", "celular", 400, types_1.Category.ELECTRONICS));
console.table((0, database_1.getProductById)("p2"));
console.table((0, database_1.queryProductsByName)("blusa"));
console.table((0, database_1.createPurchase)("u1", "p2", 1, 7));
console.log((0, database_1.getAllPurchasesFromUserId)("u2"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('/products/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((products) => {
        return products.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
//# sourceMappingURL=index.js.map