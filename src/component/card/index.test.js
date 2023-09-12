import React from "react";
import { render, screen } from "@testing-library/react";
import Cards from "./";

describe("Cards", () => {
    test("should render whithout crash", async () => {
        render(<Cards />);
    });

    test("Loader est affiché pendant le chargement", async () => {
        render(<Cards />);

        const loader = screen.getByTestId("loader");

        expect(loader).toBeVisible();
    });
});
