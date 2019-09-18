import React, { Component } from "react";
import logo from "../Assets/logo.jpg";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
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
        applicationId: process.env.REACT_APP_ID,
        secret: process.env.REACT_APP_SECRET
      })
    };
  }

  fetchImage() {
    this.setState({ loading: true });
    this.state.unsplash.photos
      .getRandomPhoto({
        width: this.state.mobile ? 720 : 1024,
        height: this.state.mobile ? 1280 : 576,
        query: this.state.query
      })
      .then(toJson)
      .then(json => {
        let copyGallery = this.state.gallery;
        copyGallery.push(json);
        this.setState({
          gallery: copyGallery
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({
            loading: false
          });
          console.info(this.state.gallery);
        }, 2000);
      });
  }

  forceDownload(photo) {
    if (photo === null || photo === undefined) {
      return;
    } else {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", photo.urls.raw, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement("a");
        tag.href = imageUrl;
        tag.download = photo.alt_description;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      };
      xhr.send();
    }
  }

  getCurrentPhoto() {
    if (this.state.gallery.length > 0) {
      return this.state.gallery[this.state.gallery.length - 1];
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.fetchImage();
  }

  infoNode = props =>
    props.description !== null && (
      <Segment>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </Segment>
    );

  modalNode = props => (
    <Modal.Content image>
      <Button
        onClick={() => {
          this.forceDownload(props.photo);
        }}
        className="image-button"
        fluid
      >
        <Image
          centered
          rounded
          wrapped
          inline
          size="large"
          src={props.photo.urls.regular}
        />
      </Button>
    </Modal.Content>
  );

  render() {
    return (
      <div className="App">
        <header>
          <Image className="logo" src={logo} size="small" />
          <Grid stackable columns={2} className="view">
            <Grid.Row>
              <Grid.Column width="10">
                <Button
                  onClick={() => {
                    let currentPhoto = this.getCurrentPhoto();
                    if (currentPhoto) {
                      this.forceDownload(currentPhoto);
                    }
                  }}
                  className="image-button"
                  fluid
                >
                  <Image
                    src={
                      this.state.gallery.length > 0
                        ? this.state.gallery[this.state.gallery.length - 1].urls
                            .custom
                        : ""
                    }
                    size="massive"
                    rounded={true}
                    centered
                  />
                </Button>
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
                          if (this.state.keywordSearch && !this.state.query) {
                            this.setState({ error: true });
                          } else {
                            this.setState({
                              error: false,
                              mobile: !this.state.mobile,
                              loading: true
                            });
                            setTimeout(() => this.fetchImage(), 100);
                          }
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
                          <this.modalNode photo={item} key={item.id} />
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
                        {this.getCurrentPhoto() && (
                          <this.infoNode
                            title="Title"
                            description={this.getCurrentPhoto().alt_description}
                          />
                        )}
                        {this.getCurrentPhoto() && (
                          <this.infoNode
                            title="Description"
                            description={this.getCurrentPhoto().description}
                          />
                        )}
                        {this.getCurrentPhoto() && (
                          <this.infoNode
                            title="Created At"
                            description={this.getCurrentPhoto().created_at}
                          />
                        )}
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
