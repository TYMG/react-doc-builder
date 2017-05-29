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
RootReducer uses the Redux API's ```combineReducers()``` to combine all the reducers into single map of reducers. Throughout the project, the store is passed around to different components through and as props. 

A common React-Redux implementation practice throughout the project is the use of ```mapStateToProps``` and ```mapDispatchToProps```. Both are functions that returns a object containing functions that will dispatch and/or a mapping of store objects. ```mapStateToProps``` allows the component to subscribe to the store updates. Therefore, whenever the store updates, ```mapStateToProps``` is called. The results of ```mapStateToProps``` must be a plain object, which will be merged into the component’s props. ```mapDispatchToProps``` returns an object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. Example:
```javascript

import { nextFormSection, updateBackupForm } from '../../actions'

const mapStateToProps = (state) => {
    return {
        form: state.form,
        formNavigator: state.formNavigator,
        documentTypes: state.documentTypes,
        backUpForm: state.backUpForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnHomeFromFlow: _ => {
            dispatch(nextFormSection(-1))
        },
        backOneFlowStep: index => {
            dispatch(nextFormSection(index - 1))
        },
        nextFlowStep: index => {
            dispatch(nextFormSection(index + 1))
        },
        saveFormDraft: values => {
            dispatch(updateBackupForm(values))
        }
    }
}
```
#### React-Router
React-Router handles the routing of the app. Router app starts at App/index.js, where the ```BrowserRouter``` component is used to store various browser related metadata such as history. In the same directory, layout.js, handles the routing of the Home and Form routes. The Form Route uses two path params which contain the document and sub document type. Those two params determine which document was selected and retrieves the fields selected. In ```Form/layout.js```, ```createFormStepRoutes ``` creates routes for each section in the document. A form component is rendered when the route is activated. The App uses the json to determine which form component gets rendered by mapping the json value to one of ```FormMap```'s keys. 

#### React-Local-State

#### React-Form

Next Steps
=======
This app has evolved and grown over time to be what it is, ugly but working. There are a number of clean up tasks that need to be taken care of to improve the look and functionality. 
* Form
  * Validation
    
    While the form works, it's missing form validation. It's been attempted once, try again.
  * Improved Form
   
    The current state of the form is pretty bad. It's only input fields. Radio Buttons and Dropdowns need to be added. 
* Document Type Selector Drawer
  
  The Document Type Seletor Drawer (DTSD) would exist on the right side of the page. There would be a some kind of interactable that would trigger the drawer to open. There, the user could chose a different document to generate. After confiming decision to discard the current document, the user will navigate back to the Form Wizard Document Page.
  
* Document Image Preview

  A Nice-To-Have would be a component that contains a preview image of the document. The component would be in the Form Wizard Document Page. This way the user can see the finished product before proceeding.

* Style
  
  The ```style-refactor``` branch cleaned a lot of the mess, but it's very rough. The Form Review page needs to be fixed up. The Form Review page should have collapsable section to free up some page real estate.

* Code Quality

  There a number of code issues that need to be fixed.
  * Remove loops from ```DocumentTypeParser.js```. Use ```jsonQuery``` instead.
  * Remove unused package dependencies from code and ```package.json```
  * Create shared exported functions for Form Components. Remove redundant code from each.

Final Vision
=======
It would be really nice to integrate this app with a backend API that can use libraries such as PDFReactor and Mustache to generate document, send a copy to RestHeart, and return a copy to the user.
