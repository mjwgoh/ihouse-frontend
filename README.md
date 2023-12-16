# International House Admin Panel

![image](https://github.com/mjwgoh/ihouse-frontend/assets/86610705/21eddd72-1ba4-400b-85a7-4a499b6b461c)
![image](https://github.com/mjwgoh/ihouse-frontend/assets/86610705/620b56d8-47e6-45a1-bc70-7c2fad05c032)
![image](https://github.com/mjwgoh/ihouse-frontend/assets/86610705/a4e58dae-8246-4b63-8154-58c78bb9f7da)


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
- **Fun Loading Pages**: Funny loading pages with 50 custom loading messages (e.g. "rerouting squirrels to the main quad... this may take a while") to improve UX

## General Features
- Event scheduling and management
- Staff management tools
- Secure authentication and session management
- Integration with Amazon S3 for file storage

## Backend Libraries
- **pandas and openpyxl**: For data wrangling, creating, and managing Excel spreadsheets
- **PyJWT**: For validating JWT tokens
- **Pymongo**: For secure connectivity with the MongoDB database

## Security
- Utilizes JWT tokens and Google OAuth2 for secure user authentication

## Prerequisites
- Node.js and npm
- Python and Flask
- MongoDB
