# Document Generator

[TOC]

------

## Purpose

Create a tool that functional and developers alike can use to generate documents, such as Correspondence and MPN, without the need of SL.gov or COD Web.

------

## Design

### Overview

There will be two components, a Backend and a Frontend. The Java based backend will serve as a REST API Endpoint, where GET requests are used to create Documents which are returned as responses to callers. The JavaScript based front end app will be a SPA where users can create Documents by selecting a Document Type, and filling out a form containing metadata. The User would submit the form, which would make a call to the backend to generate the document, once the completed document is return, the front end displays it to the used. There if the user wishes, they can download the document. 

The Backend should be able to generate PDFs using the XSLs that are in SVN or in the database. 

### Stack

* Backend
  * Java
  * Maven 
  * Spring
    * RestTemplate
* Front End
  * JavaScript
  * ReactJS
    * Redux
    * Redux-Form
    * React-Router
    * Redux-Localstore
  * Webpack
  * Bootstrap

### Model

#### Backend

* Address - Since the Address will the same, it can get it's own object
* Form (Interface)
  * What are the common fields that the form will have?
    * First Name
    * Last Name
    * Address
      * Primary
      * Secondary
      * City
      * State
      * Zipcode
    * School
      * Name
      * Address

#### Front End

* Components

  * App
  * Home
  * DocumentType
  * EndorserAddendum
  * MPN
  * Correspondence

  ​

### Workflow

1. createCorrDocument
   - [ ] Successfully takes in correspondence form
   - [ ] Vets the form for key pieces of data
         - [ ] If certain pieces of data are missing, Return Status Code Error
   - [ ] Figure Out which Correspondence is being created using the Path Variable
         - [ ] Create the Correspondence Data Object
               - [ ] How to Create the Corr Data Object?
                     - [ ] Multiple Methods Calling Getters and Setters
         - [ ] Convert the Correspondence Data Object to XML
   - [ ] Call DocumentGeneratorManager.createCorr(Data data)
2. createMPNDocument
3. createEADocument

------

## Benchmarks, Tasks and SubTasks

- [ ] Completed!

      - [ ] Back End Completed

            - [ ] Develop the Model

                  - [ ] Interfaces
                        - [ ] Address
                        - [ ] Form

            - [x] Create Document Controller Class

                  - [x] Create Create Document Method
                        - [x] Should Take In JSON or XML?
                              - [x] JSON!!!

            - [x] ~~Add the DL-Service-Impl Dependency~~

                  Note: I tried 4/13 to import the Maven Dependencies, but with no success. I ran into vagues issue that i didnt feel like debugging

      - [ ] Document Creation Functionality

            - [x] Take in JSON from the Web Services
            - [x] Test Data Object Creation
                  - [x] Created JUnit Tests
            - [ ] Test Data Object to XML Conversion

      - [ ] Front End Completed

            - [x] Create React Project

                  - [x] Create Home Page

                        - [x] Create a drop down menu containing the Possible Document Type

                              * EA
                              * PDF - Should have an additional drop down for 
                                * PLUS
                                * SUB/Unsub
                              * Corr - Should have an additional drop down for each Corr Type

                        - [x] Create Drop Down for the Corr and MPN sub types when they are selected

                        - [x] When a Drop Down is Selected, it should activate the corresponding Component

                              - [x] Update the documentTypeSelection function to include the SubTypes
                              - [x] Update MPN and Corr Components to Update Form fields when a subtype is selected.
                                    - [x] Map the Corr Fields to get a better understanding of the Common Fields

                        - [x] Put the defaultProps in the App component

                              - [x] Create a giant JSON file that contains, the Types and SubTypes (And Fields?)

                                    The JSON file will basis of the App. It will contain Types and SubTypes, and Fields. That way, the object literal can be passed around easier. And when it's time to create the form fields for Correspondence, the JSON can iterated through using the Map function. 

                        - [x] Update documentTypeSelection to return an Object Literal that contains the Doc Type and Sub Type,

                        - [x] In order to fine tune the Form Fields display, In the Fields section of the JSON, Add a Section Field to group the fields into sections so that way, when creating the forms, each section can be seperated and is clearer visually to fill out

------

# React... Redux... Refactor!

I need to refactor this project to include Redux into the project's ecosystem. Redux-Form, an off shoot of Redux will be included for form validation.

### Notes:

* https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124 
* http://redux-form.com/6.6.3/docs/GettingStarted.md/

### Component Hierarchy

