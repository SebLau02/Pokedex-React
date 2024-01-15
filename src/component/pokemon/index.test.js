import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Pokemon from "./";
import Card from "../card";

describe("Pokemon component", () => {
    it("should render whithout crash", async () => {
        render(<Pokemon />);
    });

    it("loader should be present while loading", async () => {
        render(<Pokemon />);

        const loader = screen.getByTestId("loader");

        expect(loader).toBeVisible();
    });
});
