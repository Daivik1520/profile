export default function JsonLd() {
  const siteUrl = "https://daivikreddy.online";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Daivik Reddy",
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/dav-new-pic.jpg`,
      width: 1200,
      height: 630,
    },
    jobTitle: "Creative Developer & AI Enthusiast",
    description:
      "Creative developer and AI enthusiast from Hyderabad, India. Building projects in AI, computer vision, and web development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    email: "mailto:daivik1520@gmail.com",
    telephone: "+917995456600",
    sameAs: [
      "https://github.com/Daivik1520",
      "https://www.linkedin.com/in/daivik-reddy-60a876311/",
      "https://instagram.com/daivik.exe",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Web Development",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "GSAP",
      "Framer Motion",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Jawahar Navodaya Vidyalaya",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Daivik Reddy",
    description:
      "Personal portfolio website of Daivik Reddy — developer & AI enthusiast.",
    publisher: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "List",
        item: `${siteUrl}/list`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
