export const testData: string = `
-- This file inserts the test data for every schema

-- $chema schema --
INSERT INTO "$chema".categories (id, name, type, "createdAt", "updatedAt") VALUES (1, 'Bicis', 'product', '2023-05-21 15:07:48.67997+00', '2023-05-21 15:07:48.67997+00');
INSERT INTO "$chema".categories (id, name, type, "createdAt", "updatedAt") VALUES (2, 'Ropa', 'product', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');
INSERT INTO "$chema".categories (id, name, type, "createdAt", "updatedAt") VALUES (3, 'Alquiler', 'service', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');

-- clients
INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('John Doe', 'johndoe@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Jane Smith', 'janesmith@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Michael Johnson', 'michaeljohnson@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Emily Davis', 'emilydavis@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('David Wilson', 'davidwilson@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Sarah Thompson', 'sarahthompson@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Daniel Anderson', 'danielanderson@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Olivia Martinez', 'oliviamartinez@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('Sophia Lewis', 'sophialewis@example.com', NOW(), NOW());

INSERT INTO "$chema".clients (name, email, "createdAt", "updatedAt")
VALUES ('William Clark', 'williamclark@example.com', NOW(), NOW());

-- bikeSizes
insert into "$chema"."bikeSizes" (name, "createdAt", "updatedAt")
values ('S', NOW(), NOW()),
('M', NOW(), NOW()),
('L', NOW(), NOW()),
('XL', NOW(), NOW());

-- bikeDetails
INSERT INTO "$chema"."bikeDetails" ("sizeId", price, stock, "createdAt", "updatedAt")
values  (1, 499.99, 10, NOW(), NOW()),
(2, 599.99, 5, NOW(), NOW()),
(3, 699.99, 2, NOW(), NOW()),
(1, 799.99, 8, NOW(), NOW()),
(2, 899.99, 3, NOW(), NOW()),
(3, 999.99, 1, NOW(), NOW()),
(1, 599.99, 7, NOW(), NOW()),
(2, 699.99, 4, NOW(), NOW()),
(3, 799.99, 1, NOW(), NOW()),
(1, 349.99, 12,NOW(),NOW()),
(2, 399.99, 6, NOW(), NOW()),
(3, 449.99, 2, NOW(), NOW()),
(2, 599.99, 5, NOW(), NOW()),
(3, 699.99, 2, NOW(), NOW()),
(1, 799.99, 8, NOW(), NOW()),
(2, 899.99, 3, NOW(), NOW()),
(3, 999.99, 1, NOW(), NOW()),
(1, 599.99, 7, NOW(), NOW()),
(2, 699.99, 4, NOW(), NOW()),
(3, 799.99, 1, NOW(), NOW()),
(1, 349.99, 12,NOW(),NOW()),
(2, 399.99, 6, NOW(), NOW()),
(3, 449.99, 2, NOW(), NOW()),
(1, 899.99, 5, NOW(), NOW()),
(2, 999.99, 2, NOW(), NOW()),
(3, 1099.99, 1, NOW(), NOW()),
(1, 249.99, 8, NOW(), NOW()),
(2, 299.99, 3, NOW(), NOW()),
(3, 349.99, 1, NOW(), NOW()),
(1, 399.99, 9, NOW(), NOW()),
(2, 449.99, 4, NOW(), NOW()),
(3, 499.99, 2, NOW(), NOW()),
(1, 549.99, 6, NOW(), NOW()),
(2, 599.99, 3, NOW(), NOW()),
(3, 649.99, 1, NOW(), NOW()),
(1, 1099.99, 4, NOW(), NOW()),
(2, 1199.99, 2, NOW(), NOW()),
(3, 1299.99, 1, NOW(), NOW()),
(1, 199.99, 10, NOW(), NOW()),
(2, 249.99, 5, NOW(), NOW()),
(3, 299.99, 2, NOW(), NOW());

-- bikes
INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Mountain Bike', 'Mountain', NOW(), NOW(), 1);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Road Bike', 'Road', NOW(), NOW(), 2);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Hybrid Bike', 'Hybrid', NOW(), NOW(), 3);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('City Bike', 'City', NOW(), NOW(), 4);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Electric Bike', 'Electric', NOW(), NOW(), 5);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('BMX Bike', 'BMX', NOW(), NOW(), 6);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Cruiser Bike', 'Cruiser', NOW(), NOW(), 7);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Folding Bike', 'Folding', NOW(), NOW(), 8);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Gravel Bike', 'Gravel', NOW(), NOW(), 9);

INSERT INTO "$chema".bikes (name, type, "createdAt", "updatedAt", "detailId")
VALUES ('Kids Bike', 'Kids', NOW(), NOW(), 10);

-- Insert the referenced products
INSERT INTO "$chema".products ("name", "price", "iva", "stock", "categoryId", "createdAt", "updatedAt")
VALUES
       ('Bici Electrica Carretera', 1500.0, 21.0, 1, 1, '2023-05-21 15:10:10.674247+00', '2023-05-21 15:10:10.674247+00'),
       ('Bici Electrica Mountain', 1500.0, 21.0, 1, 1, '2023-05-21 15:10:21.54043+00', '2023-05-21 15:10:21.54043+00'),
       ('Bici Electrica Gravel', 1300.0, 21.0, 1, 1, '2023-05-21 15:10:30.859255+00', '2023-05-21 15:10:30.859255+00'),
       ('Culotte Maap', 9.0, 10.0, 1, 2, '2023-05-21 15:10:56.012261+00', '2023-05-21 15:10:56.012261+00'),
       ('Maillot Maap', 19.0, 10.0, 2, 2, '2023-05-21 15:11:00.809804+00', '2023-05-21 15:11:00.809804+00'),
       ('Rent1', 1000, 21, 1, 3, NOW(), NOW()),
       ('Rent2', 1200, 21, 1, 3, NOW(), NOW()),
       ('Rent3', 800, 21, 1, 3, NOW(), NOW()),
       ('Rent4', 1500, 21, 1, 3, NOW(), NOW()),
       ('Rent5', 600, 21, 1, 3, NOW(), NOW()),
       ('Rent6', 1400, 21, 1, 3, NOW(), NOW()),
       ('Rent7', 900, 21, 1, 3, NOW(), NOW()),
       ('Rent8', 1700, 21, 1, 3, NOW(), NOW()),
       ('Rent9', 500, 21, 1, 3, NOW(), NOW()),
       ('Rent10', 1100, 21, 1, 3, NOW(), NOW());

-- rents
INSERT INTO "$chema".rents ("startDate", "endDate", "clientId", "bikeId", "createdAt", "updatedAt", "productId")
VALUES ('2023-05-01', '2023-05-07', 1, 1, NOW(), NOW(), 1),
       ('2023-06-15', '2023-06-22', 2, 2, NOW(), NOW(), 2),
       ('2023-07-10', '2023-07-15', 3, 3, NOW(), NOW(), 3),
       ('2023-08-03', '2023-08-08', 4, 4, NOW(), NOW(), 4),
       ('2023-09-20', '2023-09-27', 5, 5, NOW(), NOW(), 5),
       ('2023-10-12', '2023-10-19', 6, 6, NOW(), NOW(), 6),
       ('2023-11-25', '2023-12-02', 7, 7, NOW(), NOW(), 7),
       ('2023-12-15', '2023-12-20', 8, 8, NOW(), NOW(), 8),
       ('2024-01-08', '2024-01-15', 9, 9, NOW(), NOW(), 9),
       ('2024-02-20', '2024-02-25', 10, 10, NOW(), NOW(), 10);
`
