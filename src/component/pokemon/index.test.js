import React from "react";
import { render, screen } from "@testing-library/react";
import Pokemon from "./";

describe("Pokemon component", () => {
    it("should render whithout crash", async () => {
        render(<Pokemon />);
    });

    it("loader should be rendered while loading", async () => {
        render(<Pokemon />);

        const loader = screen.getByTestId("loader");

        expect(loader).toBeVisible();
    });
});
