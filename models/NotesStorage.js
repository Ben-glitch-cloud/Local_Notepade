const fs = require('fs')   

let idObjectNumber 

class HandlingNotes {  

    GetAllNotes(){      
        return new Promise(function(resolve, reject){
            fs.readFile('./files/starter.txt', (err, data) => { 
                let NewData  
                if(err) throw err; 
                data.toString().length === 0 ? NewData = [] : NewData = JSON.parse(data.toString())   
                resolve(NewData)
            })  
        })
    }  

    CreatNewNote(titleData, noteData){
        return new Promise(function(resolve, reject) { 
            fs.readFile('./files/starter.txt', (err, data) => {
                if(err) throw err;         
                if(!JSON.parse(JSON.stringify(data))['data'].length === 0 && JSON.parse(data.toString()).length > 50 ) { 
                    resolve(false)   
                    return  
                }; 
                if(!JSON.parse(JSON.stringify(data))['data'].length === 0 && JSON.parse(data.toString()).length === 50){  
                    resolve(false)   
                    return 
                };    
                let NewData, ObjectNote, NewDataStr  
                data.toString().length === 0 || data === undefined || data === null ? NewData = [] : NewData = JSON.parse(data.toString())  
                noteobject.setId(NewData) 
                ObjectNote = noteobject.BuildDataSet(titleData, noteData)
                NewData.push(ObjectNote) 
                NewDataStr = JSON.stringify(NewData) 
                fs.writeFile('./files/starter.txt', `${NewDataStr}`, (err) => {
                    if(err) throw err; 
                    resolve(true)
                })  
                resolve(true)
            })  
        })
    }  

    DeleteNote(noteId){
        return new Promise(function(resolve, reject) {
            fs.readFile('./files/starter.txt', (err, data) => {
                if(err) throw err; 
                let NewData = JSON.parse(data.toString())      
                if(NewData === undefined){NewData = []}
                NewData = NewData.filter((item) => item['id'] !== Number(noteId))
                let NewDataStr = JSON.stringify(NewData) 
                fs.writeFile('./files/starter.txt', `${NewDataStr}`, (err) => {
                    if(err) throw err; 
                    resolve(true)
                })  
                resolve(true)
            })  
        })
    }  

    DeleteAll(){
        return new Promise(function(resolve, reject) {
            fs.readFile('./files/starter.txt', (err, data) => {
                if(err) throw err; 
                fs.writeFile('./files/starter.txt', `${[]}`, (err) => {
                    if(err) throw err; 
                    resolve(true)
                })  
                resolve(true)
            })  
        })
    }

    EditNote(id, title, blog){
        return new Promise(function(resolve, reject) {
            fs.readFile('./files/starter.txt', (err, data) => {
                if(err) throw err; 
                let NewData = JSON.parse(data.toString())      
                if(NewData === undefined){NewData = []} 
                NewData = NewData.map((item) => { return item['id'] === Number(id) ? {'id': Number(id), 'Title': title, 'Blog': blog} : item})  
                let NewDataStr = JSON.stringify(NewData)  
                fs.writeFile('./files/starter.txt', `${NewDataStr}`, (err) => {
                    if(err) throw err; 
                    resolve(true)
                })  
                resolve(true)
            })  
        })
    } 

    ChangeNoteColour(colour=''){
        return new Promise(function(resolve, reject) {
            fs.readFile('./files/notesSettings.txt', (err, data) => {
                if(err) throw err;   
                if(colour.length !== 0){
                    let NewColour = {"Colour": colour}
                    let NewDataStr = JSON.stringify(NewColour)   
                    fs.writeFile('./files/notesSettings.txt', `${NewDataStr}`, (err) => {
                        if(err) throw err; 
                        resolve(true)
                    })  
                    resolve(NewDataStr)   
                }
                resolve(data)
            })  
        })
    }

}     

class NoteObject {
    BuildDataSet(titleData, noteData){   
        let setTitleData = titleData.split(' ').map((item) => item[0].toUpperCase() + item.slice(1)).join(' ') 
        let CreateNoteObject = {'id': idObjectNumber, 'Title': setTitleData, 'Blog': noteData}  
        return CreateNoteObject
    } 

    setId(noteData){ noteData.length === 0 ? idObjectNumber = 1 : idObjectNumber = Math.max(...noteData.map((item) => Number(item['id']))) + 1 }
}

const noteobject = new NoteObject

module.exports = HandlingNotes; 
 