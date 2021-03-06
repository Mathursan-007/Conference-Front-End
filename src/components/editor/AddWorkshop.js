import React, { Component } from 'react';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ModalMessage from '../PopUp';

class AddWorkshop extends Component {
    state = {
        title: '',
        description: '',
        workshopFile: '',
        buttonState: false,
        buttonText: 'Add Workshop',
        img:  '',
        progress: false,
        successModal: false
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFile = (e) => {
        this.setState({
            workshopFile: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])

        });
        console.log(this.state.workshopFile);
    }

    handleSubmit = e => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('workshopFile', this.state.workshopFile);

        this.setState({
            buttonState: true,
            buttonText: 'Please wait...',
            progress: true
        })

        axios.post('https://backend-conference.herokuapp.com/editor/addWorkshop/', formData , {
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(res => {

                this.setState({successModal: true})

                this.setState({
                    title: '',
                    description: '',
                    workshopFile: '',
                    buttonState: false,
                    buttonText: 'Add Workshop',
                    img: '',
                    progress: false
                })
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <form encType='multipart/form-data' onSubmit={this.handleSubmit} >
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3> Workshop</h3>
                            <p className="m-0">Creating a new workshop</p>
                        </div>
                    </div>
                    <div className="card-body p-3">

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-id-card text-info"></i></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleInput}
                                    placeholder="Enter title of workshop"
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-info-circle text-info"></i></div>
                                </div>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter description about the workshop"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleInput}
                                    rows="4"
                                    cols="50"
                                    disabled={this.state.buttonState}
                                    required></textarea>
                            </div>
                        </div>

                        {this.state.img === '' ? '' :
                            <React.Fragment>
                                <img src={`${this.state.img}`} alt={'no image'} style={{width: "50%",height:"20vh"}}/>
                            </React.Fragment>
                        }

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-picture-o text-info"></i></div>
                                </div>
                                <input
                                    type="file"
                                    name="file"
                                    accept=".png, .jpg, .jpeg"
                                    className="form-control"
                                    onChange={this.handleFile}
                                    disabled={this.state.buttonState}
                                    required
                                />
                            </div>
                        </div>

                        {this.state.progress ?
                            <div className="container p-4">
                                <ProgressBar style={{height: "4vh"}} animated now={100} variant={'primary'} label={'Uploading'} />
                            </div>
                            : ''

                        }

                        <div className="text-center">
                            <input
                                type="submit"
                                value={this.state.buttonText}
                                className="btn btn-info btn-block rounded-0 py-2"
                                disabled={this.state.buttonState}/>
                        </div>
                    </div>

                </div>

                <ModalMessage
                    title = {'Workshop'}
                    description = {'workshop was successfully added'}
                    show={this.state.successModal}
                    onHide={() => this.setState({successModal: false})}
                />

            </form>
        );
    }
}

export default AddWorkshop;
