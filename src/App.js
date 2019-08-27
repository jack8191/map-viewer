import React from 'react';
import Map from './Map'
import SideBar from './Sidebar'
import 'normalize.css'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: "",
      navHidden: false,
      searchTerm: "",
      searchResults: null,
      geoJson: null
    }
  }
  loadEmptyMap() {
    fetch('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.6619,45.5267,10,0,0/1000x1000?access_token=pk.eyJ1IjoiamFlODE5MSIsImEiOiJjanpuOXA3eGowMXdpM21vOWhvZ3ljb3A0In0.NI2-cQJJXyTdJ7J-bZOBFw')
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
  createGeoJson(searchResults) {
    let placeList = searchResults.features.map((item, index) => {
      return  ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.center,
          },
          properties: {
            "marker-symbol": index+1
          }
        })
      })
    let geoObject = {
      type: "FeatureCollection",
      features: placeList,
    }
    let geoJson = JSON.stringify(geoObject)
    return geoJson
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
        let currentGeoJson = this.createGeoJson(res)
        this.setState({
          ...this.state,
          searchResults: res,
          geoJson: currentGeoJson
        })
      })
      .catch(err =>
        this.setState({
            error: 'Could not load results',
        })
      )
  }
  showPins(geoJson) {
    fetch(`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/geojson(${geoJson})/-122.6619,45.5267,10,0,0/1000x1000?access_token=pk.eyJ1IjoiamFlODE5MSIsImEiOiJjanpuOXA3eGowMXdpM21vOWhvZ3ljb3A0In0.NI2-cQJJXyTdJ7J-bZOBFw`)
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
  componentDidMount() {
     this.loadEmptyMap()
  }
  componentDidUpdate(prevProps, prevState) {
      if(this.state.searchTerm !== prevState.searchTerm && this.state.searchTerm !== "") {
        this.searchMap(this.state.searchTerm)
      }
      else if(this.state.geoJson !== null && this.state.geoJson !== prevState.geoJson) {
        this.showPins(this.state.geoJson)
      }
      else if (this.state.searchTerm === "" && this.state.searchResults !== null) {
        this.loadEmptyMap()
        this.setState({
          ...this.state,
          searchResults: null
        })
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
        <div className='sidebar'>
        <button onClick={e => this.toggleNav(e)}>Toggle Search</button>
          <SideBar
            hidden={this.state.navHidden} 
            onChange={searchString => this.getSearchString(searchString)} 
            placeList={this.state.searchResults}
            />
          </div>
        <Map className="map" map={this.state.map}/>
      </div>
    );
  }
}

export default App;
