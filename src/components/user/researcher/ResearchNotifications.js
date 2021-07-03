import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import '../../../styles/ReviewerResearchUploads.css';
import PopUp from '../../PopUp'



export default class ResearchNotifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            researchUploads: {},
            email: '',
            _id: '',
            paymentStatus: '',
            show:true,
            color:'#06357a'
        }
    }


    componentDidMount() {
        console.log("received research props: ", this.props.researchUploads);
        this.setState( {researchUploads: this.props.researchUploads});
        this.setState( {email: this.props.researchUploads.user});
        this.setState( {_id: this.props.researchUploads._id});
        this.setState( {paymentStatus: this.props.researchUploads.details?this.props.researchUploads.details.paymentStatus:''});
    }


    navigateToPaymentPage(email, id) {
        console.log(id)
        window.location = `/researcher/payment/${email}/${id}`
    }

    showResearchNotification() {

        if (this.state.researchUploads.status === "approved") {

            if (this.state.paymentStatus === "paid") {

                return (

                    <div>
                        <PopUp description={`Your Research Paper Submission has
                        been ${this.state.researchUploads.details.paymentStatus}`} show={this.state.show} onHide={()=>this.setState({show:false})}/>

                        <h3>You have made the Payment Successfully!</h3>

                        <Button style={{backgroundColor:this.state.researchUploads.details.paymentStatus === "paid" ? '#85a8dd':this.state.color}} disabled={this.state.researchUploads.details.paymentStatus === "paid" ? true : false}
                                onClick={() => this.navigateToPaymentPage(this.state.email, this.state._id)}
                                className="rev-btn-payment">Proceed To Payment</Button>

                    </div>
                )
            } else {
                return (

                    <div>
                        <div>
                            <PopUp description={`Your Research Paper Submission has
                        been ${this.state.researchUploads.status}`} show={this.state.show} onHide={()=>this.setState({show:false})}/>
                        </div>

                        <h3>Proceed with making the payment to publish your research at the Conference</h3>

                        <Button style={{backgroundColor:this.state.researchUploads.details.paymentStatus === "pending" ? this.state.color:'#85a8dd'}}
                                disabled={this.state.researchUploads.details.paymentStatus === "pending" ? false : true}
                                onClick={() => this.navigateToPaymentPage(this.state.email, this.state._id)}
                                className="rev-btn-payment">Proceed To Payment</Button>

                    </div>
                )
            }

        } else if (this.state.researchUploads.status === "rejected") {
            return (

                <div>
                    <PopUp description={`This is to inform you that your Research Paper Submission has
                        been ${this.state.researchUploads.status}`} show={this.state.show} onHide={()=>this.setState({show:false})}/>
                </div>
            )
        } else if (this.state.researchUploads.status === "pending") {
            return (

                <div>
                    <PopUp description={"Ths is to inform you that your Research Paper Submission is yet to be reviewed..."} show={this.state.show} onHide={()=>this.setState({show:false})}/>
                </div>
            )
        } else if(this.state.researchUploads.details===null ){
            return (
                <PopUp description={"No notifications"} show={this.state.show} onHide={()=>this.setState({show:false})}/>
            )

        }
    }

    render() {
        return (
            <div className={"container p-5 text-center mt-5 text-light"}>

                {this.showResearchNotification()}

            </div>
        )
    }

}
