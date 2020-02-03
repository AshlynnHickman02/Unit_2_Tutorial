"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Ashlynn Hickman
   Date: 01/27/2020  

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

//set the date displayed in the calendar
var thisDay = new Date("August 24, 2018");

//write the calendar to the element with the ID "calendar"
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

function createCalendar(calDate){
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
}

function calCaption(calDate){
   var monthName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "Novemeber", "Decemeber"];
   // var dayTime = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
   //determines the current month
   var thisMonth = calDate.getMonth();

   //determines the current day
   var toDay = calDate.getDay();

   //determines the current year
   var thisYear = calDate.getFullYear();

   //writes the caption
   return "<caption>" /*+ dayTime[toDay] + " "*/ + monthName[thisMonth] + " " + thisYear + "</caption>"
}

//function to write a table row of weekday abbr. 
function calWeekdayRow(){
   //array to hold the weekday abbr. 
   var dayName = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
   var rowHTML = "<tr>"; 

   //look through the dayName array find the day it is and pull out the name 
   for(var i = 0; i < dayName.length; i++){
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }

   //close tr 
   rowHTML += "</tr>";
   return rowHTML;
}

//function to calculate the number of days in the month 
function daysInMonth(calDate){
   //array for days in everymonth 
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   //extract the four digit year and month values
   var thisYear = calDate.getFullYear();
   
   //revise the dayCount for leapyears
   if (thisYear % 4 === 0){
      if((thisYear % 100 != 0) || (thisYear % 400 != 0 )){
         dayCount[1] = 29; 
      }
   }
   var thisMonth = calDate.getMonth();
   
   //return the number of days in the month
   return dayCount[thisMonth];
}

//function to write table rows for each day of the month
function calDays(calDate){
   //determine the starting day 
   var day = new Date((calDate).getFullYear(), calDate.getMonth(), 1); 
   var weekDay = day.getDay(); 

   //write blank spaces preceding the starting day 
   var htmlCode = "<tr>";
   for (var i = 0; i < weekDay;  i++){
      htmlCode += "<td></td>";
   } 

   //write calls for each day of the month 
   var totalDays = daysInMonth(calDate); 

   var highlightedDay = calDate.getDate();

   for (var i = 1; i <= totalDays; i++){
      day.setDate(i); 
      weekDay = day.getDay();

      if(weekDay === 0){
         htmlCode += "<tr>";
      }         

      if(i === highlightedDay){
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
      }
      else{
         htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
      }

      if(weekDay === 6){
         htmlCode += "</tr>"; 
      }
   }
   return htmlCode;
}