-- Active: 1673888962487@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL


);

INSERT INTO users(id, email, password)
VALUES('1', 'milena@labenu.com','m123'),
('2', 'maria@labenu.com','ma123'),
('3', 'flavia@labenu.com', 'f123'),
('4', 'iraides@labenu.com', 'i123');

PRAGMA table_info('users');

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id,name,price,category)
VALUES('p001', 'colar',10.50,'bijuterias'),
('p002', 'blusa', 85.50, 'roupas'),
('p003', 'celular', 1500.00, 'eletrônicos'),
('p004', 'brinco', 5.50, 'bijuterias'),
('p005', 'calça', 150.00, 'roupas'),
('p006', 'computador', 1500.00, 'eletrônicos');

PRAGMA table_info('products');

SELECT * FROM products;

SELECT * FROM products
WHERE category = 'bijuterias';

DROP TABLE products;

SELECT * FROM users
WHERE id = 'Milena';

DELETE FROM products
WHERE id = 'p006';

DELETE FROM users
WHERE id = 'Maria';

UPDATE users
SET email = 'milenasimoes@labenu.com'
WHERE id = 'Milena';

UPDATE products
SET name = 'camiseta'
WHERE id = 'p002';

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
WHERE price >= '100' AND price <= '2000'
ORDER BY price ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0
;

CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL UNIQUE NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT ,
buyer_id TEXT NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases(id, total_price, paid, buyer_id)
VALUES
('c001', 50.00, 0, '1'),
('c002', 100.00, 0, '1'),
('c003', 150.00, 0, '2'),
('c004', 200.00, 0, '2');

DROP TABLE purchases ;


UPDATE purchases
SET delivered_at = DATETIME ("NOW")
WHERE buyer_id = '1' ;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.buyer_id = '2';

SELECT * FROM purchases;
-------------------------------

CREATE TABLE purchases_products(
purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchases(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
 ('c001', 'p003', 1),
 ('c002', 'p001', 2),
 ('c003', 'p004', 4);

 SELECT 
 purchase_id AS purchaseId,
 product_id AS productId,
 purchases_products.quantity AS quantity
 FROM purchases_products
 INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
 INNER JOIN products ON purchases_products.product_id = products.id;




