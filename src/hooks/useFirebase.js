import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeFirebase from "../Pages/Login/Firebase/Firebase.init";


initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);


    const auth = getAuth();

    //user registration
    const registration = (email, password, name, history) => {
        setIsLoading(true);
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                //saveUser to database
                saveUser(email, name, 'POST');

                //update profile
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false));
    }

    //user login
    const login = (email, password, location, history) => {
        setIsLoading(true);
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);

            })
            .finally(() => setIsLoading(false));
    }

    //user observer onstatechange
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                // const uid = user.uid;
                setUser(user)
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unSubscribe;
    }, [])

    //check which user is admin
    useEffect(() => {
        fetch(` https://thawing-bastion-87862.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email]);

    //user logout
    const logout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    };
    //save user info to database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://thawing-bastion-87862.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then();
    }

    return {
        user,
        registration,
        login,
        logout,
        admin,
        isLoading,
        authError,
    }

}
export default useFirebase;