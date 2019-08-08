import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "@testing-library/react";
import Join from "../Join.js";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

import { createRedux } from "../../redux/store";
import { Provider } from "react-redux";

afterEach(cleanup);

const store = createRedux();

const mockHistory = {
  goBack: jest.fn()
};

const mockFunctions = {
  onChange: jest.fn()
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Join history={mockHistory} onChange={mockFunctions.onChange} />
    </Provider>
  );

describe("Join renders with main components on screen", () => {
  it("Displays a form element", () => {
    const { container } = renderComponent();
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("Displays a speech bubble", () => {
    const { container } = renderComponent();
    const speechBubble = container.querySelector("span");
    expect(speechBubble.innerHTML).toBe("Looking good!");
  });

  it("Displays refresh, join & back button", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("refresh")).toBeInTheDocument();
    expect(getByTestId("back")).toBeInTheDocument();
    expect(getByTestId("join")).toBeInTheDocument();
  });

  it("Displays an avatar", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("avatar-container")).toBeInTheDocument();
  });

  it("It has a button container, which holds two buttons", () => {
    const { getByTestId } = renderComponent();
    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer).toBeInTheDocument();
    expect(buttonContainer.getElementsByTagName("button").length).toBe(2);
  });

  it("Displays an input field for entering a name", () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("Displays an input field for entering a game ID", () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText("Game ID")).toBeInTheDocument();
  });
});

describe("Avatar changes upon click", () => {
  it("Upon click the respective DOM element changes", async done => {
    const { getByTestId } = renderComponent();
    const avatarContainer = getByTestId("avatar-container");
    const refreshButton = getByTestId("refresh");

    waitForDomChange({ avatarContainer })
      .then(() => done())
      .catch(err => console.log(`Error: ${err}`)); // eslint-disable-line no-console
    fireEvent.click(refreshButton);
  });

  it("Upon click the respective state object is updated", async () => {
    const { getByTestId } = renderComponent();
    const refreshButton = getByTestId("refresh");

    const prevAvatar = store.getState().currentUser.userAvatar;
    fireEvent.click(refreshButton);
    // dispatch test is not possible as here only the local state is updated
    // however PlayerAvatar.js has a dispatcher to store, should be tested there
    const newAvatar = store.getState().currentUser.userAvatar;

    expect(prevAvatar).not.toBe(newAvatar);
  });
});

describe("Check Input Fields", () => {
  test("If the value of the Name input field changes on change", () => {
    const { getByPlaceholderText } = renderComponent();
    const nameField = getByPlaceholderText("Name");

    // did not use a spy method, because we would have overwritten
    // actual onChange method
    expect(nameField.value).toBe("");
    fireEvent.change(nameField, { target: { value: "Fabio" } });
    expect(nameField.value).toBe("Fabio");
  });

  test("If the value of the game ID input fiel changes on change", () => {
    const { getByPlaceholderText } = renderComponent();
    const gameField = getByPlaceholderText("Game ID");

    expect(gameField.value).toBe("");
    fireEvent.change(gameField, { target: { value: "Aged-Turn" } });
    expect(gameField.value).toBe("Aged-Turn");
  });
});

describe("Submit Form", () => {
  it("Should update the global state with the form values", () => {
    const { getByPlaceholderText, getByTestId } = renderComponent();
    const nameField = getByPlaceholderText("Name");
    const gameField = getByPlaceholderText("Game ID");
    const joinButton = getByTestId("join");

    fireEvent.change(nameField, { target: { value: "Fabio" } });
    fireEvent.change(gameField, { target: { value: "Aged-Turn" } });

    const prevUserState = store.getState().currentUser;

    expect(prevUserState.playerName).toBeUndefined();
    expect(prevUserState.gameKey).toBeUndefined();

    fireEvent.click(joinButton);

    const newUserState = store.getState().currentUser;

    expect(newUserState.playerName).toBe("Fabio");
    expect(newUserState.gameKey).toBe("Aged-Turn");
  });

  it("Form should not be submitted if empty", () => {
    const { getByTestId } = renderComponent();
    const joinButton = getByTestId("join");

    fireEvent.click(joinButton);

    const { currentUser } = store.getState();

    expect(currentUser.playerName).toBeFalsy();
    expect(currentUser.gameKey).toBeFalsy();
  });
});

describe("Routing", () => {
  it("Back button routes to the previous screen", () => {
    const { getByTestId } = renderComponent();
    const backButton = getByTestId("back");

    fireEvent.click(backButton);
    expect(mockHistory.goBack).toHaveBeenCalledTimes(1);
  });
});
