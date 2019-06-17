import React from "react";
import "./App.css";
import { Button, Image, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const mobile = false;
  return (
    <div className="App">
      <header className="App-header">
        <div className="image">
          <Image
            onClick
            src={
              "https://source.unsplash.com/random/" +
              (mobile ? "720x1280" : "1920x1080")
            }
            rounded
            fluid
          />
          <Divider />
          <Image
            src="https://images.unsplash.com/photo-1557546883-32d60b7e1c38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            rounded
            fluid
          />
          <Divider />
        </div>
        <Button>Click Here</Button>
      </header>
    </div>
  );
}

export default App;
