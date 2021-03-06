import React, { Component } from 'react';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ModalMessage from '../PopUp';

class AddTemplate extends Component {
    state = {
        title: '',
        file: '',
        buttonState: false,
        buttonText: 'Add Template',
        progress: false,
        successModal: false
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFile = (e) => {
        this.setState({file: e.target.files[0]});
        console.log(this.state.file);
    }

    handleSubmit = e => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('file', this.state.file);

        this.setState({
            buttonState: true,
            buttonText: 'Please wait...',
            progress: true
        })

        axios.post('https://backend-conference.herokuapp.com/editor/addTemplate/', formData, {
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({successModal: true});
                this.setState({
                    title: '',
                    file: '',
                    buttonState: false,
                    buttonText: 'Add Template',
                    progress: false
                })
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <form encType='multipart/form-data' onSubmit={this.handleSubmit}>
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3>Template</h3>
                            <p className="m-0">Adding a new template</p>
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
                                    disabled={this.state.buttonState}
                                    placeholder="Enter title of the template"
                                    required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-file text-info"></i></div>
                                </div>
                                <input
                                    type="file"
                                    name="file"
                                    accept = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
                                disabled={this.state.buttonState}
                                className="btn btn-info btn-block rounded-0 py-2" />
                        </div>
                    </div>

                    <ModalMessage
                        title = {'Template'}
                        description = {'template was successfully added'}
                        show={this.state.successModal}
                        onHide={() => this.setState({successModal: false})}
                    />

                </div>
            </form>
        );
    }
}

export default AddTemplate;
