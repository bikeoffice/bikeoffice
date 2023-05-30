# bikeoffice
## AWS setup
```sh
$ aws configure
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: xXxXxXxXxXxXxXxXxXxXxXxX
Default region name [None]: us-east-1
Default output format [None]: text
```

```sh
$ aws ecr create-repository --repository-name bikeoffice-ecr --region us-east-1
```

## Docker pg locally
```sh
$ docker run --name some-postgres -e POSTGRES_DB=bikeoffice -e POSTGRES_USER=bikeoffice -e POSTGRES_PASSWORD=bikeoffice -p 5432:5432  -d postgres
```

Connect to db
```sh
$ psql user=bikeoffice
```

Change db
```sh
$ \c bikeoffice
```

## Install NX monorepo globally
```sh
$ npm install --global nx@latest
```

## NX monorepo commands
```sh
$ nx run-many -t serve
```
