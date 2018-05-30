import React from "react"; // eslint-disable-line no-use-before-define
import ReactDOM from "react-dom"; // eslint-disable-line no-use-before-define
import App from "./App"; // eslint-disable-line no-use-before-define

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
