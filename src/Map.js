import React from 'react'

export default function Map(props) {
    if(props.map) {
        return (
            <div>
                <img src={props.map} alt='portland map'/>
            </div>
        )
    }
    else return null
}