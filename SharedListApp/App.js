import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { login, register, logout } from './Auth';

firebase.initializeApp(firebaseConfig);

const App = () => {
    const [list, setList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [user, setUser] = useState(null);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        const db = firebase.database(firebaseConfig.projectId);
        const listRef = db.ref('lists').child('sharedList');

        listRef.on('value', (snapshot) => {
        setList(snapshot.val());
        });
    }, []);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        const db = firebase.database();
        const listRef = db.ref('lists').child('sharedList');

        listRef.child(item.id).remove();
    };

    const handleLogin = (email, password) => {
        login(email, password).then((user) => {
            setUser(user);
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleRegister = (email, password) => {
        register(email, password).then((user) => {
            setUser(user);
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleLogout = () => {
        logout().then(() => {
            setUser(null);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <View>
            {user ? (
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemSelect(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                    )}
                />
            ) : (
                <View>
                    <Text>Login or Register to access the shared list</Text>
                    <TouchableOpacity onPress={() => handleLogin('email@example.com', 'password')}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRegister('email@example.com', 'password')}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default App;