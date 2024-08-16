import React from "react";
import { render, act } from "@testing-library/react";
import { UserProvider, useUser } from "./UserProvider";
import { useAuth } from "../contexts/authContext";

// Mock useAuth hook
jest.mock("../contexts/authContext", () => ({
  useAuth: jest.fn(() => ({
    currentUser: { email: "munli2002@gmail.com" },
    userLoggedIn: true,
  })),
}));

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        user: { username: "testHENRY", email: "munli2002@gmail.com" },
      }),
  })
);

describe("UserProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    let component;

    await act(async () => {
      component = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    const { getByText } = component;

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state if fetch fails", async () => {
    // Mock fetch function to simulate failure
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: "User not found" }),
      })
    );

    let component;

    await act(async () => {
      component = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    const { getByText } = component;

    expect(getByText("Error: Failed to fetch user")).toBeInTheDocument();
  });

  it("renders user data after successful fetch", async () => {
    let component;

    await act(async () => {
      component = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    const { getByText } = component;

    expect(getByText("Username: testHENRY")).toBeInTheDocument();
    expect(getByText("Email: munli2002@gmail.com")).toBeInTheDocument();
  });
});

// Test component using useUser hook
const TestComponent = () => {
  const { user, loading, error } = useUser();
  console.log("user: ", user);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <label>Username:</label>
        <p>{user.username}</p>
      </div>
      <div>
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
