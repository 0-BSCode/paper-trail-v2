# Paper Trail

## Installation Instructions
1. Clone the repo to your local machine
2. Run `npm install` in the root directory, the client directory, and the server directory
3. Create a db on your local machine (this project uses XAMPP)
4. Change the `.env.example` file to `.env` and fill in the required values for the environment variables
5. Go into `server/` and run `npm run db-migrate -- up --step` to run all the migrations
6. Run `npm run dev` to run the server
7. On a separate terminal, go into `client/` and run `npm run dev` to run the client app

## Developer Workflow
1. Checkout to main locally and pull from main in remote repo
2. Checkout to new feature branch using the format `[first-name-initial][last-name-initial]--[feature-description]` (e.g. `bs--fix-navigation-bug`)
3. Once feature is implemented, push branch to remote repo (e.g. `git push --set-upstream origin bs--fix-navigation-bug`), make a PR, and request for review
4. Once PR is approved, merge PR to `main`

## Tooling

### Frontend
- [React](https://react.dev/)

### Backend
- [Express](https://expressjs.com/)
- [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)
- [umzug](https://github.com/sequelize/umzug)

### Database
- [XAMPP](https://www.apachefriends.org/)

