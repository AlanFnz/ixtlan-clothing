import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import emailjs from "emailjs-com";
// Selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
// Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// Styles
import "./contact-form.styles.scss";

const ContactForm = (props) => {
  emailjs.init(process.env.REACT_APP_EMAILJS_USERID)
  const [state, setState] = useState({
    email: "",
    message: "",
  });

  useEffect(() => {
    if (props.currentUser && props.currentUser.email) {
      setState((prevState) => ({
        ...prevState,
        email: props.currentUser.email,
      }));
    }
  }, [props.currentUser]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, message } = state; 

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_TEMPLATEID: templateId,
      REACT_APP_EMAILJS_USERID: user,
    } = process.env;

    const sendMessage = ({
      templateId,
      senderEmail,
      receiverEmail,
      data,
      user,
    }) => {
      emailjs
        .send(
          "default_service",
          templateId,
          {
            senderEmail,
            receiverEmail,
            data,
          },
          user
        )
        .then((res) => {
          if (res.status === 200) {
            console.log('Success, check your email');
          }
        })

        .catch((err) => {
          console.error("Failed to send feedback. Error: ", err);
        });
    };

    sendMessage({
      templateId,
      email,
      receiverEmail,
      message,
      user,
    });

  };

  return (
    <div className="contact-form">
      <h2 className="title">Leave your message</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          style={{ background: "rgba(245,245,245,0.6)" }}
          name="email"
          type="email"
          value={state.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          Tag="textarea"
          style={{
            height: "150px",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            background: "rgba(245,245,245,0.6)",
          }}
          name="message"
          type="textarea"
          value={state.message}
          handleChange={handleChange}
          label="message"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Send message</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ContactForm);
