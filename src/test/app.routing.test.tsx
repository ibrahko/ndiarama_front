/**
 * Tests du routing hash de App.tsx.
 * Verifie que chaque route hash affiche la bonne page.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock des pages lourdes pour les tests unitaires
vi.mock("../pages/Home",         () => ({ default: () => <div>PAGE_HOME</div> }));
vi.mock("../pages/Media",        () => ({ default: () => <div>PAGE_MEDIA</div> }));
vi.mock("../pages/Services",     () => ({ default: () => <div>PAGE_SERVICES</div> }));
vi.mock("../pages/Community",    () => ({ default: () => <div>PAGE_COMMUNITY</div> }));
vi.mock("../pages/Contact",      () => ({ default: () => <div>PAGE_CONTACT</div> }));
vi.mock("../pages/LegalNotices", () => ({ default: () => <div>PAGE_LEGAL</div> }));
vi.mock("../components/NewsletterPopup", () => ({ default: () => null }));

describe("App routing", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("affiche Home par defaut (hash vide)", () => {
    render(<App />);
    expect(screen.getByText("PAGE_HOME")).toBeInTheDocument();
  });

  it("affiche Media quand hash = #media", () => {
    window.location.hash = "media";
    render(<App />);
    expect(screen.getByText("PAGE_MEDIA")).toBeInTheDocument();
  });

  it("affiche Contact quand hash = #contact", () => {
    window.location.hash = "contact";
    render(<App />);
    expect(screen.getByText("PAGE_CONTACT")).toBeInTheDocument();
  });

  it("fallback sur Home pour un hash inconnu", () => {
    window.location.hash = "unknown-route-xyz";
    render(<App />);
    expect(screen.getByText("PAGE_HOME")).toBeInTheDocument();
  });
});
