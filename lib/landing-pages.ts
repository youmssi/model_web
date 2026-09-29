import type { Locale } from "@/lib/i18n/config"

const pages = {
  en: {
    compare: {
      eyebrow: "A practical comparison",
      title: "Compare the working conditions, not the slogans.",
      intro: "Every engagement is shaped by its contract and people. Use these questions to compare an offshore provider, a direct cross-border team, and an engagement organized around MRVIN100 principles.",
      caveat: "This is a decision aid, not a scorecard. It describes questions and intended principles; it does not claim that every provider or adopter works the same way.",
      factor: "Decision factor",
      approaches: ["Offshore provider", "Direct cross-border team", "MRVIN100 principles"],
      rows: [
        { label: "Price and value flow", values: ["Ask for scope, line items, exclusions and who is paid.", "Agree rates, responsibilities and payment terms directly.", "Make the assumptions and planned allocation visible; use local benchmarks."] },
        { label: "Country context", values: ["Check who understands the market, users, language and legal setting.", "Confirm the team has the local context the work requires.", "Adapt country guidance to local evidence, law, currency and working conditions."] },
        { label: "Delivery responsibility", values: ["Name the accountable owner, decision process and escalation path.", "Agree who owns planning, review, communication and handover.", "Publish clear expectations and a fair way to address problems."] },
        { label: "Capability growth", values: ["Ask how knowledge transfer and continuity are handled.", "Agree whether mentorship and local knowledge sharing are part of the work.", "Plan supported mentorship so delivery can grow more engineers over time."] },
        { label: "Evidence and recourse", values: ["Review references, contract terms, jurisdiction and remedies.", "Document ownership, privacy, payment, jurisdiction and dispute handling.", "Publish country-specific rules, sources, changes and an open feedback route."] }
      ]
    },
    adoption: {
      eyebrow: "Adopt and adapt",
      title: "A shared framework, rooted in each country.",
      intro: "MRVIN100 is an open model for organizing African engineering talent. Companies, agencies, public institutions and developer communities can use the shared principles and shape country guidance with local evidence.",
      status: "The framework is being developed. There is no public certification or verified-adopter directory yet, and using its name does not currently imply an independent review.",
      stepsTitle: "A responsible path to adoption",
      steps: [
        { title: "Start with a country", text: "Use a two-letter country identifier, such as CM for Cameroon, and define the jurisdiction and region relevant to the work." },
        { title: "Bring local evidence", text: "Document salary ranges, currency, labor rules, tax and procurement conditions with a source, date and scope for each input." },
        { title: "Make the engagement legible", text: "Show the client budget, engineer compensation, delivery and support costs, and any remaining assumptions." },
        { title: "Grow capability deliberately", text: "Pair experienced engineers with early-career talent when workload, time and support make the mentorship real." },
        { title: "Publish and improve", text: "Record local adaptations, feedback, limitations and failures so others can review and improve the framework." }
      ],
      rolesTitle: "Many actors can contribute",
      adaptationTitle: "A country annex connects the shared rules to local realities.",
      adaptationText: "Each country profile needs practical inputs gathered locally and published with a source, date and scope. Regional views can then compare countries without treating their conditions as identical.",
      dimensions: ["Country & region", "Currency & pay", "Law & contracts", "Source & date"],
      actors: [
        { title: "Companies", text: "Bring real engineering needs, clear scopes and fair contract conditions." },
        { title: "Agencies", text: "Show their delivery method and pricing assumptions openly, and support local capability." },
        { title: "Public institutions", text: "Help align guidance with national policy, procurement and labor realities." },
        { title: "Developer networks", text: "Review the standards, share local evidence and identify gaps." },
        { title: "Engineers", text: "Contribute practical feedback on pay, quality, mentorship and working conditions." },
        { title: "Country stewards", text: "Coordinate a transparent country annex and keep sources and revisions current." }
      ],
      economicsTitle: "Pricing should be inspectable",
      economicsText: "A public playground can help actors enter proposed rates, pay ranges and support costs, then see how assumptions change the outcome. It must distinguish an estimate from a negotiated contract and must not present one continent-wide price or fixed split as fair for every country.",
      cta: "Share country evidence"
    },
    contact: {
      eyebrow: "Contact MRVIN100",
      title: "Start with the question you need answered.",
      intro: "Talk to us about adopting the framework, contributing local evidence, reviewing a country profile or working with African engineering talent.",
      seoTitle: "Contact · African Engineering Framework",
      seoDescription: "Contact MRVIN100 to discuss the African engineering framework, country profiles, local evidence or fair cross-border collaboration.",
      emailLabel: "Email",
      nextTitle: "What happens next",
      nextText: "Include your country or region, your role and the question you are exploring. That context helps us direct your message to the right people.",
      action: "Write to MRVIN100",
      subject: "MRVIN100 framework inquiry"
    },
    country: {
      overview: "Africa overview",
      eyebrow: "Country profile",
      status: "Evidence profile in preparation",
      description: "This page identifies the country and shows the evidence areas needed to build a useful, locally grounded profile. Country-level figures will appear only when sources and dates are published.",
      codeLabel: "ISO country code",
      regionLabel: "African region",
      workstreamsTitle: "Evidence needed for this profile",
      cta: "Contribute local evidence",
      workstreams: ["Engineering workforce and skills", "Comparable compensation by role and experience", "Employer demand and project needs", "Digital-sector value and value enabled in other sectors", "Currency, labor law and operating conditions"],
      note: "A mapped boundary indicates geographic coverage only. It does not mean MRVIN100 has validated market data or local adoption in this country."
    }
  },
  fr: {
    compare: {
      eyebrow: "Comparer en pratique",
      title: "Comparer les conditions de travail, pas les slogans.",
      intro: "Chaque collaboration dépend de son contrat et des personnes concernées. Utilisez ces questions pour comparer un prestataire offshore, une équipe transfrontalière directe et une collaboration organisée selon les principes MRVIN100.",
      caveat: "C’est une aide à la décision, pas un classement. Elle présente des questions et des principes visés ; elle ne prétend pas que tous les prestataires ou adoptants fonctionnent de la même façon.",
      factor: "Critère de décision",
      approaches: ["Prestataire offshore", "Équipe transfrontalière directe", "Principes MRVIN100"],
      rows: [
        { label: "Prix et circulation de la valeur", values: ["Demandez le périmètre, les postes de coûts, les exclusions et les bénéficiaires.", "Convenez directement des tarifs, responsabilités et modalités de paiement.", "Rendez visibles les hypothèses et la répartition prévue ; utilisez des repères locaux."] },
        { label: "Contexte national", values: ["Vérifiez qui connaît le marché, les utilisateurs, la langue et le cadre juridique.", "Confirmez que l’équipe possède le contexte local nécessaire au travail.", "Adaptez les orientations aux preuves, lois, monnaies et conditions locales."] },
        { label: "Responsabilité de livraison", values: ["Identifiez le responsable, le processus de décision et la voie d’escalade.", "Convenez de la planification, des revues, de la communication et du transfert.", "Publiez des attentes claires et une façon équitable de résoudre les difficultés."] },
        { label: "Développement des compétences", values: ["Demandez comment sont organisés le transfert de connaissances et la continuité.", "Précisez si le mentorat et le partage des savoirs locaux font partie du travail.", "Prévoyez un mentorat soutenu pour développer les compétences dans la durée."] },
        { label: "Preuves et recours", values: ["Examinez les références, le contrat, la juridiction et les recours.", "Documentez la propriété, la confidentialité, le paiement, la juridiction et les litiges.", "Publiez les règles locales, sources, changements et voies de retour ouvertes."] }
      ]
    },
    adoption: {
      eyebrow: "Adopter et adapter",
      title: "Un cadre commun, ancré dans chaque pays.",
      intro: "MRVIN100 est un modèle ouvert pour organiser les talents d’ingénierie africains. Entreprises, agences, institutions publiques et communautés de développeurs peuvent appliquer les principes communs et façonner des orientations nationales à partir de preuves locales.",
      status: "Le cadre est en cours d’élaboration. Il n’existe pas encore de certification publique ni d’annuaire d’adoptants vérifiés ; l’usage du nom n’implique pas actuellement de contrôle indépendant.",
      stepsTitle: "Une démarche d’adoption responsable",
      steps: [
        { title: "Commencer par un pays", text: "Utilisez un identifiant pays à deux lettres, par exemple CM pour le Cameroun, et précisez la juridiction et la région concernées." },
        { title: "Apporter des preuves locales", text: "Documentez les salaires, la monnaie, le droit du travail, la fiscalité et les règles d’achat avec une source, une date et un périmètre." },
        { title: "Rendre la collaboration lisible", text: "Présentez le budget client, la rémunération des ingénieurs, les coûts de livraison et de soutien, ainsi que les hypothèses restantes." },
        { title: "Développer les compétences avec méthode", text: "Associez des ingénieurs expérimentés et débutants lorsque la charge, le temps et le soutien rendent le mentorat concret." },
        { title: "Publier et améliorer", text: "Consignez les adaptations locales, retours, limites et échecs pour permettre l’examen et l’amélioration du cadre." }
      ],
      rolesTitle: "La contribution de plusieurs acteurs",
      adaptationTitle: "Une annexe nationale relie les règles communes aux réalités locales.",
      adaptationText: "Chaque profil pays exige des informations pratiques recueillies localement et publiées avec leur source, leur date et leur périmètre. Les vues régionales peuvent ensuite comparer les pays sans supposer que leurs conditions sont identiques.",
      dimensions: ["Pays et région", "Monnaie et salaires", "Droit et contrats", "Source et date"],
      actors: [
        { title: "Entreprises", text: "Apportent des besoins d’ingénierie concrets, des périmètres clairs et des conditions équitables." },
        { title: "Agences", text: "Présentent leur méthode de livraison et leurs hypothèses de prix, et soutiennent les capacités locales." },
        { title: "Institutions publiques", text: "Contribuent à l’alignement avec les politiques nationales, les achats publics et le droit du travail." },
        { title: "Réseaux de développeurs", text: "Examinent les standards, partagent les preuves locales et repèrent les manques." },
        { title: "Ingénieurs", text: "Apportent un retour pratique sur les rémunérations, la qualité, le mentorat et les conditions de travail." },
        { title: "Référents pays", text: "Coordonnent une annexe nationale transparente et maintiennent les sources et révisions à jour." }
      ],
      economicsTitle: "Les prix doivent pouvoir être examinés",
      economicsText: "Un espace public de simulation peut permettre aux acteurs de saisir des tarifs, fourchettes salariales et coûts de soutien, puis d’observer l’effet des hypothèses. Il doit distinguer une estimation d’un contrat négocié et ne pas présenter un prix continental unique ou une répartition fixe comme équitable pour tous les pays.",
      cta: "Partager des données nationales"
    },
    contact: {
      eyebrow: "Contacter MRVIN100",
      title: "Commençons par votre question.",
      intro: "Échangez avec nous sur l’adoption du cadre, le partage de preuves locales, l’examen d’un profil pays ou la collaboration avec des talents d’ingénierie africains.",
      seoTitle: "Contacter · Cadre d’ingénierie africain",
      seoDescription: "Contactez MRVIN100 pour discuter du cadre d’ingénierie africain, des profils pays, des sources locales ou d’une collaboration équitable.",
      emailLabel: "E-mail",
      nextTitle: "La suite de l’échange",
      nextText: "Indiquez votre pays ou région, votre rôle et votre question. Ces éléments nous aideront à orienter votre message vers les bonnes personnes.",
      action: "Écrire à MRVIN100",
      subject: "Question sur le cadre MRVIN100"
    },
    country: {
      overview: "Vue d’ensemble de l’Afrique",
      eyebrow: "Profil pays",
      status: "Profil de preuves en préparation",
      description: "Cette page identifie le pays et présente les données nécessaires à un profil utile, ancré localement. Les chiffres nationaux seront publiés uniquement avec leurs sources et leurs dates.",
      codeLabel: "Code pays ISO",
      regionLabel: "Région africaine",
      workstreamsTitle: "Données nécessaires pour ce profil",
      cta: "Contribuer aux données locales",
      workstreams: ["Effectifs et compétences en ingénierie", "Rémunérations comparables par métier et expérience", "Demande des employeurs et besoins de projets", "Valeur du secteur numérique et valeur rendue possible dans les autres secteurs", "Monnaie, droit du travail et conditions opérationnelles"],
      note: "Une frontière affichée indique seulement une couverture géographique. Elle ne signifie pas que MRVIN100 a validé les données du marché ou l’adoption locale dans ce pays."
    }
  }
} as const

export function getLandingPages(locale: Locale) {
  return pages[locale]
}
