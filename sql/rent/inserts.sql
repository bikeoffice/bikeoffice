-- MegaRawBar schema --

-- clients
INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('John Doe', 'johndoe@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Jane Smith', 'janesmith@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Michael Johnson', 'michaeljohnson@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Emily Davis', 'emilydavis@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('David Wilson', 'davidwilson@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Sarah Thompson', 'sarahthompson@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Daniel Anderson', 'danielanderson@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Olivia Martinez', 'oliviamartinez@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('Sophia Lewis', 'sophialewis@example.com', NOW(), NOW());

INSERT INTO MegaRawBar.clients (name, email, createdAt, updatedAt)
VALUES ('William Clark', 'williamclark@example.com', NOW(), NOW());


-- bikes 
INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Mountain Bike', 'Mountain', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Road Bike', 'Road', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Hybrid Bike', 'Hybrid', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('City Bike', 'City', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Electric Bike', 'Electric', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('BMX Bike', 'BMX', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Cruiser Bike', 'Cruiser', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Folding Bike', 'Folding', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Gravel Bike', 'Gravel', NOW(), NOW());

INSERT INTO MegaRawBar.bikes (name, type, createdAt, updatedAt)
VALUES ('Kids Bike', 'Kids', NOW(), NOW());

-- rents 
INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-05-01', '2023-05-07', 1, 1, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-06-15', '2023-06-22', 2, 2, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-07-10', '2023-07-15', 3, 3, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-08-03', '2023-08-08', 4, 4, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-09-20', '2023-09-27', 5, 5, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-10-12', '2023-10-19', 6, 6, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-11-25', '2023-12-02', 7, 7, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-12-15', '2023-12-20', 8, 8, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2024-01-08', '2024-01-15', 9, 9, NOW(), NOW());

INSERT INTO MegaRawBar.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2024-02-20', '2024-02-25', 10, 10, NOW(), NOW());

-- VeloMallorca schema --

-- clients
INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Maria Garcia', 'mariagarcia@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Antonio Fernandez', 'antoniofernandez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Isabel Lopez', 'isabellopez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Manuel Ramirez', 'manuelramirez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Laura Torres', 'latorres@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Javier Perez', 'javierperez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Sofia Rodriguez', 'sofia.rodriguez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Carlos Navarro', 'carlosnavarro@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Marta Sanchez', 'martasanchez@example.com', NOW(), NOW());

INSERT INTO VeloMallorca.clients (name, email, createdAt, updatedAt)
VALUES ('Pedro Gonzalez', 'pedrogonzalez@example.com', NOW(), NOW());

-- bikes
INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Mountain Bike', 'Mountain', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Road Bike', 'Road', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Electric Bike', 'Electric', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('City Bike', 'City', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Folding Bike', 'Folding', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Hybrid Bike', 'Hybrid', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Gravel Bike', 'Gravel', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('BMX Bike', 'BMX', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Cruiser Bike', 'Cruiser', NOW(), NOW());

INSERT INTO VeloMallorca.bikes (name, type, createdAt, updatedAt)
VALUES ('Kids Bike', 'Kids', NOW(), NOW());

-- rents
INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-05-01', '2023-05-07', 1, 1, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-06-15', '2023-06-22', 2, 2, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-07-10', '2023-07-15', 3, 3, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-08-03', '2023-08-08', 4, 4, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-09-20', '2023-09-27', 5, 5, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-10-12', '2023-10-19', 6, 6, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-11-25', '2023-12-02', 7, 7, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2023-12-15', '2023-12-20', 8, 8, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2024-01-08', '2024-01-15', 9, 9, NOW(), NOW());

INSERT INTO VeloMallorca.rents (startDate, endDate, clientId, bikeId, createdAt, updatedAt)
VALUES ('2024-02-20', '2024-02-25', 10, 10, NOW(), NOW());
