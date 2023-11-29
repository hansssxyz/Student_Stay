import React, { MouseEvent } from 'react';

type Props = {
    name: string
}

function HeaderButton(props:Props){
    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        if(props.name=="New to StudentStay? Register →"){
            window.location.href='http://localhost:3000/register';
        }
        else if(props.name=="Already have an account? Log in →"){
            window.location.href='http://localhost:3000/login';
        }else{
        window.location.href='http://localhost:3000/'+props.name;
        }
    }

    return(
        <button id="button" onClick={clickHandler} className="py-1 px-2 font-lato text-dark-blue text-xl inline-block mx-3 align-middle">{props.name}</button>

    )
}

export default HeaderButton;