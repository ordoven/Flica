import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Image,
  Divider,
  Icon,
  Grid,
  Input,
  Statistic
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
          <Grid stackable columns={2} className="view">
            <Grid.Row>
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
                      centered
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
                        fluid
                      >
                        <Button.Content visible>
                          <Icon fitted name="refresh" />
                        </Button.Content>
                        <Button.Content hidden>Next</Button.Content>
                      </Button>
                    </Grid.Column>
                    <Grid.Column textAlign="center" verticalAlign="middle">
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
                <Grid columns={1} textAlign="center" verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column>
                      <Input
                        fluid
                        focus
                        loading={this.state.loading}
                        size="mini"
                        placeholder="Tag"
                        iconPosition="left"
                        icon="tag"
                        onChange={e => {}}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <div>
                      <Statistic.Group size="tiny">
                        <Statistic inverted>
                          <Statistic.Value>22</Statistic.Value>
                          <Statistic.Label>Seen</Statistic.Label>
                        </Statistic>
                        <Statistic inverted>
                          <Statistic.Value>31,200</Statistic.Value>
                          <Statistic.Label>Wallpapers</Statistic.Label>
                        </Statistic>
                      </Statistic.Group>
                    </div>
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
