import React from 'react';
//import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';

    function Logout({setUser}) {
        const onClick = () => {
            googleLogout();
            setUser(null);
            localStorage.setItem('login', null);
            console.log('Logged out successfully');
        };

    return (
        <div>
          <Button
            varient='light'
            onClick={onClick}
            ></Button>
        </div>
    );
}

export default Logout;

/*function Logout({ setUser, clientId }) {
    const onSuccess = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        console.log('Logout made successfully');
    };*/

     /*const onFailure = (res) => {
        let {error} = res;
        if(error === 'idepiframe_initalization_failed') {onSuccess();}
        else {console.log('Logout failed: res', res);}
    }*/
