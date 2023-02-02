import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    //A hook to access the redux store's state.
    //This hook takes a selector function as an argument.
    //The selector is called with the store state.
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])
    return {loggedIn, checkingStatus}
}