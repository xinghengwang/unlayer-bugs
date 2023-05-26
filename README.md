# This is to illustrate a bug that with Unlayer.

So two issues:

* Whenever the show modal from react bootstrap modal, the EmailEditor seems to reinitiate for some reason. `onReady` hook is called again. Thus destroying any of my edits.
* See video here: https://www.loom.com/share/09c385c4fcc5421ea5f083e1c74fa4cd
* The modal adds a new merge tag called "NEW_TAG", and the we call the editor to setMergeTag with the new updated, but it does not show.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run start.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

