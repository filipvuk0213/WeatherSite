"use strict";

let button = document.querySelector('.search button') //Genom detta söker funktionen igenom olika delar för att hitta den första bästa för användning
let inputvalue = document.querySelector('.sökning'); //Liknande princip som i den föregående delen
let stad = document.querySelector('.stad'); //Genom denna funktionen letar dator igenom dem olika listor för att hitta en stad som matchar det användaren har sökt efter
let väder = document.querySelector('.väder'); //Samma princip som föregående funktion fast för väder
let vind = document.querySelector('.vind'); //Samma princip som föregående funktion fast för vind
let idag = document.querySelector('.idag'); //Samma princip som föregående funktion fast för beskrivning om det är soligt, molnigt eller något annat
let luften = document.querySelector('.luften'); //Samma princip som föregående fast för luftfuktigheten


button.addEventListener('click', function(){ //Denna funktionen aktiveras när användaren trycker på sökknappen och med en listener gör att den lyssnar efter handlingar som ska ge en output
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +inputvalue.value+ '&lang=sv&units=metric&appid=ba344b787d8d0e938335be0d252f6ead') //API hämtad från OpenWeatherMap med hjälp av deras funktioner för att hämta adressen och API key
    .then(response => response.json()) //En response görs till json som utför sökning bland informationen i konsollen
    .then(data => { //data som skannas igenom för att hitta den som matchar inputen
        let stadvalue = data['name']; //Datorn letar efter rätt namn på staden för att ge en korrekt output
        let vädervalue = data['main'] ['temp']; //Datorn letar efter temperaturen som matchar den staden för att ge en korrekt output
        let vindvalue = data['wind'] ['speed']; //Här letar datorn igenom informationen för att hitta värdet på vinden som matchar den staden som användaren har skrivit in
        let idagvalue = data['weather'] [0] ['description']; //Här letar datorn igenom informationen för att kunna skicka ut en beskrivning av hur det är i den staden idag
        let luftenvalue = data['main'] ['humidity']; //Denna funktionen gör att datorn letar igenom informationen för att hitta rätt luftfuktighet för den valda staden

        stad.innerHTML = stadvalue; //Datorn skriver ut genom detta korrekt namn på staden
        väder.innerHTML = vädervalue + "°C"; //Genom detta skriver datorn ut information om hur många grader det är i den staden i celsius
        vind.innerHTML = "Luftvind: " + vindvalue + "m/s"; //Datorn skriver ut genom detta hur många meter i sekunden vinden blåser i staden
        idag.innerHTML = idagvalue; //Datorn skriver ut om det är soligt, molnigt eller något annat
        luften.innerHTML = "Luftfuktigheten idag: " + luftenvalue + "%"; //Med  hjälp av detta skriver datorn ut vad luftfuktigheten är
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+stadvalue+"')" //Detta är en url för hemsidan som innehåller bilder som jag har använt mig av som finns i bakgrunden, länken gör att en bild kommer att visas medan +stadvalue gör att den bilden som visas kommer så bra som möjligt att mactha staden som användaren har sökt efter o visa en bild från den staden
        console.log(data) //Data skrivs ut i konsollen
    })
    .catch(error => alert("Namn på staden är fel!")) //Om användaren skriver in en stad felaktlig, kriver in en stad som ej finns eller en stad som ej finns i databasen skrivs det här meddelandet ut
});


