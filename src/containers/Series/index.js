import React, {Component} from 'react'
import Loader from '../../components/Loader'
import SeriesList from '../../components/SeriesList'
import Intro from '../../components/Intro'



class Series extends Component {
    state = {
        series: [],
        seriesName: ``,
        isFetching: false
      }
    
      onSeriesInputChange = e => {
        this.setState({seriesName: e.target.value, isFetching: true})
     
        fetch(`https://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then((Response)=> Response.json())
        .then(JSON => this.setState({series: JSON, isFetching:false}))
    }

        
    render() {
        const {series, seriesName, isFetching} = this.state;

        return(
            <div>
                <Intro message="Here you can find all of your most loved series"/>
                <div>
                <input 
                    className ="App-input"
                    value={seriesName}
                    type="text" 
                    onChange= {this.onSeriesInputChange} 
                    />
                </div>
                { 
                   !isFetching && series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Please enter series name into the input</p>
                }
                {
                    series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>No TV series have been found with this name</p>
                }
                {
                    isFetching && <Loader/>
                }
                {
                    !isFetching &&  <SeriesList list={this.state.series}/>
                }
            </div>
        )
    }
}

export default Series;