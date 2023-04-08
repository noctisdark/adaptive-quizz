# Adaptive Quiz

Adaptive Quiz is a web application that helps teachers design adaptive quizzes on a given subject, the questions presented to students can evolve according to the answers given during the assesment.

## Development Flow

The application consists of two Docker containers: one for the front-end (built with Preact), and one for the back-end (built with Flask and SQLite). To launch the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the command `docker-compose up` to start the containers.
4. Wait for the containers to build and start. This may take some time on the first launch.
5. Open your web browser and go to `http://localhost:3000` to access the front-end of the application (Boilerplate for now).

The back-end of the application runs on `http://localhost:5000`, and the front-end communicates with it through HTTP requests, receiving JSON responses.

## Architecture

The front-end of the application is built using Preact, a lightweight alternative to React. It communicates with the back-end API built with Flask, which serves as the data layer for the application. The back-end uses SQLite as its database, allowing for easy setup and deployment.

As the project is still in its early stages, there are currently no complex architecture patterns in use. However, the code is well-commented and includes hints for future architecture decisions.

**Proudly proompted with ChatGPT**