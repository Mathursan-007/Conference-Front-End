import React from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalMessage from '../PopUp';

class ViewTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            show:false,
            request:'',
            title: '',
            file: '',
            fileUrl: '',
            successModal: false
        };
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFile = (e) => {
        this.setState({
            file: e.target.files[0],
            fileUrl: URL.createObjectURL(e.target.files[0])
        });

        console.log(this.state.file);
    }

    handleSubmit = e => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('file', this.state.file);
        formData.append('fileUrl', this.state.request.details.file);

        axios.put('https://backend-conference.herokuapp.com/editor/updateTemplate/'+this.state.request._id, formData, {
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(res => {

                this.setState({successModal: true})

                axios.get('https://backend-conference.herokuapp.com/editor/requests')
                    .then(response => {
                        this.setState({ requests: response.data });

                    })
                    .catch((error) => {
                        console.log(error);
                    })

                this.setState({
                    title: '',
                    file: '',
                    fileUrl: '',
                    show: false
                });

            })
            .catch(err => {
                console.log(err);
            });

    }

    showView = () => {
        if(this.state.request) {

            return(

                <Modal show={this.state.show} centered={true} >
                    <ModalHeader>
                        <ModalTitle>

                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>


                        <input
                            type="text"
                            className="form-control w-100 mb-5"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInput}
                            style={{width:"100vh"}}
                            placeholder="Enter name of keynote speaker"
                            required />
                        {this.state.fileUrl ?

                            <a href={`${this.state.fileUrl}`}>{this.state.file.name}</a>

                            :

                            <a href={`${this.state.file}`}>{this.state.request.details.name}</a>
                        }

                        <input
                            type="file"
                            name="file"
                            accept = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            className="form-control"
                            onChange={this.handleFile}
                            required
                        />

                    </ModalBody>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Update</Button>
                        <Button className="btn-danger" onClick={()=>this.setState({show:false,img:''})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )
        }

    }

    componentDidMount() {
        axios.get('https://backend-conference.herokuapp.com/editor/requests')
            .then(response => {
                this.setState({ requests: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container" style={{marginTop: "20px"}}>
                <div className="table-responsive border-dark">
                    <table className="table table-hover table-dark  table-condensed tablebody text-center">
                        <thead style={{position:'sticky',top:0}} className={"tablehead"}>
                            <tr>
                                <th>Title</th>
                                <th>File</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.requests.reverse().map(request =>
                                <React.Fragment>
                                    {(request.type === 'template') ?
                                        <tr>
                                            <td>{request.details.name}</td>
                                            <td><a href={`${request.details.file}`}>Download Template</a></td>
                                            <td><span className={`${this.props.statusColor(request.status)} p-1 text-light rounded`}>{request.status}</span></td>
                                            <td>

                                                <button
                                                    className="btn btn-primary"
                                                    disabled={request.status === 'rejected' || request.status === 'pending' ? false : true}
                                                    onClick={() => this.setState({
                                                        show: true,
                                                        request:request,
                                                        title: request.details.name,
                                                        file: request.details.file
                                                    })}
                                                >
                                                    <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                                </button>
                                            </td>
                                            {this.showView()}
                                        </tr>
                                        : ''}
                                </React.Fragment>

                            )}

                            </tbody>
                        </table>
                    </div>

                <ModalMessage
                    description = {'template was successfully edited'}
                    show={this.state.successModal}
                    onHide={() => this.setState({successModal: false})}
                />

            </div>
        );
    }
}

export default ViewTemplates;
