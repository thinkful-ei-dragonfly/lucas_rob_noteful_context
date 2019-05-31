import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import NotefulContext from '../NotefulContext/NotefulContext'

export default class NotePageMain extends React.Component {
  
    static contextType = NotefulContext;

  // constructor(props) {
  //   super(props);
    // static contextType = NotefulContext;
    
    
    // debugger;
  // }

  // const noteId = this.props.match.params
  // const note = findNote(this.context.notes, this.noteId)
  // static contextType = NotefulContext;
  

  render() {
    const noteId = this.props.match.params
   
    const note = findNote(this.context.notes, this.noteId)
    debugger;

  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {this.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

// NotePageMain.defaultProps = {
//   note: {
//     content: '',
//   }
}
