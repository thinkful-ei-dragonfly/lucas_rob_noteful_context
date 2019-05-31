import React from 'react'


const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  findFolder: () => {},
  findNote: () => {},
  getNotesForFolder: () => {},
  countNotesForFolder: () => {},
  // Add formula skeleton names??
})

export default NotefulContext;