* Root
  * App
    * Header
    * Home
    * Form
      * FormHome
        * Props
          * selectedDocumentType
      * FormSection
        * Props
          * documentTypeSection
          * form
        * FormField
      * FormReview
    * Footer

### Store

A Store is constructed with a number of reducers 

{

documentTypes <-- Initial : [ array of doc types ],

selectedDocumentType: <-- The Document Type that is selected, contains the Sections and Input Fields, not just the name.

* Actions
  * ModifySelectedDocumentType

form: <-- the Current Form, when the flow starts, it should be blank. the form should fill out as the user moves through the flow, as the user moves forwards and backwards, the form should be used to fill out the FormSection component

* Form
* SectionIndex
  * Actions
    * CreateForm
      * Also Creates the Section Index
    * UpdateForm
    * SubmitForm

FormNavigator: Will handle the navigation of the form. FormNavigator will 

}

## Document Creation Web Flow

![20170430_005719](C:\Users\Matthew.A.Green\Downloads\20170430_005719.jpg)

* Form Home
* Form Section
* Form Review

## Form Wizard 

Using the redux-form create a Form that can be validated. The issue is that redux-form  API's reduxForm directly conflicts with the react-router's withRoute method. Therefore the actual Form itself will have to be nested inside the FormSection Component.

The Form needs to be programatically built using the input arr from a Document Type Section. So for each item in input[] create a FormInput, which consists of a Field Component that contains a renderField, which is a label and input.

For the onSubmit there should be dispatch call to update the Form, update the formNavigation. 

Redux-Form has "actions" that can be used to control the form 



FormSection : props - section, docTypeSections,  state props - form, formNavigator, documentTypes

* Should contain the forward and back buttons, also should contain the 

​	Form - Will contain the reduxForm; props: section 

​		Also the Form will determine the name of the section

​		Loop through the sections building FormFields		

```html
<div>
 <FormField section={section}></FormField>
</div>
```

​					 

​		Field - A Single field component

## Form Final Design

Right now, I have a problem. I want to submit the form on the review page, but there is no Form associated with the page. I need a form because I can use React-Form's Submit functionality. 

------

# Style Refactoring

At this point it's too difficult to style the FormStep while accounting for the different form fields lengths. Right now the EA and MPN Endorser and Borrower Steps are too long. Therefore, I'm going to create Form Components for each possible step of the Document Creation Process.

* EAMPNForm - Section Name will have to be programmatically 
* ReferenceForm - ""
* SchoolForm

So in order to leverage these forms, when the user selects the document type, the Form Router will programmatically creates routes for each step, with each step using one of the forms as the components.

Refresher: What are the 'refs' in the Section portion of the JSON being used for?

It looks like the Section ref property is being used by Routes/Form/layout.js to create a key for each form Step.

Also it seems to be used to in FormHome.js as well as a key for each List Item in the Section List

#### Update: 

~~Since the ref doesnt have a specific purpose, they will be repurposed to be used to determine which form component will be used. The values and the form component mappings are as follows (Note: The 'form' suffix may need to be removed from the exported name to ease in match):~~

*  Mapping Value : Component
* ~~"CorrespondenceInfo" : CorrespondenceInfo{Form}~~
* ~~"CreditBureau" : CreditBureau{Form}~~
* ~~"EAMPNPerson" : EAMPNPerson <-- FKA EAMPNBorrower~~

#### Update: 

Strings cannot be used to dynamically render React Components, on Functions can. 

## How to refactor the Form Routes

For the most part, the createFormStepRoutes can stay the same, but there will need another function that programatically determines which Component needs to be utilize. That function needs to return a string.



### Which props should be passed down to the child form components?

* Section - Name and Fields
* DocTypeSections - Navigation purposes.

##  

------

# Known Issues

- [x] The Form Redux object will blank out if the page is refreshed.
- [ ] When the Form is being created, it should create and return a promised that states, whether the form creation fails or is successful, that the page user will be redirected back to the home page. 
- [ ] The Endorser Form Step is too big for the size of the Div; Text Overflow
      - [ ] Expand the Div to make all the text fit
      - [ ] Add a scroll Bar to the Form
      - [ ] Style the Input fields to be two columns
- [ ] SubmitForm method is building the Post URI incorrectly
      - [ ] Update the EA Endpoint; It's easier

------

# Future Fun

- [ ] Blocking the transition when the a user changes the Document Type while in the middle of the flow
- [ ] Remembering the values inputted if the user goes backwards
- [ ] Breadcrumbs
- [ ] Create a Form Component for each subset of Form Data, Endorser, Employer Etc
- [ ] STYLE!!!
- [ ] Form Validation 

------

