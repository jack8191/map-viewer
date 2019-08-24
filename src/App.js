import React from 'react';
import Map from './Map'
import SideBar from './Sidebar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: "",
      navHidden: false,
      searchTerm: ""
    }
  }
  loadEmptyMap() {
    fetch('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.6239595,45.540924,10/1000x1000?access_token=pk.eyJ1IjoiamFlODE5MSIsImEiOiJjanpuOXA3eGowMXdpM21vOWhvZ3ljb3A0In0.NI2-cQJJXyTdJ7J-bZOBFw')
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
      }
        return res.blob()
      })
      .then(blob => {
        let imgUrl =  URL.createObjectURL(blob)
        this.setState({
          ...this.state,
          map: imgUrl
        })
      })
      .catch(err =>
        this.setState({
            error: 'Could not load map',
        })
      )
  }
  searchMap(searchTerm) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?bbox=-122.763358,45.433492,-122.484561,45.648356&access_token=pk.eyJ1IjoiamFlODE5MSIsImEiOiJjanpuOXA3eGowMXdpM21vOWhvZ3ljb3A0In0.NI2-cQJJXyTdJ7J-bZOBFw`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
      }
        return res.json()
      })
      .then(res => {
        this.setState({
          ...this.state,
          searchResults: res
        })
      })
      .catch(err =>
        this.setState({
            error: 'Could not load results',
        })
      )
  }
  componentDidMount() {
     this.loadEmptyMap()
  }
  componentDidUpdate(prevProps, prevState) {
      if(this.state.searchTerm !== prevState.searchTerm && this.state.searchTerm !== "") {
        this.searchMap(this.state.searchTerm)
      }
  }
  toggleNav(event) {
    event.preventDefault()
    if(this.state.navHidden === false) {
      this.setState( {
        ...this.state,
        navHidden: true
      })
    }
    else {
      this.setState({
        ...this.state,
        navHidden: false
      })
    }
  }
  getSearchString(val) {
    this.setState({
      ...this.state,
      searchTerm: val
    })
  }
  render() {
    return (
      <div className="App">
        <button onClick={e => this.toggleNav(e)}>Toggle Search</button>
        <SideBar hidden={this.state.navHidden} onChange={searchString => this.getSearchString(searchString)}/>
        <Map map={this.state.map}/>
      </div>
    );
  }
}

export default App;
