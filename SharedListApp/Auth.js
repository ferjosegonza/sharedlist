import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

const logout = () => {
    return auth.signOut();
};

export { login, register, logout };