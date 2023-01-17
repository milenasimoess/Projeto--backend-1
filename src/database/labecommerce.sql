-- Active: 1673888962487@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL 

);

INSERT INTO users(id, email, password)
VALUES('Milena', 'milena@labenu.com','m123'),
('Maria', 'maria@labenu.com','ma123'),
('Flávia', 'flavia@labenu.com', 'f123'),
('Iraídes', 'iraides@labenu.com', 'i123');

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
LIMIT 20 OFFSET 0
ORDER BY price ASC;



