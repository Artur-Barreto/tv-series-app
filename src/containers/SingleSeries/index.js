import React, { Component } from 'react'
import Loader from '../../components/Loader'

class SingleSeries extends Component {
    state = {
        show: null
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        
        fetch(` http://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then((Response)=> Response.json())
        .then(JSON => this.setState({show: JSON}))
    }
    render() {
        const {show} = this.state

        return(
            <div>
                {show === null &&  <Loader/>}
                {
                    show !== null
                    &&
                    <div>
                        <p> {show.name} </p>
                        <p>Premiered - {show.premiered}</p>
                        <p>Rating - {show.rating.average}</p>
                        <p>episodes- {show._embedded.episodes.length}</p>
                        <p>
                            <img alt="Show" src={show.image.medium}/>
                        </p>
                    </div>
                }
            </div>
        )
    }
}
export default SingleSeries;