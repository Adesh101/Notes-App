const fs = require('fs') 
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = getNotes()
    const duplicateNote = notes.find((note) => note.title === title )

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New notes added!'))
    }
    else{
        console.log(chalk.red('Note already taken'))
    }
}

const removeNotes = (title) => {
    const notes = getNotes()
    const notesToKeep = notes.filter((note => note.title != title))
    if(notesToKeep.length===notes.length){
        console.log(chalk.red('No such note found!'))
    }
    else{
        saveNotes(notesToKeep)
        console.log(chalk.green('Note removed!'))
    }
}

const listNotes = () => {
    const notes = getNotes()
    console.log(chalk.yellow('Your notes...'))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = getNotes()
    console.log(chalk.yellowBright('Finding Notes...'))
    const findNotes = notes.find((note) => note.title === title)
    if(findNotes){
        console.log(chalk.blue(findNotes.title))
        console.log(chalk.gray(findNotes.body))
    }
    else{
        console.log(chalk.redBright('No note found!'))
    }
}

const getNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}