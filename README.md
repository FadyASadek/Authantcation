# Secure Authentication: Angular & ASP.NET Core API


A full-stack project demonstrating a secure user authentication system built with Angular, ASP.NET Core Web API, and SQL Server. This system provides complete Sign-Up and Sign-In functionality using modern security practices like JWT authentication.

##  Core Features

* **Secure JWT Authentication:** Uses JSON Web Tokens (JWT) for securing API endpoints.
* **Password Hashing:** All user passwords are securely hashed before being stored in the database.
* **Responsive UI:** A clean and modern user interface built with Angular that works on all screen sizes.
* **RESTful API:** A well-structured backend API for handling all authentication logic.
* **Scalable Architecture:** Designed with a clean separation of concerns for future scalability.


##  Technology Stack

* **Frontend:** Angular
* **Backend:** ASP.NET Core Web API
* **Database:** Microsoft SQL Server
* **API Security:** JWT (JSON Web Tokens)

##  Future Enhancements

* **Authorization (RBAC):** Implementing Role-Based Access Control to manage user permissions.
* **User Dashboard:** Developing an intuitive dashboard for authenticated users.
* **Password Recovery:** Adding a "Forgot Password" feature.


##  Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:
* [.NET 8 SDK (or your version)](https://dotnet.microsoft.com/download)
* [Node.js and npm](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli)
* SQL Server

### Backend Setup (ASP.NET Core API)

1.  Clone the repository:
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  Navigate to the backend project folder:
    ```sh
    cd your-repo-name/BackendProjectFolder
    ```
3.  Update the database connection string in `appsettings.json`.
4.  Apply the database migrations:
    ```sh
    dotnet ef database update
    ```
5.  Run the backend server:
    ```sh
    dotnet run
    ```

### Frontend Setup (Angular)

1.  Navigate to the frontend project folder:
    ```sh
    cd your-repo-name/FrontendProjectFolder
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Run the Angular development server:
    ```sh
    ng serve
    ```
4.  Open your browser and navigate to `http://localhost:4200/`.

