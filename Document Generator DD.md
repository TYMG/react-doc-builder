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