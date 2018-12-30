import React, { Component } from "react";

import loader from "../UI/loader/loader";

class Currentforms extends Component {
  componentDidMount() {
    // this.props.syncforms();
  }

  state = {
    active: null
  };

  render() {
    if (this.props.forms === null) {
      return <div>{loader}</div>;
    }

    var { forms, selectform, filter } = this.props;
    var roman = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV"
    ];
    var count = -1;
    return (
      <div className="container">
        <div
          style={{
            display: "table",
            width: "100%",
            marginTop: "3px"
          }}
        >
          <div style={{ display: "table-row", width: "100%" }}>
            {Object.keys(forms).map(id => {
              if (!filter || forms[id].published) {
                count++;
                let mycount = count;
                var bg = "rgba(0,0,0,0.2)";
                if (this.state.active === mycount) {
                  bg = "rgba(0,0,0,0.4)";
                }
                return (
                  <div
                    key={id}
                    style={{
                      display: "table-cell",
                      border: "1px solid rgba(0,0,0,0.1)"
                    }}
                  >
                    <button
                      className="btn btn-light"
                      style={{
                        background: bg,
                        borderRadius: "0",
                        width: "100%",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.props.backbutton();
                        selectform(id);
                        this.setState({ active: mycount });
                      }}
                    >
                      {roman[count]}{" "}
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Currentforms;
