import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter as Router } from "react-router-dom";
import ItemsProvider from "../src/Providers/ItemsProvider";
import UserProvider from "../src/Providers/UserProvider";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

/*
habit - something you do on an ongoign basis 
todo - 

Ideas...
  -filtering, on hover it shows and if you click it then it goes to all of that category
  -Fire off, fire task off to x email addres, schedule follow up in ...?, 
  -backlog items show categorization and controls on hover
  -voice to written backlog item
  -make it a PWA
  -Dalies Feature - checklist of things you wanna do daily
    -and maybe that surfaces articles, enforcement mechanisms, etc.
    -or or or perhaps this could be your set daily + your variable for the day
    DESING NOTE for the above:
      -these options will sit right beneath the controls and when you 
      hit the controls roll down it'll cover them, and then that way
      the items list doesn't move either
  
  -mTurk worker does something 
  -things to ponder and articulate wizard/tracker
  -what you should be doing Wizard?
  -what should you do? make a budget, make a 5 year plan, x, y, z
    -kinda sit or could pop from somewhere
    -BackLife, because there's a lot of shit you still gotta do
  UI
    -make a mini grey out menu of the operations
    pop on writing text, it sort of fades in as you 
    start writing, it fades in to view on each 
    keystroke, that'd be tight
    https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css

Color Pallet...
https://colorhunt.co/palette/156756
#f6f6f6 - super light grey
#eae9e9 - modeately light grey
#d4d7dd - blue-ish grey
#420000 - brown-maroonish



*/

const fakeData = [
  {
    id: "123",
    title: "call Miriam to set up meeting",
    description:
      "Set up a meeting with Miriam to find how how much the company currently owes in taxes, ask if I can count on her to let me know everything we have to do to keep the company compliant, form up a rough tax plan, payment plan, asset justification plan moving forward.",
    date: new Date(),
    help: false,
    category: "todo",
    priority: 5,
    notes: ""
  } /*,
  {
    text: 'buy plywood to top microgreens rows',
    description: 'got to homecenter, by the wood and have it cut',
    date: new Date(),
    help: false,
    category: 'todo',
    priority: 5,
    notes: ''
  },
  {
    text: 'find gardening book and read',
    description: 'find the book, set aside time to read it and increase your knowledge of farming.',
    date: new Date(),
    help: false,
    category: 'habit',
    priority: 5,
    notes: ''
  },
  {
    text: 'get a job',
    description: 'apply for react jobs, fullstack js jobs, etc.',
    date: new Date(),
    help: false,
    category: 'goal',
    priority: 5,
    notes: ''
  },
  {
    text: 'interview with FII.org',
    description: 'prep for the interview',
    date: new Date(),
    help: false,
    category: 'appt',
    priority: 5,
    notes: ''
  },
  {
    text: 'make a budget!',
    description: 'subscribe to a service (YNAB?) and start keeping track of all your damn expenses.',
    date: new Date(),
    help: false,
    category: 'habit',
    priority: 5,
    notes: ''
  }*/
];

ReactDOM.render(
  <Router>
    <UserProvider>
      <ItemsProvider>
        <App data={fakeData} />
      </ItemsProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
