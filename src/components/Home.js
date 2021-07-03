import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/home.css';




class Home extends Component {


    state = {
        institute: '',
        faculty: '',
        start_date: '',
        end_date: '',
        description: ''
    }

    componentDidMount() {
        axios.get('https://backend-conference.herokuapp.com/editor/conference')
            .then(response => {
                this.setState({

                    name: response.data.details.name,
                    institute: response.data.details.institute,
                    faculty: response.data.details.faculty,
                    start_date: response.data.details.start_date,
                    end_date: response.data.details.end_date,
                    description: response.data.details.description

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <div>
                <div class="bg-cover text-white"  >
                    <div class="container py-5 text-center height" >
                        <div className="bee"  >
                            <h1 class="font-weight-bold display-4">{this.state.name}</h1>
                            <h1 class="font-italic mb-0 mt-2">{this.state.faculty}.</h1>
                            <h2 class="font-italic mb-0 mt-2">{this.state.description}</h2>
                            <h3 class="font-italic mt-2 text-info">
                                <u>{this.state.start_date} - {this.state.end_date}</u>
                            </h3>
                            <h1 class="font-italic">
                                <u>{this.state.institute}</u>
                            </h1>
                            <Link to="/news" role="button" class="btn btn-primary px-5 mt-5" style={{backgroundColor: "#040935"}}>Latest News</Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
