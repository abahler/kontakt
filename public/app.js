"use strict";

/*
 * Mock data
 */
const MOCK_CARD = {
    firstName: 'Alex',
    lastName: 'Bahler',
    userName: 'abahler',
    occupation: 'Software Engineer',
    professionalSummary: 'Experienced architect and programmer focused on elegant, scalable solutions',
    company: 'Kontakt',
    officePhone: '555-630-2112',
    cellPhone: '',
    addlNote: ''        // Optional, customizable note per card sent. Default to empty string.
};

const MOCK_USERS = {
    users: [
        {
            id: 1001,
            firstName: 'Adam',
            lastName: 'Smith',
            userName: 'devguy44',           // Users can choose a handle for easier searching
            avatar: 'images/users/1001.jpg' // Would be automated on backend to save to 'images/users/{id}.{extension}'
        },
        {
            id: 2001,
            firstName: 'Andre',
            lastName: 'Young',
            userName: 'DrDre',
            avatar: 'images/users/2001.jpg'
        },
        {
            id: 3001,
            firstName: 'Diana',
            lastName: 'Luna',
            userName: 'dluna',
            avatar: 'images/users/3001.jpg'
        }
    ]
};

const MOCK_KONTAKTS = {
    kontakts: [
        {
            firstName: 'Cara',
            lastName: 'Smith',
            userName: 'csmith',
            occupation: 'CIO',
            professionalSummary: 'Realizing visions to aid in delivering results to stakeholders',
            company: 'Widgets Inc.',
            officePhone: '555-312-6990',
            cellPhone: '555-802-1102',
            addlNote: "Nice meeting you at OSCON! Let's keep in touch."
        },
        {
            firstName: 'Omar',
            lastName: 'Rodrigo',
            userName: 'flashman99',
            occupation: 'Web Developer',
            professionalSummary: 'Full stack developer with a focus on maintainable, modular code',
            company: 'BlueSky Development',
            officePhone: '555-827-1737',
            cellPhone: '555-111-0101',
            addlNotes: "Glad we could swap some knowledge at the meetup! Check out my Github."
        },
        {
            firstName: 'Elizabeth',
            lastName: 'Letterman',
            userName: 'ByDSyn',
            occupation: 'Graphic Designer',
            professionalSummary: 'Creator of visually appealing and intuitive designs for web and print',
            company: 'self-employed',
            officePhone: '555-727-2469',
            cellPhone: '',
            addlNotes: ''
        }
    ]
};

const MOCK_INBOX = {        
    cards: [
        {
            firstName: 'Elizabeth',
            lastName: 'Letterman',
            username: 'ByDSyn',
            occupation: 'Graphic Designer',
            professionalSummary: 'Creator of visually appealing and intuitive designs for web and print',
            company: 'self-employed',
            officePhone: '555-727-2469',
            cellPhone: '',
            addlNotes: '',
            read: true          // Note the additional property to tell if it has been read or not
                                // If the user 'accepts' the card and puts it in their kontakts, this won't be displayed
        },
        {
            firstName: 'Jose',
            lastName: 'Montenegro',
            userName: 'jaymo808',
            occupation: 'Assistant Branch Manager',
            professionalSummary: '',
            company: 'Allspace',
            officePhone: '555-827-7236',
            cellPhone: '',
            addlNotes: 'Good meeting you at the event Friday. Let me know if you want to talk more about homebuying',
            read: false
        }
    ],
    messages: [         // cards.length does not have to equal messages.length. These are separate categories.
        // Users can only send messages to their kontakts
        {
            from: 'Elizabeth Letterman',
            dateTime: '2017-03-11 4:36 PM',
            subject: 'Coffee??',
            message: 'Hey Alex! How about coffee soon? Would love to talk about how I could help with your app',
            read: false
        },
        {
            from: 'Omar Rodrigo',
            dateTime: '2017-02-28 12:02 AM',
            subject: 'Github issue',
            message: 'Don\'t answer now, but there\'s a new Github issue on my project that you should take a look at',
            read: true
        }
    ]
};

/*
 * Screens
 */

