/**
 * Tests du composant ContactMap.
 * Verifie que la carte et les elements d'accessibilite sont presents.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactMap from "../contact/ContactMap";

describe("ContactMap", () => {
  it("rend l'iframe OpenStreetMap avec le bon titre", () => {
    render(<ContactMap />);
    const iframe = screen.getByTitle(/localisation ndiarama/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("openstreetmap.org"));
  });

  it("contient le lien Agrandir vers OpenStreetMap", () => {
    render(<ContactMap />);
    const link = screen.getByRole("link", { name: /agrandir/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("affiche la localisation Bamako", () => {
    render(<ContactMap />);
    expect(screen.getByText(/bamako/i)).toBeInTheDocument();
  });
});
