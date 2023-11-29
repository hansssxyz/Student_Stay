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

        return(
            <>
                <div id="headerContainer">
                    <div id="headerLeft">
                        <img src={logoIcon} id = "logoImg" alt="" onClick={logoClickHandler} />
                    </div>
                    <div id="headerRight">
                        <HeaderButton name="New to StudentStay? Register →" />

                        {/*<UserIcon username="testing"/>*/}
                    </div>
                </div>
                <hr/>
            </>
        )
}

export default Header;