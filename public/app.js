"use strict";

/*
 * Mock data
 */
const MOCK_CARDS = {
    cards: [
        {
            firstName: 'Alex',
            lastName: 'Bahler',
            userName: 'abahler',
            occupation: 'Software Engineer',
            professionalSummary: 'Experienced architect and programmer focused on elegant, scalable solutions',
            company: 'Kontakt',
            officePhone: '555-630-2112',
            cellPhone: '',
            addlNote: ''        // Optional, customizable note per card sent. Default to empty string.            
        },
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

const MOCK_USERS = {
    users: [
        {
            firstName: 'Alex',
            lastName: 'Bahler',
            userName: 'abahler',
            password: 'pw1001',
            avatar: 'images/users/1001.jpg',
            kontakts: []
        },
        {
            firstName: 'Adam',
            lastName: 'Smith',
            userName: 'devguy44',           
            password: 'pw123',
            avatar: 'images/users/3001.jpg',
            kontakts: []
        },
        {
            firstName: 'Andre',
            lastName: 'Young',
            userName: 'DrDre',
            password: 'pw456',
            avatar: 'images/users/2001.jpg',
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
                }
            ]
        },
        {
            firstName: 'Diana',
            lastName: 'Luna',
            userName: 'dluna',
            password: 'pw789',
            avatar: 'images/users/4001.jpg',
            kontakts: [
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
        }
    ]
};

/*
 * Screens
 */

// Hard-code username for testing, in lieu of authentication
let loggedUser = 'dluna';

// 'My Card'
let getCard = (cb, isEditable) => { 
    $.get('/card/' + loggedUser, (userCard) => {
        displayCard(userCard);
    });
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
    let phoneVal = data.cellPhone || 'Add an office phone';
    output += `<p>Cell Phone: ${phoneVal}</p>`;
    
    $('#root').html(output);
};

// 'Search Users'
let getUserSearch = (cb, val) => {
    $.get('/users/' + val, (d) => {
        displayUserSearch(d);
    });
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
    $.get('/kontakts/' + loggedUser, (kontakts) => {
        displayKontakts(kontakts);
    });
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
    
    $('#search').keyup( () => {
        let searchTerm = $(this).val();
        
        getUserSearch(displayUserSearch, searchTerm);
    
        // The class 'user' will be on every list result thumbnail in the user search.
        $('.user').click( () => {
            getCard(displayCardBeforeSend, true);
        });
    });
};

$(document).ready(main);