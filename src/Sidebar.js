import React from 'react'

export default class Sidebar extends React.Component {
    render(){
        if (this.props.hidden === false) {
            return (
                <React.Fragment>
                    <form onSubmit={e => e.preventDefault()}>
                        <label htmlFor="search">Search</label>&emsp;
                            <input
                                aria-controls="character-count"
                                type="search"
                                id="search"
                                name="search"
                                placeholder="Starbucks" 
                                onChange={e => this.props.onChange(e.target.value)}
            />
        </form>
                </React.Fragment>
            )
        }
        return null
    }
}