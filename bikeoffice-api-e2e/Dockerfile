# Use the official PostgreSQL image
FROM postgres

# Set environment variables
ENV POSTGRES_DB=bikeoffice
ENV POSTGRES_USER=bikeoffice
ENV POSTGRES_PASSWORD=bikeoffice

# Copy the inserts.sql file to a directory in the container
COPY ./setup.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL default port
EXPOSE 5432

# Start the PostgreSQL server
CMD ["postgres"]
