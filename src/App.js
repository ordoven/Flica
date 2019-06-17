import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Image,
  Divider,
  Icon,
  Container,
  Grid,
  Checkbox
} from "semantic-ui-react";

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
          <Image className="logo" src={logo} size="small" />

          <Grid stackable columns={2}>
            <Grid.Row className="left-row">
              <Grid.Column width="10">
                <div className="image">
                  <a
                    download
                    href={this.state.responseURL}
                    target={this.state.responseURL}
                  >
                    <Image
                      size={this.state.mobile ? "medium" : "massive"}
                      src={this.state.responseURL}
                      rounded={true}
                      fluid
                    />
                  </a>
                </div>
              </Grid.Column>
              <Grid.Column width="6">
                <Grid columns={2} divided verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column textAlign="center" verticalAlign="middle">
                      <Button
                        animated="fade"
                        loading={this.state.loading}
                        onClick={this.fetchImage.bind(this)}
                        // size="massive"
                        fluid
                      >
                        <Button.Content visible>
                          <Icon fitted name="refresh" />
                        </Button.Content>
                        <Button.Content hidden>New</Button.Content>
                      </Button>
                    </Grid.Column>
                    <Grid.Column textAlign="center" verticalAlign="middle">
                      {/* <Checkbox
                        toggle
                        disabled={this.state.loading}
                        checked={this.state.mobile}
                        onChange={() => {
                          this.setState({
                            mobile: !this.state.mobile,
                            loading: true
                          });
                          setTimeout(() => this.fetchImage(), 1);
                        }}
                      /> */}

                      <Button
                        animated="fade"
                        onMouseDown={e => e.preventDefault()}
                        loading={this.state.loading}
                        onClick={() => {
                          this.setState({
                            mobile: !this.state.mobile,
                            loading: true
                          });
                          setTimeout(() => this.fetchImage(), 10);
                        }}
                        // size="massive"
                        fluid
                      >
                        <Button.Content visible>
                          <Icon
                            fitted
                            name={this.state.mobile ? "mobile" : "computer"}
                          />
                        </Button.Content>
                        <Button.Content hidden>
                          <Icon
                            fitted
                            name={this.state.mobile ? "computer" : "mobile"}
                          />
                        </Button.Content>
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
        </header>
      </div>
    );
  }
}

export default App;
