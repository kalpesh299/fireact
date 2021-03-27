import React, { useState, useEffect} from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function GetFirebase() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const ref = firebase.firestore().collection("schools");

  //ONE TIME GET FUNCTION
  function getSchools2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getSchools2();
    
  }, []);

  // ADD FUNCTION
  function addSchool(newSchool) {
    ref

      .doc(newSchool.id)
      .set(newSchool)
      .then(() => {
        setSchools((prev) => [newSchool, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteSchool(school) {
    ref
      .doc(school.id)
      .delete()
      .then(() => {
        setSchools((prev) =>
          prev.filter((element) => element.id !== school.id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editSchool(updatedSchool) {
    setLoading();
    ref
      .doc(updatedSchool.id)
      .update(updatedSchool)
      .then(() => {
        setSchools((prev) =>
          prev.map((element) => {
            if (element.id !== updatedSchool.id) {
              return element;
            }
            return updatedSchool;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <h1 className="head">Student Info</h1>
      <div className="inputBox">
        <h3 className="sub">Add New</h3>
        <div className="form-group flex-nowrap">
                <div className="input-group-prepend">
                 <div className="input-group-text bg-danger">
                       <i className="fas fa-user "></i>
                 </div>
                 <input className="form-control" type="text" value={title} placeholder="Type student name" onChange={(e) => setTitle(e.target.value)}></input>

                </div>

          </div>
          <div className="form-group flex-nowrap">
                <div className="input-group-prepend">
                 <div className="input-group-text bg-danger">
                       <i className="fas fa-mobile-alt"></i>
                 </div>
                 <input className="form-control" value={desc} placeholder="Phone no" onChange={(e) => setDesc(e.target.value)}></input>

                </div>

             </div>
        <button onClick={() => addSchool({ title, desc, id: uuidv4() })}>
          +Add+
        </button>
      </div>
      
      {loading ? <h1>Loading...</h1> : null}
      {schools.map((school) => (
        <div className="school" key={school.id}>
          <h2><span className="size">Name:</span>{school.title}</h2>
          <p><span className="size">Ph No:</span>{school.desc}</p>
          <div>
            <button onClick={() => deleteSchool(school)} className="cross">X</button>
            <button
              onClick={() =>
                editSchool({ title: school.title, desc, id: school.id })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetFirebase;
