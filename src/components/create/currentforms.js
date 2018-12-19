import React, { Component } from "react";

import loader from "../UI/loader/loader";

class Currentforms extends Component {
  componentDidMount() {
    // this.props.syncforms();
  }

  render() {
    if (this.props.forms === null) {
      return (
        <div>
          <h3>Currently active forms:</h3>
          {loader}
        </div>
      );
    }

    var { forms, selectform, filter } = this.props;

    return (
      <div>
        {Object.keys(forms).map(id => {
          if (!filter || forms[id].published) {
            return (
              <div key={id} className="card mt-1">
                <div className="card-body">
                  <div className="card-title">
                    <button
                      className="btn btn-dark"
                      onClick={() => selectform(id)}
                    >
                      {forms[id].title}
                    </button>
                  </div>
                  <div className="badge badge-primary">
                    version: {forms[id].version}
                  </div>
                  <div className="badge badge-danger ml-2">
                    {forms[id].unpublishedchanges && "unpublished changes"}
                  </div>
                  <div className="badge badge-primary ml-2">
                    created:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    }).format(forms[id].created)}
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default Currentforms;
