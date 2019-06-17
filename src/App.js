import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Image, Divider, Icon, Container } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false,
      loading: false,
      responseURL: ""
    };
  }

  fetchImage() {
    this.setState({ loading: true });
    fetch(
      new Request(
        "https://source.unsplash.com/random/" +
          (this.state.mobile ? "720x1280" : "1920x1080")
      )
    ).then(response => {
      this.setState({ responseURL: response.url });
      console.log(this.state.responseURL);
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000);
    });
  }

  componentDidMount() {
    this.fetchImage();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image src={logo} size="small" />
          <div className="image">
            <a download href={this.state.responseURL}>
              <Image
                size={this.state.mobile ? "medium" : "massive"}
                src={this.state.responseURL}
                rounded
              />
            </a>
            <Divider />
          </div>
          <Button
            loading={this.state.loading}
            onClick={this.fetchImage.bind(this)}
            icon
            labelPosition="left"
          >
            <Icon name="refresh" />
            New Wallpaper
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
