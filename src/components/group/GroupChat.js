import React, { Component } from 'react'
import { Col } from 'reactstrap';
import "../Conpanion.css";
import GroupChatMessage from "./GroupChatMessage"

export default class GroupChat extends Component {

    // Set initial state
    state = {
        "message": "",
        "timeDisplay": "",
        "timestamp": "",
        "userId": ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Add new message to chat room
    addNewMessage = event => {
        event.preventDefault();     // Cancels the default action of the submit.
        event.target.reset();       // Resets values after submit.

        let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        let d = new Date();
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = ("0" + d.getMinutes()).slice(-2);
        let suffix = "AM";
	    if (hours > 12) {
		    suffix = "PM";
		    hours = hours - 12;
        }
        else if (hours === 12) {
		    suffix = "PM";
        }
        let dateDisplay = months[month] + "/" + date + "/" + year + " at " + hours + ":" + minutes + " " + suffix;
        let timestamp = d.getTime();
        let sessionUser = sessionStorage.getItem("User");

        const newMessage = {
            message: this.state.message,
            timeDisplay: dateDisplay,
            timestamp: timestamp,
            userId: Number(sessionUser),
            groupId: Number(this.props.match.params.groupId)
        }

        // Create the message and then refresh chatroom
        this.props.addMessage(newMessage);
        this.scrollToBottom();
    }

    // Set scrollbar to bottom
    componentDidMount() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        const {chatBox} = this.refs;
        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }

    render() {

        const groupMessages = this.props.messages.filter(message => message.groupId === Number(this.props.match.params.groupId))

        return (
            <Col sm="6" className="chatroom">
                {/* <h5>Chat</h5> */}
                <div className="chat_box" ref={`chatBox`}>
                    {
                        groupMessages.map(message =>
                            <GroupChatMessage key={message.id} message={message} users={this.props.users} {...this.props} />
                        )
                    }
                </div>
                <form id="chatMessageForm" className="d-flex justify-content-between" onSubmit={this.addNewMessage}>
                    <div className="message_input">
                        <input type="text" required
                            placeholder="Enter your message here"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message" />
                    </div>
                    <div className="message_btn">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </Col>
        )
    }
}