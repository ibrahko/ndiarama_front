// src/components/NewsletterPopup.tsx

import { useState, useEffect } from "react";
import { X, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { subscribeNewsletter } from "../api/communication";

interface NewsletterPopupProps {
    forceOpen?: boolean;
    onClose?: () => void;
  }

const NewsletterPopup = ({ forceOpen = false, onClose }: NewsletterPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ouverture forcée via bouton footer
    if (forceOpen) {
      setIsVisible(true);
      return;
    }
  
    // Ouverture automatique après 5s
    const alreadySubscribed = localStorage.getItem("ndiarama_newsletter");
    if (alreadySubscribed) return;
  
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [forceOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setSubmitted(false);
    setError(null);
    setEmail("");
    setWhatsapp("");
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await subscribeNewsletter({ email, whatsapp });

      if (res.success) {
        setSubmitted(true);
        // Mémoriser pour ne plus afficher le popup
        localStorage.setItem("ndiarama_newsletter", "true");
        // Fermer automatiquement après 4 secondes
        setTimeout(() => setIsVisible(false), 4000);
      } else {
        setError(res.message || "Une erreur est survenue. Réessayez.");
      }
    } catch {
      setError("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setLoading(false);
    }
  };

  // Ne rien rendre si pas visible
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div
          className="
            relative bg-white rounded-2xl shadow-2xl
            w-full max-w-md pointer-events-auto
            animate-[fadeInUp_0.4s_ease-out]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bande colorée en haut */}
          <div className="bg-yellow-400 rounded-t-2xl h-2" />

          <div className="p-8">
            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700
                         transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            {/* ===== ÉTAT : Succès ===== */}
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle
                  size={56}
                  className="text-green-500 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Bienvenue !
                </h2>
                <p className="text-gray-500 text-sm">
                  Vous êtes maintenant abonné(e) à la newsletter NDIARAMA.
                  <br />
                  Vous recevrez nos prochaines actualités.
                </p>
              </div>
            ) : (
              /* ===== ÉTAT : Formulaire ===== */
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📡</div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Rejoignez la communauté
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    Actualités, podcasts et analyses — directement
                    dans votre boîte mail.
                  </p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="
                          w-full pl-9 pr-4 py-2.5 text-sm
                          border border-gray-300 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-yellow-400
                          focus:border-transparent transition
                        "
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      WhatsApp{" "}
                      <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <MessageCircle
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+223 XX XX XX XX"
                        className="
                          w-full pl-9 pr-4 py-2.5 text-sm
                          border border-gray-300 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-yellow-400
                          focus:border-transparent transition
                        "
                      />
                    </div>
                  </div>

                  {/* Message d'erreur */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full bg-yellow-400 hover:bg-yellow-500
                      text-black font-semibold py-3 rounded-lg
                      transition-colors duration-200
                      disabled:opacity-60 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                    "
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Inscription en cours...
                      </>
                    ) : (
                      "Je m'abonne gratuitement"
                    )}
                  </button>
                </form>

                {/* Note de confidentialité */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  Pas de spam. Désinscription possible à tout moment.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;