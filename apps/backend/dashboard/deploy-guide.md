# Deployment and style guide

Dashboard backend uses the [nest.js] framework and REST Api in a [nodejs.org][nodejs.dev] enviroment.Postgres[postgresql.org] is used for the database and ORM TypeOrm[typeorm.io] for connect and mapping data.

## Pre setup

- node - look [nodejs.dev] and [nodejs.org]
- yarn - look [yarnpkg.com]
- docker - look [docker.com]
- nx - look [nx.dev]

## Useful commands

- `yarn backend-dashboard:start` - run dashboard backend
- `yarn backend-dashboard:build` - run build
- `yarn backend-dashboard:test` - run all backend unit tests
- `yarn backend-dashboard:lint` - run check linter

- `yarn typeorm:create-migration -n="name of migrations"` - create migration schema
- `yarn typeorm:generate-migration -n="name of migrations"` - generate migration schema
- `yarn typeorm:run-migrations` - run migrations
- `yarn typeorm:revert-migration` - run cancel last migration

### Install all dependencies

- `yarn install` run install all modules

### Environment

Just rename this file [.env.example] to `.env`

### Generate keys

How we can generate all these keys `JWT_PUBLIC_KEY_ACCESS`, `JWT_PRIVATE_KEY_ACCESS`, `JWT_PUBLIC_KEY_REFRESH`, `JWT_PRIVATE_KEY_REFRESH` in `.env` file. We need to use command below in your terminal.

`ssh-keygen -t rsa -b 4096 -m PEM -f jwtRSA256.key -q -N "" && openssl rsa -in jwtRSA256.key -pubout -outform PEM -out jwtRSA256.key.pub && awk -v ORS='\\n' {print} jwtRSA256.key && echo && awk -v ORS='\\n' {print} jwtRSA256.key.pub && rm jwtRSA256.key && rm jwtRSA256.key.pub`

This command create two keys `public` and `private`. Public key is not in the PEM format, openssl do this convert to the PEM. Then we copy the keys from the terminal and replace `\n` and remove the keys from terminal.

## Run database

For running PostgresSQL you can use Docker. Just run the command and run containers using `docker-compose up` or just install PgAdmin[pgadmin.org] and setup new database manual.

## How to create migrations

- Clear your database drop with all values, no tables, settings, values etc...
- Run `yarn typeorm:generate-migration -n="name of migrations"`
- Go to the migration folder `apps/backend/dashboard/src/migrations`
- You will see there new migrations files like `1664727387344-Init.ts`
- Then need to import all files which you to the ORM config file `write-type-orm-config.ts` in array `migrations: [Init1664727387377]` this file located here `./tools`
- Run command `yarn typeorm:run-migrations` if you want to revert last migrations run this command `yarn typeorm:revert-migration`

## Turn on Husky

Just run this command `yarn prepare`

[nest.js]: https://nestjs.com/
[nodejs.dev]: https://nodejs.dev/en/
[nodejs.org]: https://nodejs.org/en/
[yarnpkg.com]: https://yarnpkg.com/
[docker.com]: https://www.docker.com/
[nx.dev]: https://nx.dev/
[.env.example]: ../../../.env.example
[postgresql.org]: https://www.postgresql.org/docs/
[typeorm.io]: https://typeorm.io/
[pgadmin.org]: https://www.pgadmin.org/
