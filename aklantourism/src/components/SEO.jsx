import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, url }) {
  const defaultTitle = "Aklan Tourism — Discover the Wonders of Aklan";
  const defaultDescription = "Discover the wonders of Aklan! Explore world-class beaches, vibrant festivals, and breathtaking nature. Aklan Tourism website created by Gregor Allen Mondragon.";
  const defaultKeywords = "Aklan Tourism, Wonders of Aklan, Discover the wonders of aklan, Gregor Allen Mondragon, Boracay, Jawili Falls, Bakhawan Eco-Park, Ati-Atihan Festival, Kalibo, Malay, Buruanga, Nabas, Tangalan, Makato, Numancia, Lezo, Malinao, Madalag, Libacao, Balete, Batan, Altavas, New Washington";
  const siteUrl = "https://aklan-tourism.vercel.app";

  return (
    <Helmet>
      <title>{title ? `${title} | Aklan Tourism` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      <meta name="author" content="Gregor Allen Mondragon" />
      
      {/* Canonical Link */}
      <link rel="canonical" href={`${siteUrl}${url || '/'}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${url || '/'}`} />
      <meta property="og:title" content={title ? `${title} | Aklan Tourism` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${siteUrl}${url || '/'}`} />
      <meta name="twitter:title" content={title ? `${title} | Aklan Tourism` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
}
