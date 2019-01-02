import React from "react";

const Profile = props => {
  return (
    <div className="container">
      <div className="form-group mt-5">
        <label for="username">Username</label>
        <input
          defaultValue={props.username}
          onBlur={e => props.updateusername(e)}
          type="text"
          className="form-control"
          id="username"
          aria-describedby="usernamechange"
          placeholder="Enter name"
          name="name"
        />
      </div>
      <div className="form-group">
        <label for="id">User ID</label>
        <input
          defaultValue={props.userid}
          disabled={true}
          type="text"
          className="form-control"
          id="id"
          aria-describedby="id"
          placeholder="Id"
          name="id"
        />
      </div>
      <div className="form-group mt-5">
        <button
          onClick={props.sendresetpasswordemail}
          className="btn btn-warning"
        >
          Change Password
        </button>
        <div className="small">A link will be sent to the email Id</div>
      </div>
    </div>
  );
};

export default Profile;
