# Fullstack intern test case

MARTIN CONNOR SEXTON

## Description

### Summary 
- I completed all nine steps outlined in the original instructions (included in the file "originalREADME.md" of this project for reference).

- I created a repository on Github for the project: https://github.com/ConCapbreton/fullstack-intern-test-case-main

- I pushed to this repository after completing each step (seperating frontend and backend where appropriate). Commit messages include the step number for easy reference.  

- You can see the code that was updated for each step at this link: https://github.com/ConCapbreton/fullstack-intern-test-case-main/commits/main/

### Install and Run the Project
-The installation of the project remains unchanged from the original instruction: 

- Ensure Docker Desktop is open.

- Open the terminal and ensure that you are in the parent folder of the project where the highest level package.json and the docker-compose files are located.

- In the terminal send the following commands:

- Launch the Docker container from the project
  ```bash
  docker compose up -d
  ```

- Install dependencies
  ```bash
  npm install --prefix apps/api
  npm install --prefix apps/web
  ```

- In a new terminal, start the backend API
  ```bash
  npm run start:api
  ```

Populate the database using the following command in another terminal:
  ```
  npm run seed
 ```

- In another terminal, start the frontend WEB
  ```bash
  npm run start:web
  ```

### Technologies
- I used Ants Design components to develop the frontend for a consistent UI / UX with the original code. 

- No new dependencies were added to the project. 

### Challenges
- I did not manage to visualise the database using the connection string included in the original code (but the app works using this connection string). As a work around I created my own mongoDB project and used that connection string to visualise data when needed. I replaced the original connection string before submitting the project. 

- For step 3, in addition to updating the relevant routes to return the course code property, I also added a code generator to automatically add a unique code when creating a course. In retrospect I'm not sure if this was required but I have left the code in place. 

- Step 6 asks to update the route "GET /api/courses/:courseId" to get the details of a course. I updated the route so the course details and it's questions are returned. I realised in subsequent steps that it was in fact better to get the questions list using the question routes (so question edits and duplications appear immediately in the list). I updated the code accordingly.   

- I completed step 7 so that the modal opened to edit a question when clicking on a row of the table. When adding the duplicate functionality for step 8 I realised it would be more user friendly to have a button for each functionality and updated the code accordingly.  

### Future development
- The CourseList and particularly the CourseDetails components include a lot of code. Adding global state management (for example createContext) would allow streamlining and improvements to readablity. 

- Introducing an Error Routing for the Frontend. 

- Host the project online (using Netlify and Render for example).

- Certain dependencies could be considered (for example axios or randomstring) to simplify certain code. 

- Development of the frontend to make use of the available backend routes (for example adding a delete button to the Course Detail table to delete questions)

## How to Use the Project

#### Course List page '/courses': 
- At the top of the page there is a search bar. 
- Users can search the course list by entering either the course title or course code.
- Search results are displayed after every keystroke. 
- The course code, title and description are displayed in the table.
- Clicking on a row in the table takes you to the course detail page for the relevant course. 

#### Course Detail page '/courses/:courseCode':
- The course title is displayed at the top of the page and all associated questions in the table below. 
- A "Back to courses" button to the left of the course title allows you to navigate back to the Course List Page. 
- There is an "edit question" and "duplicate question" button next to each question listed in the table. 
- The edit button opens a modal where you can edit the question title. Clicking cancel will exit the modal without saving changes. Clicking OK will save changes, close the modal and the Course Detail page will reload displaying the modified question in the list. 
- The duplicate button reloads the page with the duplicated question shown at the bottom of the table (the new question title is prefixed with "Duplicate: " for easy identification).
- The table shows 15 questions per page. 
- The table automatically creates new pages to accomadate courses with more than 15 questions.
- The tables pages can be navigated to using the buttons at the bottom right of the table. 