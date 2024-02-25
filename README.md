Projektet "ToDoList" representerar en lista med olika todos som läggs till dynamiskt i en ul-lista i html. 
Varje todo får en unik id, det kan man se i konsollen efter todo var skapad.
Man kan redigera todos text genom att trycka på den en gång och skriva in ny text istället.
Det finns möjlighet att radera todo och göra den viktig genom att trycka på utporstecken-knapp nära "delete"-knapp. Denna todo hamnar överst i listan, kommer på toppen.
Om todo är klar då markerar man den genom att trycka på checkbox, då blir texten genomstruken. En annan css-class läggs till texten.
Local storage används för att spara skapade todos i listan, de tas inte bort vid sidans refresh.
Jag skrev koden i Typescript, använde Vite.

Jag var fokuserad mest på funktionalitet, designen är ganska simpel. Programmet passar bra till att skapa korta todo-aneckningar.
om det blir mycket text, då ser det inte så snyggt ut och kräver mer styling.
