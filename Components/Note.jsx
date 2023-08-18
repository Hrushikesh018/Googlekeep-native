import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {Ionicons} from '@expo/vector-icons';

const Note = ({ note, onDelete, onEdit }) => {
    return (
        <View style={styles.noteContainer}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.content}>{note.content}</Text>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                {/* <Ionicons name="ios-trash" size={20} color="red" /> */}
                <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                {/* <Ionicons name="ios-create" size={20} color="blue" /> */}
                <Text>Edit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    noteContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 5,
    },
    deleteButton: {
        marginTop: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        padding: 5,
        borderRadius: 5,
    },
    editButton: {
        marginTop: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        padding: 5,
        borderRadius: 5,
    },
});

export default Note;