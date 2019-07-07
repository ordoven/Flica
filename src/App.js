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
  Radio,
  Segment,
  Label,
  Modal
} from "semantic-ui-react";
import Unsplash, { toJson } from "unsplash-js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false,
      loading: false,
      keywordSearch: false,
      error: false,
      gallery: [],
      query: "",
      unsplash: new Unsplash({
        applicationId:
          "ccb07e71cb4e97185a7cecab55d1ad1024b89c062f8759b9ccae6870db7280fa",
        secret:
          "901ffa2f5250f014bfc2db11c4eeea78df401bdfbf442f8e83942fcc0497c2e5"
      }),
      photo: {}
    };
  }

  fetchImage() {
    this.setState({ loading: true });
    this.state.unsplash.photos
      .getRandomPhoto({
        width: this.state.mobile ? 720 : 1920,
        height: this.state.mobile ? 1280 : 1080
      })
      .then(toJson)
      .then(json => {
        let copyGallery = this.state.gallery;
        copyGallery.push(json);
        this.setState({
          photo: json,
          gallery: copyGallery
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({
            loading: false
          });
          console.log(this.state.gallery);
        }, 2000);
      });
  }

  componentDidMount() {
    this.fetchImage();
  }

  modalNode = props => (
    <Modal.Content image>
      <Image
        centered
        rounded
        as="a"
        href={props.url}
        wrapped
        inline
        size="large"
        src={props.url}
      />
    </Modal.Content>
  );

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image className="logo" src={logo} size="small" />
          <Grid stackable columns={2} className="view">
            <Grid.Row>
              <Grid.Column width="10">
                <a
                  href={
                    this.state.gallery.length > 0
                      ? this.state.photo.links.download
                      : "#"
                  }
                  target={
                    this.state.gallery.length > 0
                      ? this.state.photo.links.download
                      : "#"
                  }
                  className="image"
                  download
                >
                  <Image
                    src={
                      this.state.gallery.length > 0
                        ? this.state.photo.urls.full
                        : ""
                    }
                    size={this.state.size ? "medium" : "massive"}
                    rounded={true}
                    centered
                  />
                </a>
              </Grid.Column>
              <Grid.Column width="6">
                <Grid columns={3} divided verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column textAlign="center" verticalAlign="middle">
                      <Button
                        size="huge"
                        animated="fade"
                        loading={this.state.loading}
                        disabled={this.state.loading}
                        onClick={() => {
                          if (this.state.keywordSearch && !this.state.query) {
                            this.setState({ error: true });
                          } else {
                            this.setState({ error: false });
                            this.fetchImage();
                          }
                        }}
                        onMouseDown={e => e.preventDefault()}
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
                        size="huge"
                        animated="fade"
                        onMouseDown={e => e.preventDefault()}
                        loading={this.state.loading}
                        disabled={this.state.loading}
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
                    <Grid.Column textAlign="center" verticalAlign="middle">
                      <Modal
                        trigger={
                          <Button
                            size="huge"
                            fluid
                            inverted
                            as="div"
                            labelPosition="left"
                          >
                            <Label pointing="right">
                              {this.state.gallery.length}
                            </Label>
                            <Button size="huge" fluid icon>
                              <Icon fitted name="picture" />
                            </Button>
                          </Button>
                        }
                      >
                        <Modal.Header>Wallpaper Gallery</Modal.Header>
                        {this.state.gallery.map((item, key) => (
                          <this.modalNode url={item.urls.full} key={item.id} />
                        ))}
                      </Modal>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider inverted />
                </Grid>
                <Grid
                  stackable
                  columns={1}
                  textAlign="center"
                  verticalAlign="middle"
                >
                  <Grid.Row>
                    <Grid.Column>
                      <Segment>
                        <Radio
                          label="Search by tag"
                          fitted
                          toggle
                          onChange={e => {
                            if (this.state.keywordSearch) {
                              this.setState({ query: "" });
                            }
                            this.setState({
                              keywordSearch: !this.state.keywordSearch
                            });
                          }}
                        />

                        <Input
                          disabled={!this.state.keywordSearch}
                          focus
                          inverted
                          loading={this.state.loading}
                          size="large"
                          placeholder="Tag"
                          iconPosition="left"
                          icon="tag"
                          error={this.state.error}
                          onChange={e => {
                            this.setState({ query: e.target.value });
                          }}
                        />
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Segment>
                        <Segment>
                          <h2>Title</h2>
                          <p>{this.state.photo.alt_description}</p>
                        </Segment>
                        <Segment>
                          <h2>Description</h2>
                          <p>{this.state.photo.description}</p>
                        </Segment>
                        <Segment>
                          <h2>Created At</h2>
                          <p>{this.state.photo.created_at}</p>
                        </Segment>
                      </Segment>
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
