import React from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import NewsletterBlock from "../components/contact/NewsletterBlock";

export default function Contact() {
  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      <ContactHero />

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

            {/* Formulaire principal */}
            <ContactForm />

            {/* Colonne droite */}
            <div className="flex flex-col gap-5">
              <ContactInfo />
              <NewsletterBlock />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}