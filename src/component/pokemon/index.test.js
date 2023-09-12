import React from "react";
import { render, screen } from "@testing-library/react";
import Pokemon from "./";

describe("Pokemon", () => {
    it("should render whithout crash", async () => {
        render(<Pokemon />);
    });

    it("should loader is visible while is loading", async () => {
        const { getByTestId } = render(<Pokemon />);

        const loader = getByTestId("loader");

        expect(loader).toBeVisible();
    });
});
