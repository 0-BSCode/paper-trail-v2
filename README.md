# Paper Trail

## Installation Instructions
1. Clone the repo to your local machine
2. Run `npm install` in the root directory, the client directory, and the server directory
3. Create a db on your local machine (this project uses XAMPP) called `paper_trail_db_v2`
4. In `server/`, change the `.env.example` file to `.env` and fill in the required values for the environment variables
5. In `server/`, run `npm run db:up` to run all the migrations and seeders
6. Run `npm run dev` to run the server
7. On a separate terminal, go into `client/` and run `npm run dev` to run the client app
8. This project uses Convex to manage document files. If you want access to it, please reach out to `bipsanchez.work@gmail.com`. **Note:** Without access to Convex, user won't be able to create and edit documents.

## Developer Workflow
### Working on a feature/bug
1. Checkout to main locally and pull from main in remote repo
2. Checkout to new feature branch using the format `[first-name-initial][last-name-initial]--[feature-description]` (e.g. `bs--fix-navigation-bug`)
3. Once feature is implemented, push branch to remote repo (e.g. `git push --set-upstream origin bs--fix-navigation-bug`), make a PR, and request for review
4. Once PR is approved, merge PR to `main`

### Creating a migration
1. Change into the server directory and run `npm run db:migrate -- create --name [migration-name].ts`
2. Remove the boilerplate, as it doesn't play well with TS, and replace it with the boilerplate found in the previous migrations
3. Make the changes you want to place in the db inside the `up` function and make sure the `down` function reverses these changes
4. To apply the migration, run `npm run db:migrate -- up`. To revert it, run `npm run db:migrate -- down`

### Creating a seeder
1. Change into the server directory and run `npm run db:seed -- create --name [seeder-name].ts`
2. Remove the boilerplate, as it doesn't play well with TS, and replace it with the boilerplate found in the previous seeders
3. Specify the data that you want placed in the db inside the `up` function and make sure the `down` function reverses these changes
4. To apply the seeder, run `npm run db:seed -- up`. To revert it, run `npm run db:seed -- down`

## Tooling

### Frontend
- [React](https://react.dev/)

### Backend
- [Express](https://expressjs.com/)
- [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)
- [umzug](https://github.com/sequelize/umzug)

### Database
- [XAMPP](https://www.apachefriends.org/)
- [Convex](https://www.convex.dev/)
