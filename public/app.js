"use strict";

const MOCK_BUSINESS_CARD = {
    firstName: 'Alex',
    lastName: 'Bahler',
    occupation: 'Software Engineer',
    professionalSummary: 'Experienced architect and programmer focused on elegant, scalable solutions',
    company: 'Kontakt',
    phone: '555-630-2112',
    addlNote: ''        // Optional, customizable note per card sent. Default to empty string.
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

let viewCard = () => {};

let viewKontakts = () => {};

let viewInbox = () => {};




