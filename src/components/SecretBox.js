import React, { useState } from "react";
import Navbar from "./Navbar";

const SecretBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the user's responses
    console.log(context);
    setResult(`You entered: ${isChecked ? "Anonymous" : "Not anonymous"}, ${context}`);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Navbar/>
      {showForm ? (
        <form onSubmit={handleSubmit}>
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
      <p>{result}</p>
    </div>
  );
};

export default SecretBox;
