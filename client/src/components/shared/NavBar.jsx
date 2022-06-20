import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    setInput,
    setSignedIn,
    setUserData,
} from "../../features/userSlice";

import "../../styling/navbar.css";

function NavBar() {
    const [inputValue, setInputValue] = useState("tech");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
    };

  return (
    <div className="navbar">
        <h1 className="navbar-header">BlogSpot 💬</h1>
        {isSignedIn && (
            <div className="blog-search">
                <input
                className="search"
                placeholder="Search for a blog"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="submite" onClick={handleClick}>
                    Search
                </button>
            </div>
        )}

        {isSignedIn ? (
            <div className="=navbar-user-data">
                <Avatar
                    className="user"
                    src={userData?.imageUrl}
                    alt={userData?.name}
                />
                <h1 className="signedIn">{userData?.givenName}</h1>
                <GoogleLogout
                    clientId="927768120339-qcnrjmt9k77hh0ockktg6cfrktcluelk.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="logout-button"
                        >
                            Logout 😦
                        </button>
                    )}
                    onLogoutSuccess={logout}
                />
            </div>
            ) : (
                <h1 className="notSignedIn">User not avaialble 😞</h1>
        )}
    </div>
  )
}

export default NavBar;