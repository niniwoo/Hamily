import React, { useState } from "react";
import Navbar from "./Navbar";

const SecretBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [context, setContext] = useState("");
  const [user, setUser] = useState("");
  const [responses, setResponses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the user's response to the array
    const newResponse = {
      anonymous: isChecked,
      context: context,
      user: user,
    };
    setResponses([...responses, newResponse]);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="secretbox-container">
      {showForm ? (
        <form onSubmit={handleSubmit}>
          {!isChecked && (
            <div>
              User :{" "}
              <input type="text" id="user" onChange={(e) => setUser(e.target.value)} />
            </div>
          )}
          <label htmlFor="checkbox">Anonymous:</label>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <br />

          <label htmlFor="context">Context:</label>
          <input
            type="text"
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <button type="submit" className="sb-submit-btn">Submit</button>
        </form>
      ) : (
        <button onClick={handleShowForm} className="sb-add-btn">Add SecretBox</button>
      )}

      <ul>
        <div >
           {responses.map((response, index) => (
          <li key={index} className="sb-answer-container">
           User name:   {response.anonymous ? "Anonymous" : response.user} <br/> {response.context}
          </li>
        ))}
        </div>
       
      </ul>
      </div>
    
      <Navbar />
    </div>
  );
};

export default SecretBox;
