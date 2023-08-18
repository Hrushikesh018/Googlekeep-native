import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Note from './Components/Note';
import Navbar from './Components/Navbar';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async newNote => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setInputExpanded(false);
    setEditTitle('');
    setEditContent('');
  };

  const handleDeleteNote = async id => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEdit = async () => {
    if (editingNote) {
      const updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, title: editTitle, content: editContent }
          : note,
      );
      setNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditingNote(null);
      setInputExpanded(false);
      setEditTitle('');
      setEditContent('');
    }
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.Navbarbig}>
        <Navbar />
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <View
        style={[
          styles.addNoteContainer,
          inputExpanded && styles.expandedContainer,
        ]}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={editTitle}
          onChangeText={text => setEditTitle(text)}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Note content"
          value={editContent}
          onChangeText={text => setEditContent(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (editingNote) {
              handleEdit();
            } else {
              const id = Date.now().toString();
              handleAddNote({
                id,
                title: editTitle,
                content: editContent,
              });
            }
          }}
          style={styles.addButton}>
          <Text>{editingNote ? 'Edit' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.notesContainer}>
          {filteredNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
              onEdit={() => {
                setEditingNote(note);
                setEditTitle(note.title);
                setEditContent(note.content);
                setInputExpanded(true);
              }}
              style={styles.Notess}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Navbarbig: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 20,
    marginTop: 10,
  },
  searchBarContainer: {
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'15%',
    
    // marginRight: '-10%',
    marginTop: '4%',
    width: 250, // Adjust the width to your desired size
    height: 50,
    
  },
  searchInput: {
    padding: 8,
    paddingEnd:5,
    width: '100%',
    maxWidth: 600,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  addNoteContainer: {
    margin: 'auto',
    padding: 20,
    maxWidth: 600,
  },
  expandedContainer: {
    marginBottom: 10,
  },
  notesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 200,
  },
  Notess: {
    width: 20,
  },
});

export default App;