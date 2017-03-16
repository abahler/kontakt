"use strict";

const MOCK_CARD = {
    firstName: 'Alex',
    lastName: 'Bahler',
    userName: 'abahler',
    occupation: 'Software Engineer',
    professionalSummary: 'Experienced architect and programmer focused on elegant, scalable solutions',
    company: 'Kontakt',
    phone: '555-630-2112',
    addlNote: ''        // Optional, customizable note per card sent. Default to empty string.
};

const MOCK_USERS = {
    users: [
        {
            id: 1001,
            firstName: 'Adam',
            lastName: 'Smith',
            username: 'devguy44',           // Users can choose a handle for easier searching
            avatar: 'images/users/1001.jpg' // Would be automated on backend to save to 'images/users/{id}.{extension}'
        },
        {
            id: 2001,
            firstName: 'Andre',
            lastName: 'Young',
            username: 'DrDre',
            avatar: 'images/users/2001.jpg'
        },
        {
            id: 3001,
            firstName: 'Diana',
            lastName: 'Luna',
            username: 'dluna',
            avatar: 'images/users/3001.jpg'
        }
    ]
};

const MOCK_KONTAKTS = {
    kontakts: [
        {
            firstName: 'Cara',
            lastName: 'Smith',
            occupation: 'CIO',
            professionalSummary: 'Realizing visions to aid in delivering results to stakeholders',
            company: 'Widgets Inc.',
            phone: '555-312-6990',
            addlNote: "Nice meeting you at OSCON! Let's keep in touch."
        },
        {
            firstName: 'Omar',
            lastName: 'Rodrigo',
            occupation: 'Web Developer',
            professionalSummary: 'Full stack developer with a focus on maintainable, modular code',
            company: 'BlueSky Development',
            phone: '555-827-1737',
            addlNotes: "Glad we could swap some knowledge at the meetup! Check out my Github."
        },
        {
            firstName: 'Elizabeth',
            lastName: 'Letterman',
            occupation: 'Graphic Designer',
            professionalSummary: 'Creator of visually appealing and intuitive designs for web and print',
            company: 'self-employed',
            phone: '555-727-2469',
            addlNotes: ''
        }
    ]
};

const MOCK_INBOX = {        
    cards: [
        {
            firstName: 'Elizabeth',
            lastName: 'Letterman',
            occupation: 'Graphic Designer',
            professionalSummary: 'Creator of visually appealing and intuitive designs for web and print',
            company: 'self-employed',
            phone: '555-727-2469',
            addlNotes: '',
            read: true          // Note the additional property to tell if it has been read or not
                                // If the user 'accepts' the card and puts it in their kontakts, this won't be displayed
        },
        {
            firstName: 'Jose',
            lastName: 'Montenegro',
            occupation: 'Project Manager',
            professionalSummary: '',
            company: 'Allspace',
            phone: '555-827-7236',
            addlNotes: 'Good meeting you at the event Friday. Let me know if you want to talk more about homebuying',
            read: false
        }
    ],
    messages: [         // cards.length does not have to equal messages.length. These are separate categories.
        // Users can only send messages to their kontakts
        {
            from: 'Elizabeth Letterman',
            date: '2017-03-11',
            time: '4:36 PM',
            message: 'Hey Alex! How about coffee soon? Would love to talk about how I could help with your app',
            read: false
        },
        {
            from: 'Omar Rodrigo',
            date: '2017-02-28',
            time: '12:02 AM',
            message: 'Don\'t answer now, but there\'s a new Github issue on my project that you should take a look at',
            read: true
        }
    ]
};

/*
Example from the lesson has three functions: 
    1. Get updates (receives a callback function, calls it, passing it data from global scope)
        * This is the only function that changes in production, when it uses AJAX to hit a real endpoint 
            instead of merely calling setTimeout()
    2. Display updates
    3. Get and display updates (receives no args, but inherently calls #1, passing it #2)

*** Nomenclature and responsibilities: ***
getFoo(cb) = receives callback function `cb`, and calls that function, passing it data
displayFoo(d) = Takes data object `d`, builds markup and modifies DOM 
                (doesn't return anything, b/c the data is already assembled and returned by API)

Typical call:
getFoo(displayFoo);
*/

// 'My Card' screen
let getCard = (cb) => {                 // Takes callback as usual, but 
    setTimeout(cb(MOCK_CARD), 3000);
};
let displayCard = (data) => {};

/* --- 'Search Users' screen --- */
let getUserSearch = (cb) => {
    setTimeout(cb(MOCK_USERS), 3000);
};       
let displayUserSearch = (data) => {};   // This displays users that match the search term, or a 'Start typing a name...' message

/* --- 'Send Card' screen --- */
// Note: no accompanying 'get' function here, 
// because getCard can be called with the displayCardBeforeSend function as a callback
// (only a couple differences between displaying card for reference and displaying before sending)
let displayCardBeforeSend = (data) => {
    // Display all the usual information the user would see in their own
    displayCard(data);
    
    // And add/modify fields for customization
};

/* --- 'My Kontakts' screen --- */
let getKontakts = (cb) => {
    setTimeout(cb(MOCK_KONTAKTS), 3000);
};
let displayKontakts = (data) => {};

/* --- 'My Inbox' screen --- */
// (includes 'cards' and 'messages' in reverse chron order, with tab options to see one or both categories)
let getInbox = (cb) => {
    setTimeout(cb(MOCK_INBOX), 3000);
};
let displayInbox = (data) => {};

/* --- Top-level wrapper function --- */
let getAndDisplayView = (cb) => {       // Abstraction equivalent to lesson's getAndDisplayStatusUpdates()
                                        // Takes one callback because we're using it for multiple views
    cb();
};

$(document).ready( () => {
    // Default view will be 'My Card' (for now, the MVP phase)
    getAndDisplayView(getCard);
});