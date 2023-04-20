This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


## Run in Docker Environment

Before you begin, you'll need to have Docker installed on your machine. If you haven't already installed it, you can follow the installation instructions for your operating system on the official Docker website: https://docs.docker.com/get-docker/

To run the app in a Docker environment, follow these steps:

- Clone the repository to your local machine.
- Navigate to the root directory of the project in your terminal.
- Run the following command:

```sh
docker-compose up --force-recreate
```

The `docker-compose up --force-recreate` command starts the container defined in the `docker-compose.yml` file. The `--force-recreate` flag forces recreation of containers even if their configuration appears to be unchanged. This is useful when you want to make sure you are running the latest version of the container.

This command will start the container and map port `3000` on the container to port `3000` on your local machine. You can access the app by opening http://localhost:3000 in your web browser.

To stop the container, use `Ctrl + C` in your terminal or run the following command:

```sh
docker-compose down
```

That's it! You now have the Next.js app running in a Docker container. You can make changes to the app by modifying the files in the pages directory, and the changes will be automatically reflected in the running container.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
