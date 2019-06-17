import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Image, Divider } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false,
      responseURL: ""
    };
  }

  componentDidMount() {
    fetch(
      new Request(
        "https://source.unsplash.com/random/" +
          (this.state.mobile ? "720x1280" : "1920x1080")
      )
    ).then(response => {
      this.setState({ responseURL: response.url });
      console.log(this.state.responseURL);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="image">
            <a download href={this.state.responseURL}>
              <Image
                size={this.state.mobile ? "medium" : "massive"}
                src={this.state.responseURL}
                // centered
                rounded
                // fluid
              />
            </a>
            <Divider />
          </div>
          <Button>Click Here</Button>
        </header>
      </div>
    );
  }
}

export default App;
