import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter as Router } from "react-router-dom";
import ItemsProvider from "../src/Providers/ItemsProvider";
import UserProvider from "../src/Providers/UserProvider";
import { ModalProvider } from "../src/Providers/ModalProvider";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

/*
habit - something you do on an ongoign basis 
todo - 

Habits...
  -write a letter to yourself 1 per week, month, etc. give the explanation given
  at the end of the "Spend Time Alone" chapter in Digital Minimalism

Ideas...
  YOUR ULTIMATE FORMULA IS SOFTWARE CRAFTSMANSHIP 6-7 P/DAY, PHYSICAL CHRAFTSMAN SHIP 2-3 - AND FUCKING PUBLISH ABOUT IT - THAT'S IT, THAT'S ALL - BIT AND ATOMS
  when you write the todo, goal, etc. it can blink on then fade into either Today or General, or pop below and rocket up into, or maybe today or general blink of sorts, OR they come open as lists
  -what's the KILLER FEATURE that provide 80% of the value?
    -can read about / grab routines, goals, etc. from popular books and follow them...  
    -you have to strike the right balance of tool/routine AND discovery   
  -make loader circle for Today and General 
  -notifications and undo when you delete
  -add all the async stuff 
  -scratch pad?
    -...or a "to learn about" 
      -maybe this is a feature too far and is actually another app 
  -make is so you can close an item
  -make edit controls revel progrssively 
  -make fixed work
  -ROSE: the daily habit
    -play an excerpt from a podcast
  -the balance between task tool and discovery platfrom 
  -ROSE: "like" a habit to show interest in it but don't necessarily 
  add the habit immediately, set it to start in X days, season, etc.
  -ROSE: start times, priority for individual todo - todays
  -enter to save/exit on edit
  -be able to drag into the unopened Log
  -clear dailes everyday into an overflow
  -when somebody makes a habit out of a goal, somehow show that relationship 
  -take a branch, make ui as minimalist as possible
  -add Rewards Feature
  -drag to change position of General and Today
  -variable todos fall back into todo - backlog at end of the day if they aren't done, and done tasks are cleared
  -add Chris's todos primer 
  -define the terms (goal, todo, habit) ui element
  -add tooltip for fixed and variable, variable: "just the normal todo (personal or professional) you'd have any one day", fixed: "something you want to ensure you do habitually" 
  -want to be able to add a task for tomorrow
  -clear the dropdown <-will probably resolve itself
  -code split out firebase so you you aren't getting it when 
  a user hits the homepage
  -before I dive into 5yr, 1yr, 1m, 1w, 1d, let's do today and the future
  -make "make notes" work
  -make show and tell feature, you can go in and look at the app (video) appears
  to your right, and it shows how it's used 
  -schedule your time
    -you have to "meet" with yourself daily - pick a time, this
    could be on the "Today's log" bar and could be super important
  -make it so the most recently created one pops on the right
  -make a filter for priority across all and individually as well
  -colored radio-ish buttons to switch between categories at the top
  -make duedate recorder and display
  -have tne name of the sole category list pop on filtering
  -the wizards could sort of autopopulate questions from inside
   the textarea just like a slick typeform does - that'd be it
    -maybe you are draggin items into certain buckets that are time bound, behavior forcing function, etc. 
  -days ago on hover for the date 
  -filtering, on hover it shows and if you click it then it goes to all of that category
  -so when you replace the dropdown with little tag like things you
  shoudl be able to tab to them and through them, even arrow keys
  
  -Fire off, fire task off to x email addres, schedule follow up in ...?, 
  -backlog items show categorization and controls on hover
  -dashboard mashup of 5 habits, 9 goals, and 21 todos, SCOREBOARD
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



ReactDOM.render(
  <Router>
    <UserProvider>
      <ItemsProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ItemsProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
