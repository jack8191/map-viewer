import React from 'react'

export default function Map(props) {
    console.log(props.map)
    if(props.map) {
        return (
            <div>
                <img src={props.map} />
            </div>
        )
    }
    else return null
}