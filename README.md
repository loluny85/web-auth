# Web Auth App

Web Auth is a React web application that allows users to create an account, log in, and view their profile details. The app supports multiple languages and features a global web push notification system.

## Getting Started

Follow these steps to run the application locally:

1. Clone the repository:

    ```bash
    git clone <github-repo-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd web-auth
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    Ideal to have Node 18 and above for installation

## Firebase Configuration

The app is configured to use Firebase for user authentication and Firestore to store user information. Ensure that your Firebase configuration is correctly set up.

## Features

- **Account Creation and Login:** Users can create an account or log in if an account already exists.
- **Profile Page:** After account creation or login, users are navigated to their profile page to view their details.
- **Password Reset:** Users can reset their password by providing their email. A reset link is sent to the email for password change.
- **Multiple Languages:** The app supports multiple languages, and users can select their preferred language from the dropdown in the header.
- **Web Push Notifications:** Administrators can send global web push notifications through the Firebase Messaging section.

## RTL Support

The application supports Right-to-Left (RTL) layout for languages like Arabic.

## Push Notifications
Demo video available at https://drive.google.com/file/d/1-ujdEh6qLer424cDobX1MADmEEhBgXA_/view?usp=drive_link

## Contributing

If you would like to contribute to the project, feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).