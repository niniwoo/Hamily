import React, { useState ,useEffect} from "react";
import Navbar from "./Navbar";
import Banner from "./Banner.js";
import icon from '../css/img/box.png';


const SecretBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [context, setContext] = useState("");
  const [secrets, setSecrets] = useState([]);
  const [user, setUser] = useState("");
  const [sentences,setSentences] =  useState("");
  const [responses, setResponses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    fetch("http://localhost:4000/secret")
      .then((res) => res.json())
      .then((data) => {
        console.log("secret userData: ", data);
        setSecrets(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    if (isChecked) {
      setUser('anonymous');
      return;
    }

    fetch("http://localhost:4000/question",{
      method:"POST",
      crossDomain:true,
      headers:{
        mode:'no-cors',
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("answer userData: ", data);
        setUser(data?.data?.username);  
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [isChecked])

  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentences(context);

    fetch("http://localhost:4000/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        username: user,
        sentences:context,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from the answer component", data);
        if (data.status === "ok") {
          alert("Saved your answer!");
           // set answer state to show the answer below the form
        } else {
          alert("Failed to save your answer.");
        }
      })
      .catch((error) => {
        alert("Error occurred while saving your answer.", error);
      });

    // Add the user's response to the array
    const newResponse = {
      anonymous: isChecked,
      context: context,
      user: user,
    };
    setResponses([...responses, newResponse]);
    setShowForm(false);
  };

  const handleDeleteSecret = (id) => {
    fetch(`http://localhost:4000/secret/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Update the state to remove the deleted secret
        setSecrets(secrets.filter((secret) => secret._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleShowForm = () => {
    setShowForm(true);
  };
  function handleCloseForm() {
    setShowForm(false);
  }
  return (
    <>
     <div className="container">
     <Banner/>
      <div className="secretbox-container">
      {showForm ? (
        <form onSubmit={handleSubmit} className="sb-form">
          {!isChecked && (
            <div>
              <button className='close-btn' onClick={handleCloseForm}>x</button>
              User : {user}
            </div>
          )}
          
          <label htmlFor="checkbox">Anonymous: </label>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <br />

          <label htmlFor="context">Context: </label>
          <input
            type="text"
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <br/>
          <button type="submit" className="sb-submit-btn">Submit</button>
        </form>
      ) : (
        <button onClick={handleShowForm} className="sb-add-btn"> Spill the tea! </button>
      )}

      <ul>
        {secrets.map((secret) => (
          <li key={secret._id} className="secret-list">

            <div className="secrets">
              {/* <button className='close-btn' onClick={() => handleDeleteSecret(secret._id)}>x</button> */}
              <div className='box-icon-container' onClick={() => setShowPopup(true)}>
                <img src={icon} alt='box-icon' className='box-icon'></img>
            </div>
          <p className="sb-username">{secret.username}</p> 
</div>

          </li>
        ))}
      </ul>

      </div>
      {showPopup && (
    <div className="popup">
         <button onClick={() => setShowPopup(false)} className="close-btn">x</button>
              {secrets.map((secret) => (
          <li key={secret._id} className="secret-list">
            <div className="sb-answer">
              <p>Username : {secret.username}</p> 
               <p>Contents :{secret.sentences}</p>
            </div>

          </li>
        ))}
      
    </div>
)}

      <Navbar />
    </div>
    </>
   
  );
};

export default SecretBox;
