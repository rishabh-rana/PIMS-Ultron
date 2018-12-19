import React from "react";

const CreateForm = props => {
  var { createnewform } = props;

  return (
    <div className="jumbotron">
      <h3> Create a new form </h3>
      <div className="subtext">
        Enter a name and press enter to add a new form
      </div>
      <input
        onKeyPress={e => createnewform(e)}
        placeholder="Enter a name for your form"
      />
    </div>
  );
};

export default CreateForm;
