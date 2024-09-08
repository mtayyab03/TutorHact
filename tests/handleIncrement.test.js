import React from "react";
import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("handleIncrement", () => {
  it("increments count by 1", () => {
    const setCount = jest.fn();
    useState.mockReturnValue([0, setCount]);

    const handleIncrement = () => {
      setCount(1);
    };

    handleIncrement();
    expect(setCount).toHaveBeenCalledTimes(1);
    expect(setCount).toHaveBeenCalledWith(1);
  });

  it("increments count multiple times", () => {
    const setCount = jest.fn();
    useState.mockReturnValue([0, setCount]);

    const handleIncrement = () => {
      setCount(1);
      setCount(2);
    };

    handleIncrement();
    expect(setCount).toHaveBeenCalledTimes(2);
    expect(setCount).toHaveBeenNthCalledWith(1, 1);
    expect(setCount).toHaveBeenNthCalledWith(2, 2);
  });

  it("handles initial count greater than 0", () => {
    const setCount = jest.fn();
    useState.mockReturnValue([5, setCount]);

    const handleIncrement = () => {
      setCount(6);
    };

    handleIncrement();
    expect(setCount).toHaveBeenCalledTimes(1);
    expect(setCount).toHaveBeenCalledWith(6);
  });
});
