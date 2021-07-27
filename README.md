# BSA 2021 | CodeTrainer

> Train you programming skills with **CodeTrainer**!

## Code quality

Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md) rules are enforced during code review and audit.

## Branches

In this project we follow with [Pull Request process](https://help.github.com/en/articles/about-pull-requests).

Normal flow is to create new branch for each task or group of linked tasks. Name of branch **must** have next structure:

`<prefix>/<problem-name>`

Allowed prefixes: `feature/`, `patch/`, `fix/`.
Problem name it's a text summary of problem or ticket id.

Examples:

-   `fix/user-profile-avatar`
-   `fix/#543`
-   `patch/button-styles`

After task is completed ― create PR of your branch into `develop`.

## How to run?

-   `npm install` inside both client and server folders
-   create `.env` config file (see `.env.example`) in server folder
-   `docker-compose up` to start database
-   `npm start` for both client and server
-   VSCode shared settings included
