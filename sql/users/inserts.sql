-- Create rows in the 'users' table in the 'public' schema with username-based passwords
INSERT INTO public.users (id, username, password, schema, "createdAt", "updatedAt")
VALUES (1, 'Samu', 'Samu', 'MegaRawBar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.users (id, username, password, schema, "createdAt", "updatedAt")
VALUES (2, 'Noor', 'Noor', 'MegaRawBar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.users (id, username, password, schema, "createdAt", "updatedAt")
VALUES (3, 'Leo', 'Leo', 'VeloMallorca', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.users (id, username, password, schema, "createdAt", "updatedAt")
VALUES (4, 'Dani', 'Dani', 'VeloMallorca', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
