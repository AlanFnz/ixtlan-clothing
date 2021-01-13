import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Selectors
import { selectCurrentUser } from '../../redux/user/user.selectors';
// Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// Styles
import "./contact-form.styles.scss";

const ContactForm = (props) => {
  const [state, setState] = useState({
    email: "",
    message: "",
	});

	useEffect(() => {
		if (props.currentUser && props.currentUser.email) {
			setState((prevState) => ({ ...prevState, email: props.currentUser.email }))
		}
	}, [props.currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="contact-form">
      <h2 className="title">Leave your message</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
				style={{ background: "rgba(245,245,245,0.6)"}}
          name="email"
          type="email"
          value={state.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
					Tag='textarea'
					style={{ height: "150px", overflowWrap: 'break-word', wordWrap: 'break-word', background: "rgba(245,245,245,0.6)"}}
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
