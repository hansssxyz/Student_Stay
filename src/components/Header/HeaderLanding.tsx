/* TO DO
- Figure out mouse hover
*/

import React, { MouseEvent } from 'react';
import '../Header/Header.css';
import logoIcon from '../../assets/logo.png';
import HeaderButton from '../Header/HeaderButton';
// import UserIcon from '../UserIcon/UserIcon';

function Header(){

    const logoClickHandler = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault;
        window.location.href = 'http://localhost:3000/';
    }

    // TO DO: replace with status of user login
    const loggedIn = 1;

    if (loggedIn){
        return(
            <>
                <div id="headerContainer">
                    <div id="headerLeft">
                        <img src={logoIcon} id = "logoImg" alt="" onClick={logoClickHandler} />
                    </div>
                    <div id="headerRight">
                        <HeaderButton name="Login" />
                        <HeaderButton name="Register" className="bg-dark-blue text-white" />

                        {/*<UserIcon username="testing"/>*/}
                    </div>
                </div>
                <hr/>
            </>
        )
    }else{
        return(
            <>
                <div id="headerContainer">
                    <div id="headerLeft">
                        <img src={logoIcon} id = "logoImg" alt="" onClick={logoClickHandler} />
                    </div>
                    <div id="headerRight">
                        <HeaderButton name="About" />
                        <HeaderButton name="FAQ" />
                        <HeaderButton name="Login"/>
                    </div>
                </div>
                <hr/>
            </>
        )
    }
}

export default Header;