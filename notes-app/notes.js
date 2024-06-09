// importing necessary modules to work with files and to style console output
const fs = require('fs') // fs allows us to read from and write to files
const chalk = require('chalk') // chalk helps us style console output with colors

// function to add a new note
const addNote = (title, body) => {
    // load existing notes from a file
    const notes = loadNotes()

    // check if a note with the same title already exists
    const duplicateNote = notes.find((note) => note.title === title)

    // if no note with the same title exists, add the new note to the list
    if (!duplicateNote) {
        notes.push({ // add the new note to the list of notes
            title: title, // set the title of the new note
            body: body // set the body of the new note
        })
        saveNotes(notes) // save the updated list of notes to the file
        console.log(chalk.green.inverse('New note added!')) // print a success message in green color
    } else { // if a note with the same title already exists
        console.log(chalk.red.inverse('Note title taken!')) // print an error message in red color
    }
}

// function to remove a note
const removeNote = (title) => {
    // load existing notes from a file
    const notes = loadNotes()

    // filter out the note with the given title from the list of notes
    const notesToKeep = notes.filter((note) => note.title !== title)

    // if a note was removed, save the updated list of notes to the file
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!')) // print a success message in green color
        saveNotes(notesToKeep) // save the updated list of notes to the file
    } else { // if no note was found with the given title
        console.log(chalk.red.inverse('No note found!')) // print an error message in red color
    }    
}

// function to list all notes
const listNotes = () => {
    // load existing notes from a file
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes')) // print a header for the list of notes

    // iterate through each note and print its title
    notes.forEach((note) => {
        console.log(note.title) // print the title of each note
    })
}

// function to read a specific note
const readNote = (title) => {
    // load existing notes from a file
    const notes = loadNotes()

    // find the note with the given title
    const note = notes.find((note) => note.title === title)

    // if the note is found, print its title and body
    if (note) {
        console.log(chalk.inverse(note.title)) // print the title of the note in inverse color
        console.log(note.body) // print the body of the note
    } else { // if no note is found with the given title
        console.log(chalk.red.inverse('Note not found!')) // print an error message in red color
    }
}

// function to save notes to a file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes) // convert the list of notes to JSON format
    fs.writeFileSync('notes.json', dataJSON) // write the JSON data to a file named 'notes.json'
}

// function to load notes from a file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json') // read the contents of 'notes.json' file
        const dataJSON = dataBuffer.toString() // convert the data to a string
        return JSON.parse(dataJSON) // parse the JSON data back into an array of notes
    } catch (e) { // if there's an error reading the file (e.g., the file doesn't exist)
        return [] // return an empty array as there are no notes
    }
}

// exporting all functions so they can be used in other files/modules
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
