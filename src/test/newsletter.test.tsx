/**
 * Tests du formulaire newsletter CommunityCTA.
 * Verifie la validation, l'appel API et les etats de succes/erreur.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommunityCTA from "../components/community/CommunityCTA";
import * as api from "../api/communication";

vi.mock("../api/communication", () => ({
  postNewsletter: vi.fn(),
}));

describe("CommunityCTA — formulaire newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("rend le formulaire avec champ email et bouton", () => {
    render(<CommunityCTA />);
    expect(screen.getByLabelText(/adresse email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it("affiche le message de succes apres inscription", async () => {
    vi.mocked(api.postNewsletter).mockResolvedValueOnce({} as any);
    const user = userEvent.setup();
    render(<CommunityCTA />);
    await user.type(screen.getByLabelText(/adresse email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /s'inscrire/i }));
    await waitFor(() =>
      expect(screen.getByText(/bienvenue dans la communaute/i)).toBeInTheDocument()
    );
    expect(localStorage.getItem("ndiarama_newsletter")).toBe("true");
  });

  it("affiche une erreur si l'API echoue", async () => {
    vi.mocked(api.postNewsletter).mockRejectedValueOnce(new Error("Network error"));
    const user = userEvent.setup();
    render(<CommunityCTA />);
    await user.type(screen.getByLabelText(/adresse email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /s'inscrire/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("le bouton est desactive si le champ email est vide", () => {
    render(<CommunityCTA />);
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeDisabled();
  });
});
