const fs = require("fs")
const util = require("util")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
const uuid = require("uuid/v1")

class Notes {
    readNote(){
        return readFileAsync("db/db.json", "utf8")

    }
    writeNote(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNote(){
        return this.readNote().then(data => {
            let notes;
            try{
                notes = [].concat(JSON.parse(data))
            }
            catch(err){
                notes = []
            }
            return notes
        })
    }
    addNote(note){
        const {title, text} = note
        if(!title || !text){
            throw new Error("you must fill in title and text")            
        }
        const finalNote = {title, text, id: uuid()}
        return this.getNote().then(data => [...data, finalNote]).then(data => this.writeNote(data)).then(()=> finalNote)
        // this returns is calling the getNote function then collects all the data from the getNotes then putting it into an array with the finalNotes then we write to the file and return final notes

    }
    deleteNote(id){
        return this.getNote().then(notes => notes.filter(note => note.id !== id)).then(data => this.writeNote(data))
    }
}

module.exports = new Notes()