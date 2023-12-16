# International House Admin Panel

## Overview
The International House Admin Panel, a web application at the University of Chicago International House, facilitates efficient event and staff management. It streamlines administrative tasks and enhances communication. The product development of the portal was led using Sketch and Asana, with a focus on responsive design. Usability studies and UX interviews were conducted to ensure a user-friendly experience.

## Technologies
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Flask, RESTful APIs
- **Database**: MongoDB
- **Authentication**: Auth.js, JWT, Google OAuth2
- **File Storage**: Amazon S3
- **Testing & Deployment**: Cypress, PyTest, CI/CD

## Special Features
- **Automated Excel Spreadsheet Creation**: Generates spreadsheets for event organization, aiding facilities management.
- **Staffing Reminders**: Automatically issues staffing requests for under-staffed events, ensuring optimal staff allocation.

## General Features
- Event scheduling and management
- Staff management tools
- Secure authentication and session management
- Integration with Amazon S3 for file storage

## Backend Libraries
- **pandas and openpyxl**: For data wrangling, creating, and managing Excel spreadsheets.
- **PyJWT**: For validating JWT tokens.
- **Pymongo**: For secure connectivity with the MongoDB database.

## Security
- Utilizes JWT tokens and Google OAuth2 for secure user authentication.

## Prerequisites
- Node.js and npm
- Python and Flask
- MongoDB
