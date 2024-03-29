import React, { useState ,useEffect} from "react";
import Navbar from "./Navbar";
import Banner from "./Banner.js";
import icon from '../css/img/box.png';
import icon2 from '../css/img/emptybox.png';

const SecretBox = () => {
const [isChecked, setIsChecked] = useState(false);
  const [context, setContext] = useState("");
  const [secrets, setSecrets] = useState([]);
  const [user, setUser] = useState("");
  const [sentences,setSentences] =  useState("");
  const [responses, setResponses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState(null); // add state variable to track selected secret


useEffect(() => {
  fetch("http://localhost:4000/secret")
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length === 0) {
        setHasData(false);
      } else {
        setSecrets(data.data);
        setHasData(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  const handleSecretClick = (secret) => {
    setSelectedSecret(secret);
  };
  
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
        setUser(data?.username);  
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [isChecked])

  
  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    window.location.reload(false);
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
          console.log("Saved your answer!");
           // set answer state to show the answer below the form
        } else {
          console.log("Failed to save your answer.");
        }
      })
      .catch((error) => {
        console.log("Error occurred while saving your answer.", error);
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
         console.log("deleted successully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleShowForm = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  function handleCloseForm(event) {
    event.preventDefault();
    setShowForm(false);
  }
  return (
    <>
     <div className="container">
     <Banner/>

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
          <button type="submit" className="sb-submit-btn" >Submit</button>
        </form>
      ) : (
        <button onClick={handleShowForm} className="sb-add-btn"> Spill the tea! </button>
      )}
      <div className="secret-container">
          {hasData ? (
            secrets.map((secret) => (
              <div
                key={secret._id}
                className={`secret-list ${
                  selectedSecret && selectedSecret._id === secret._id ? "selected" : "" // highlight selected secret
                }`}
                onClick={() => handleSecretClick(secret)} // handle click
              >
                <div>
                  <img src={icon} alt="box-icon" className="box-icon"></img>
                  <p className="sb-username">{secret.username}</p>
                </div>
              </div>
            ))
          ) : (
                   <div className="sb-nodata">
                    <div className="sb-nodata-item">
                      <img src={icon2} alt='box-icon' className='emptybox-icon'></img> <br/>                     
                      <b>Secret Box hasn't created yet! </b>
                    </div>
                   </div>
             )}

        {selectedSecret && (
          // show selected secret details
     <div className="popup">
            <div className="sb-answer">
             <button onClick={() => setSelectedSecret(false)} className="close-btn">x</button>
            <b> Username: {selectedSecret.username}</b>
            <b> Content: {selectedSecret.sentences}</b>
            <br/>
             <button className="sb-delete" onClick={() => handleDeleteSecret(selectedSecret._id)}>delete</button>
          </div>
     </div>

        )}
        </div>
      <Navbar />
      </div> 
    </>
   
  );
};

export default SecretBox;
