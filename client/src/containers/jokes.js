import React, { Component } from 'react'
import axios from '../axios-jokes';


export default class Jokes extends Component {

    fetchJokes = () => {
        axios.get('/api/jokes', {headers: {"Authorization": localStorage.getItem('token') }}).then(({data: jokes}) => {
            console.log(jokes)
            this.setState({jokes})
        }).catch(err => {
            console.log(err)
        })
    }

  render() {
    return (
      <>
        <ul className="list-group" style={{padding:"1rem", margin:"2rem"}}>
            {this.state.jokes.length > 0 && this.state.jokes.map(joke => (
                <li key={joke.id} className="list-group-item list-group-item-action">{joke.joke}</li>
            ))}
        </ul>
      </>
    )
  }
  state = {
      jokes: []
  }
  componentDidMount() {
      this.fetchJokes();
  }
}