// 'My Card'
let getCard = (cb, isEditable) => { 
    setTimeout(cb(MOCK_CARD, isEditable), 3000);
};
let displayCard = (data, editable) => {
    // build HTML with `data`
    let editIcon = '';
    if (editable) {     // True if we're on the 'send your card' screen
        editIcon = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
    }
    
    let output = `<p>First name: ${data.firstName} ${editIcon}</p>`;
    output += `<p>Last name: ${data.lastName} ${editIcon}</p>`;
    output += `<p>Username: ${data.userName} ${editIcon}</p>`;
    output += `<p>Occupation: ${data.occupation} ${editIcon}</p>`;
    output += `<p>Professional summary: ${data.professionalSummary} ${editIcon}</p>`;
    output += `<p>Company: ${data.company} ${editIcon}</p>`;
    output += `<p>Office Phone: ${data.officePhone} ${editIcon}</p>`;
    
    // Above fields are required. Provide fallback message if optional one has no value.
    let phoneVal = data.officePhone || 'Add an office phone';
    output += `<p>Cell Phone: ${phoneVal}</p>`;
    
    $('#root').html(output);
};

// 'Search Users'
let getUserSearch = (cb) => {
    setTimeout(cb(MOCK_USERS), 3000);
};       
let displayUserSearch = (data) => {
    // Assume there are users to choose from
    let users = data.users;
    let output = '<ul>';
    users.forEach( (v,i) => {
        output += '<li><img src="${v.avatar}" /><p>${v.username}<br />${v.firstName} ${v.lastName}</p></li>';
    });
    output += '</ul>';
    
    $('#root').html(output);
};   // This displays users that match the search term, or a 'Start typing a name...' message

// 'Send Card'
// Note: no accompanying 'get' function here, 
// because getCard can be called with the displayCardBeforeSend function as a callback
// (only a couple differences between displaying card for reference and displaying before sending)
let displayCardBeforeSend = (data) => {
    // Display all the usual information the user would see in their own
    displayCard(data, true);
    
    // And add/modify fields for customization
    var existingHTML = $('#root').html();
    
    let customNote = '<p><textarea id="customNote" name="customNote"></textarea></p>';
    
    $('#root').html(existingHTML + customNote);
    
};

// 'My Kontakts'
let getKontakts = (cb) => {
    setTimeout(cb(MOCK_KONTAKTS), 3000);
};
let displayKontakts = (data) => {
    let kontakts = data.kontakts;
    let output = '<ul>';
    kontakts.forEach( (v,i) => {
        output += '<li>';
        output += `First name: ${v['firstName']}<br>`;
        output += `Last name: ${v['lastName']}<br>`;
        output += `Title: ${v['occupation']}<br>`;
        output += `${v['professionalSummary']}<br>`;
        output += `${v['company']}<br>`;
        output += `Office Phone: ${v['officePhone']}<br>`;
        if (v['addlNote']) {
            output += `Note: ${v['addlNote']}<br>`;    
        }
        output += '</li>';
    });
    output += '</ul>';

    $('#root').html(output);
};

// 'My Inbox'
// (includes 'cards' and 'messages' in reverse chron order, with tab options to see one or both categories)
let getInbox = (cb, view) => {
    setTimeout(cb(MOCK_INBOX, view), 3000);
};
let displayInbox = (data, view) => {    // `view` values can be 'cards', 'messages' or 'all'
    let cards = data.cards;
    let messages = data.messages;
    
    let output ='<ul>';
    
    if (view != 'messages') {
        // Show the cards
        cards.forEach( (v,i) => {
            output += '<li>';
            output += `${v['firstName']} ${v['lastName']}<br>`;
            output += `${v['occupation']}`;
            output += '</li>';
        });
    }
    
    if (view != 'cards') {
        // Show the messages
        messages.forEach( (v,i) => {
            output += '<li>';
            output += `<b>${v['subject']}</b><br>`;
            output += `${v['from']}`;
            output += '</li>';
        });
    }
    
    output += '</ul>';
    
    $('#root').html(output);
};

/*  
 * Top-level wrapper function
 */

let main = () => {
    // Set up handlers for each button
    $('#myCard').click( () => {
        getCard(displayCard, false);
    });
    
    $('#myKontakts').click( () => {
        getKontakts(displayKontakts);
    });
    
    $('#inbox').click( () => {
        getInbox(displayInbox, 'all');
    });
};

$(document).ready(main);