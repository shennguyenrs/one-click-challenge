# One Click LCA - Frontend Developer challenge

### About

I developed this exercise using these technologies:

- [Next Js](https://github.com/vercel/next.js): A full-stack framework of [React Js](https://reactjs.org/) helps to build frontend and backend.
- Frontend styling was used [TailwindCSS](https://github.com/tailwindlabs/tailwindcss).
- Backend of application handles API routes for authentication, creating, deleting user accounts, geting resources data from [MongoDB](https://www.mongodb.com/) database.

### Usage

Because I developed and runned application inside containers, the requirements is [installed Docker](https://www.docker.com/products/docker-desktop/alternatives/) in your machine.
Then you need to add the `.env` files to `mongodb` and `.env.local` to `frontend-dev` directory.

- The `.env` file for `mongodb` folder

```bash
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
```

- The `.env.local` file for `frontend-dev` folder

```bash
MONGO_URI=mongodb://mongodb:27017/${DATABASE_NAME}
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
JWT_SECRET=
```

Finnaly, run the production services services using `docker-compose`

```bash
docker-compose -f ./docker-compose.prod.yaml up
```
