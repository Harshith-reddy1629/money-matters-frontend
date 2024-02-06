import { useRef, useState } from "react";

import emailjs from "@emailjs/browser";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

function Contact() {
  const form = useRef();

  const [errorForm, setError] = useState({
    nameError: "",
    mailError: "",
    messageError: "",
  });
  const sendEmail = (e) => {
    e.preventDefault();

    console.log(form.current[0].value);

    if (
      !form.current[0].value ||
      !form.current[1].value ||
      !form.current[2].value
    ) {
      setError({
        nameError: !form.current[0].value ? "Required*" : "",
        mailError: !form.current[1].value ? "Required*" : "",
        messageError: !form.current[2].value ? "Required*" : "",
      });
    } else {
      emailjs
        .sendForm(
          import.meta.env.VITE_MY_SERVICE_ID,
          import.meta.env.VITE_MY_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_MY_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result);
            toast.success("Transaction Updated");
            form.current[0].value = "";
            form.current[1].value = "";
            form.current[2].value = "";
          },
          (error) => {
            toast.error("Error");
          }
        );
    }
  };
  return (
    <form
      ref={form}
      className="contact-form"
      onFocus={() =>
        setError({
          nameError: " ",
          mailError: " ",
          messageError: " ",
        })
      }
      onSubmit={sendEmail}
    >
      <div className="input-container">
        <ToastContainer />
        <label htmlFor="name">Name</label>
        <input
          className="message-input"
          id="name"
          type="text"
          name="from_name"
          placeholder="Your name"
        />
        <p className="error-text">{errorForm.nameError}</p>
      </div>
      <div className="input-container">
        <label htmlFor="mail">Email</label>
        <input
          className="message-input"
          id="mail"
          type="mail"
          name="from_email"
          placeholder="Your mail"
        />
        <p className="error-text">{errorForm.mailError}</p>
      </div>
      <div className="input-container">
        <label htmlFor="message">Message</label>
        <textarea
          rows="8"
          id="message"
          name="message"
          placeholder="Message"
          className="message-input"
        />
        <p className="error-text">{errorForm.messageError}</p>
      </div>
      <input className="message-input submit-btn " type="submit" value="Send" />
    </form>
  );
}

export default Contact;
