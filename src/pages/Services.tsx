import React, { useEffect, useState } from "react";
import { fetchServices, Service } from "../api/services";

import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import ServicesCTA from "../components/services/ServicesCTA";
import Seo from "../common/Seo";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(data.filter((s) => s.is_active));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des services");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">
      Chargement…
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-red-600">
      {error}
    </div>
  );

  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      <Seo title="Services & Programmes" description="Consulting, formation, coaching : decouvre comment NDIARAMA accompagne ta carriere et ton leadership." />
      <ServicesHero />
      <ServicesList services={services} />
      <ServicesCTA />
    </main>
  );
}