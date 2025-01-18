import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import auth from "../../firebase.config";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    //Create or Register a User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Signin User
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google signin
    const googleSignUp = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //LogOut
    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        setLoading(false)

        return signOut(auth)

    }

    //Update User Profile
    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    //Observe current User existence
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            const userInfo = { email: currentUser.email }
            if (currentUser) {
                //get token and store client
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        const data = res.data;
                        if (data.token) {
                            localStorage.setItem('access-token', data.token);
                            setLoading(false)
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching token:', error)
                    })
            }
            else {
                //TODO: remove token(if token stored in the client side: Local Storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false)
            }
            console.log('current User', currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignUp,




    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}