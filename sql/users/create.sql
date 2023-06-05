-- Create the 'users' table in the 'public' schema
CREATE TABLE public.users (
    id INTEGER,
    username VARCHAR(50),
    password VARCHAR(50),
    schema VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);