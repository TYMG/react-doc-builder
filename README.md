React Doc Builder
======
A Form Wizard React App 
------
This project was built using:
* React
* React-Redux
* React-Router
* React-Form
* React-Local-State

The goal of this project was to create a single page app form wizard. The user would select a document and sub document type (if necessary) for the form they wanted to fill out. The user would then fill out that form, which when reviewed and submitted, a PDF copy of the form would be returned.

## Running The App
```
npm install
npm start
```
The project will run on localhost:3000

## How It Works
### Overview
The project starts with React. React is what is use to render the App to the DOM. Redux is used to manage the App's state; Local-State backs up the Redux state to memory in case of page refresh. Router allows the app to use the URL to render different components. Redux Form builds the form, and handles validation.
#### React
The project begins with index.js and index.html. Index.js is used to render the app on index.html. Additionally in index.js, the redux store is created using the imported RootReducer from ```RootReducer.js```. Lastly, the App that is being rendered is the Redux's Provider.
#### React-Redux
React-Redux, stores the state of the Application in a single store. Redux uses actions and reducers to maintain state by dispatching actions to trigger reducers. All the app's reducers are stored in the Reducers folder. Each reducer is responsible for a single object in the state. For example, DocumentTypes.js is responsible DocumentTypes.
RootReducer uses the Redux API's ```combineReducers()``` to combine all the reducers into single map of reducers.
#### React-Router
React-Router handles the routing of the app.
