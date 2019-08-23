import React from 'react';
import Map from './Map'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: ""
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
  componentDidMount() {
     this.loadEmptyMap()
  }
  render() {
    return (
      <div className="App">
        {/* <SideBar /> */}
        <Map map={this.state.map}/>
      </div>
    );
  }
}

export default App;
