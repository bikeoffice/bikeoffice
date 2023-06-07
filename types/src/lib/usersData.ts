export const usersData: string = `
-- This file create the users table and insert the test users

CREATE TABLE IF NOT EXISTS public.users (
  id INTEGER,
  username VARCHAR(255),
  password VARCHAR(255),
  schema VARCHAR(255),
  logo VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  code VARCHAR(255),
  tel VARCHAR(255),
  website VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
);
`

export const usersDataInsert: string = `
INSERT INTO public.users (id, username, password, schema, logo, address, city, code, tel, website, "createdAt", "updatedAt") VALUES (1, 'testv', 'testv', 'VeloMallorca', '/api/assets/logovm.jpg', 'Carrer de l''Estacada 1', '07360 Palma', 'A40854069', '971 05 90 74', 'www.velomallorca.net', '2023-05-28 10:54:51.728387+00', '2023-05-28 10:54:51.728387+00');
INSERT INTO public.users (id, username, password, schema, logo, address, city, code, tel, website, "createdAt", "updatedAt") VALUES (2, 'testm', 'testm', 'MegaRawBar', '/api/assets/logomrb.png', 'Carrer Joan Carles I 46', '07360 Lloseta', 'B67859017', '645 66 40 12', 'megarawbar.com', '2023-05-28 11:00:00.085073+00', '2023-05-28 11:00:00.085073+00');
`
