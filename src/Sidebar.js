import React from 'react'

export default class Sidebar extends React.Component {
    renderLocationList(locationList) {
        if(locationList !== null) {
            return locationList.features.map((item, index) => 
                <li key={index}>
                    <p>Pin #: {index+1}</p>
                    <p>{item.place_name}</p>
                </li>
            )
        }
    }
    render(){
        if (this.props.hidden === false && this.props.placeList !== null) {
            let locationList = this.renderLocationList(this.props.placeList) 
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
                    <ul>
                        {locationList}
                    </ul>
                </React.Fragment>
            )
        }
        else if (this.props.hidden === false && this.props.placeList === null) {
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