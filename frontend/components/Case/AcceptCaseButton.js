import React from "react";
import axios from '../../src/API';

const URL = '/newcase';

const AcceptCaseButton = ({ userID }) => {
  const handleAcceptCase = async () => {
    try {
      const response = await axios.post(
        URL,
        { userID },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert(response.data.message);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error accepting case:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response received from the server.");
      } else {
        alert("An error occurred while setting up the request.");
      }
    }
  };

  return (
    <button onClick={handleAcceptCase}>
      Accept Case
    </button>
  );
};

export default AcceptCaseButton;