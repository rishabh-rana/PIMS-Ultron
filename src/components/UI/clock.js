import React, { Component } from "react";

class Clock extends Component {
  state = {
    time: new Date()
  };

  componentDidMount() {
    this.update = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1 * 1000); // every 1 seconds
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  render() {
    var hour = this.state.time.getHours();
    var shift;
    if (hour < 14 && hour > 5) {
      shift = "A";
    } else if (hour < 22 && hour > 13) {
      shift = "B";
    } else {
      shift = "C";
    }

    return (
      <div>
        <span className="badge badge-info">{shift}</span> |{" "}
        {this.state.time.toLocaleTimeString()}
      </div>
    );
  }
}

export default Clock;
