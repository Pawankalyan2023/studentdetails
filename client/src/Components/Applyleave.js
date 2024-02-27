import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { Button } from "flowbite-react";

export default function Applyleave() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const templateid = "template_wespcsd";
  const serviceid = "service_pynmyzo";
  const publickey = "M3959Q68fsaCCJ2vR";

  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      from_email: mail, // Fix the variable name here
      to_name: 'bpawankalyan.it2021@citchennai.net',
      message: message,
    };

    // Send the email using Email JS
    emailjs.send(serviceid, templateid, templateParams, publickey)
      .then((response) => {
        alert("Email Sent Successfully");
        setName('');
        setMail('');
        setMessage('');
      })
      .catch((error) => {
        alert('Error sending email: ' + error);
      });
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-4xl">Apply leave</h1>
      <div className="p-5">
        <label
          for="input-group-1"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <div class="relative mb-6">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Jonh"
            name="user_name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="p-5">
        <label
          for="input-group-1"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Manager MailID
        </label>
        <div class="relative mb-6">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            name="user_email"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
      </div>
      <div className="p-5">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          name="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <Button
        type="submit"
        value="send"
        className="bg-blue-600 mr-5"
        onClick={sendEmail}
      >
        Submit
      </Button>
    </div>
  );
}
