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
    <div>
      <Navbar />
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
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={handleShowForm}>Add SecretBox</button>
      )}

      <ul>
        {responses.map((response, index) => (
          <li key={index}>
           User name:   {response.anonymous ? "Anonymous" : response.user} <br/> {response.context}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecretBox;
