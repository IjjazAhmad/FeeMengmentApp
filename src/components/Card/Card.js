import React from 'react'

export default function Card(props) {
    let {color, icon, text, num}=props;
    return (
        <div className={`card box text-center ${color}`}>
            <i className={icon}></i>
            <p >{text} <br /> {num} </p>
        </div>
    )
}
