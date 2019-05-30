import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
// import dummyStore from '../dummy-store'
import NotefulContext from '../NotefulContext/NotefulContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600)

    Promise.all([
      fetch('http://localhost:9090/folders').then(res => res.json())
      , fetch('http://localhost:9090/notes').then(res => res.json())])
    .then(results => {
      this.setState({
        notes: results[1],
        folders: results[0]
      });
    })
  }

  renderNavRoutes() {
    // const { notes, folders } = this.state
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <NotefulContext.Provider
            value={contextValue}>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        </NotefulContext.Provider>
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(contextValue.notes, noteId) || {}
            const folder = findFolder(contextValue.folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    // const { notes, folders } = this.state
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>

          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(contextValue.notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />

        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(contextValue.notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={contextValue.folders}
              />
            )
          }}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }
    return (
      <NotefulContext.Provider
        value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotefulContext.Provider>
    )
  }
}

export default App
