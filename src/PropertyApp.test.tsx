import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PropertyApp from "./PropertyApp";
import type { Property } from "./model/types";

const mockProperties: Property[] = [
    {
        id: 1,
        image: "https://example.com/image1.jpg",
        title: "Property 1",
        type: "Apartment",
        location: "New York",
        details: "2 beds, 1 bath",
        host: "John Doe",
        price: 150,
        rating: 5,
    },
    {
        id: 2,
        image: "https://example.com/image2.jpg",
        title: "Property 2",
        type: "House",
        location: "San Francisco",
        details: "3 beds, 2 baths",
        host: "Jane Smith",
        price: 250,
        rating: 4,
    },
];

describe("PropertyApp", () => {
    it("should render the heading", () => {
        render(<PropertyApp properties={mockProperties} />);

        expect(screen.getByText("Popular Destinations")).toBeInTheDocument();
    });

    it("should apply correct CSS classes", () => {
        render(<PropertyApp properties={mockProperties} />);

        // Check that the main container has the correct CSS class
        const container = screen.getByText("Popular Destinations").parentElement;
        expect(container).toHaveClass("property-grid-container");

        // Check that the property grid has the correct CSS class
        const propertyGrid = container?.querySelector(".property-grid");
        expect(propertyGrid).toBeInTheDocument();
        expect(propertyGrid).toHaveClass("property-grid");
    });

    it("should render property cards within the grid", () => {
        render(<PropertyApp properties={mockProperties} />);

        // Verify that property cards are rendered
        expect(screen.getByText("Property 1")).toBeInTheDocument();
        expect(screen.getByText("Property 2")).toBeInTheDocument();
    });

    it("should render the correct number of properties", () => {
        render(<PropertyApp properties={mockProperties} />);

        const propertyGrid = screen.getByText("Popular Destinations").parentElement?.querySelector(".property-grid");
        const propertyCards = propertyGrid?.children;

        expect(propertyCards).toHaveLength(mockProperties.length);
    });

    it("should handle empty properties array", () => {
        render(<PropertyApp properties={[]} />);

        // Container and grid should still exist with proper classes
        const container = screen.getByText("Popular Destinations").parentElement;
        expect(container).toHaveClass("property-grid-container");

        const propertyGrid = container?.querySelector(".property-grid");
        expect(propertyGrid).toHaveClass("property-grid");
        expect(propertyGrid?.children).toHaveLength(0);
    });
});