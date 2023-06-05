--INSERT INTO public.users (id, username, password, schema, logo, address, city, iva, tel, website, "createdAt", "updatedAt") VALUES (1, '1234', '1234', 'VeloMallorca', '/api/assets/logovm.jpg', 'Carrer de l''Estacada 1', '07360 Palma', 'A40854069', '971 05 90 74', 'www.velomallorca.net', '2023-05-28 10:54:51.728387+00', '2023-05-28 10:54:51.728387+00');
--INSERT INTO public.users (id, username, password, schema, logo, address, city, iva, tel, website, "createdAt", "updatedAt") VALUES (2, 'admin', 'admin', 'MegaRawBar', '/api/assets/logomrb.png', 'Carrer Joan Carles I 46', '07360 Lloseta', 'B67859017', '645 66 40 12', 'megarawbar.com', '2023-05-28 11:00:00.085073+00', '2023-05-28 11:00:00.085073+00');


INSERT INTO "MegaRawBar".categories (id, name, type, "createdAt", "updatedAt") VALUES (1, 'Bicis', 'product', '2023-05-21 15:07:48.67997+00', '2023-05-21 15:07:48.67997+00');
INSERT INTO "MegaRawBar".categories (id, name, type, "createdAt", "updatedAt") VALUES (2, 'Ropa', 'product', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');
INSERT INTO "MegaRawBar".categories (id, name, type, "createdAt", "updatedAt") VALUES (3, 'Alquiler', 'service', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');

INSERT INTO "MegaRawBar".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (11, 'Bici Electrica Carretera', 21.0, 1500.0, 1, '2023-05-21 15:10:10.674247+00', '2023-05-21 15:10:10.674247+00');
INSERT INTO "MegaRawBar".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (12, 'Bici Electrica Mountain', 21.0, 1400.0, 1, '2023-05-21 15:10:21.54043+00', '2023-05-21 15:10:21.54043+00');
INSERT INTO "MegaRawBar".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (13, 'Bici Electrica Gravel', 21.0, 1300.0, 1, '2023-05-21 15:10:30.859255+00', '2023-05-21 15:10:30.859255+00');
INSERT INTO "MegaRawBar".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (15, 'Culotte Maap', 10.0, 19.0, 2, '2023-05-21 15:10:56.012261+00', '2023-05-21 15:10:56.012261+00');
INSERT INTO "MegaRawBar".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (16, 'Maillot Maap', 10.0, 29.0, 2, '2023-05-21 15:11:00.809804+00', '2023-05-21 15:11:00.809804+00');

INSERT INTO "VeloMallorca".categories (id, name, type, "createdAt", "updatedAt") VALUES (1, 'Bicis', 'product', '2023-05-21 15:07:48.67997+00', '2023-05-21 15:07:48.67997+00');
INSERT INTO "VeloMallorca".categories (id, name, type, "createdAt", "updatedAt") VALUES (2, 'Ropa', 'product', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');
INSERT INTO "VeloMallorca".categories (id, name, type, "createdAt", "updatedAt") VALUES (3, 'Alquiler', 'service', '2023-05-21 15:07:56.965059+00', '2023-05-21 15:07:56.965059+00');


INSERT INTO "VeloMallorca".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (11, 'Bici Carretera', 21.0, 1300.0, 1, '2023-05-21 15:10:10.674247+00', '2023-05-21 15:10:10.674247+00');
INSERT INTO "VeloMallorca".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (12, 'Bici Mountain', 21.0, 1200.0, 1, '2023-05-21 15:10:21.54043+00', '2023-05-21 15:10:21.54043+00');
INSERT INTO "VeloMallorca".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (13, 'Bici Gravel', 21.0, 1400.0, 1, '2023-05-21 15:10:30.859255+00', '2023-05-21 15:10:30.859255+00');
INSERT INTO "VeloMallorca".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (15, 'Culotte Gobik', 10.0, 19.0, 2, '2023-05-21 15:10:56.012261+00', '2023-05-21 15:10:56.012261+00');
INSERT INTO "VeloMallorca".products (id, name, iva, price, "categoryId", "createdAt", "updatedAt") VALUES (16, 'Maillot Gobik', 10.0, 25.0, 2, '2023-05-21 15:11:00.809804+00', '2023-05-21 15:11:00.809804+00');

