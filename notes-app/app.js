
// importing necessary modules for styling console output (chalk) and parsing command-line arguments (yargs)
const chalk = require('chalk') // chalk helps us style console output with colors
const yargs = require('yargs') // yargs helps us parse command-line arguments

// importing functions from another file ('notes.js') that handles notes-related operations
const notes = require('./notes.js')

// customizing the version of our application for yargs
yargs.version('12.0.2')

// creating a command to add a new note
yargs.command({
    command: 'add', // command name
    describe: 'Add a new note', // description of the command
    builder: { // options/arguments for this command
        title: { // title of the note
            describe: 'Note title', // description of the option
            demandOption: true, // this option is required
            type: 'string' // data type of the option
        },
        body: { // body/content of the note
            describe: 'Note body', // description of the option
            demandOption: true, // this option is required
            type: 'string' // data type of the option
        }
    },
    handler(argv) { // function to execute when this command is run
        notes.addNote(argv.title, argv.body) // call the addNote function from the notes module with provided arguments
    }
})

// creating a command to remove a note
yargs.command({
    command: 'remove', // command name
    describe: 'Remove a note', // description of the command
    builder: { // options/arguments for this command
        title: { // title of the note to be removed
            describe: 'Note title', // description of the option
            demandOption: true, // this option is required
            type: 'string' // data type of the option
        }
    },
    handler(argv) { // function to execute when this command is run
        notes.removeNote(argv.title) // call the removeNote function from the notes module with provided arguments
    }
})

// creating a command to list all notes
yargs.command({
    command: 'list', // command name
    describe: 'List your notes', // description of the command
    handler() { // function to execute when this command is run
        notes.listNotes() // call the listNotes function from the notes module
    }
})

// creating a command to read a specific note
yargs.command({
    command: 'read', // command name
    describe: 'Read a note', // description of the command
    builder: { // options/arguments for this command
        title: { // title of the note to be read
            describe: 'Note title', // description of the option
            demandOption: true, // this option is required
            type: 'string' // data type of the option
        }
    },
    handler(argv) { // function to execute when this command is run
        notes.readNote(argv.title) // call the readNote function from the notes module with provided arguments
    }
})

yargs.parse() // parsing the command-line arguments using yargs
