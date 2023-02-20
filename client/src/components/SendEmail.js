import React, { useState } from "react";
import axios from "axios";

const SendEmail = () => {
  const [user, setUser] = useState({
    to: "",
    subject: "",
    description: "",
  });

  const [msg, setMsg] = useState("");

  // handleChange
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/send/email`,
        user
      );

      console.log(res.data);
      setMsg(res.data.resMsg);
      setUser({to: '', sub: '', desc: ''})
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <h3 className="text-center text-success mb-2 mt-4">
          Email Send using React and Node
        </h3>

        <div className="row">
          <div className="col-sm-4 mx-auto shadow p-5">
            <h4 className="text-center mb-2">Send E Mail </h4>
            <p
              className="mb-3 mt-2"
              style={{ color: "green", marginLeft: "57px" }}
            >
              {msg}
            </p>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="To"
                name="to"
                onChange={handleChange}
              />
            </div>
            <div className="form-group  mb-4 ">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Subject"
                name="subject"
                onChange={handleChange}
              />
            </div>
            <div className="form-group  mb-4">
              <textarea
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary btn-block "
              style={{ marginLeft: "100px" }}
              onClick={handleSubmit}
            >
              Send Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
