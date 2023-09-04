# Running the Development Environment

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/), which contains the Docker Daemon and the Docker Compose utility.

2. Run these commands below:

```bash
npm run docker:start # starts the development server and exposes port 3000
npm run docker:stop  # stops the
```

> If you have previously ran an outdated build, you need to run `docker image rm paper-trail` first.
