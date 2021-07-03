import React from 'react'
import '../styles/news.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class News extends React.Component{

    state = {
        news: []
    }

    componentDidMount() {
        axios.get('https://backend-conference.herokuapp.com/editor/requests')
            .then(response => {
                this.setState({ news: response.data.filter(request =>{
                        return request.type === 'news';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div>
                <div className="body" style={{minHeight: "100vh",marginTop:"100px"}} id="news">
                    <h2 className="text-center font-weight-bold"><u>LATEST NEWS</u></h2><br/>
                    <div className="container text-center">
                        <div className="row justify-content-between">
                            {this.state.news.map(req =>

                                <React.Fragment>
                                    {req.status == 'approved' ?
                                        <div className="card back col-md-5 mt-3"  style={{minHeight: "50vh",maxWidth: "90vh"}}>
                                            <div className="card-body m-1 rounded">
                                                <h3 className="card-title text-white text-center">{req.details.name}</h3>
                                                <h4 className="card-text text-light text-center mt-5">{req.details.description}</h4>
                                                <h3 className="card-text"><small className="text-light">{req.details.date}</small></h3>
                                            </div>
                                        </div>
                                        : ''}
                                </React.Fragment>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        )
    }


}
