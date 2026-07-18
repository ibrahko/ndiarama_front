/**
 * Tests du routing de App.tsx (History API).
 * Verifie que chaque chemin d'URL affiche la bonne page.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
    window.history.replaceState({}, "", "/");
  });

  it("affiche Home par defaut (chemin /)", () => {
    render(<App />);
    expect(screen.getByText("PAGE_HOME")).toBeInTheDocument();
  });

  it("affiche Media pour /media", () => {
    window.history.replaceState({}, "", "/media");
    render(<App />);
    expect(screen.getByText("PAGE_MEDIA")).toBeInTheDocument();
  });

  it("affiche Contact pour /contact", () => {
    window.history.replaceState({}, "", "/contact");
    render(<App />);
    expect(screen.getByText("PAGE_CONTACT")).toBeInTheDocument();
  });

  it("fallback sur Home pour un chemin inconnu", () => {
    window.history.replaceState({}, "", "/unknown-route-xyz");
    render(<App />);
    expect(screen.getByText("PAGE_HOME")).toBeInTheDocument();
  });
});
