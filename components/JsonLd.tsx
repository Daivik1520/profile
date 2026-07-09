export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daivik Reddy",
    url: "https://daivikreddy.com",
    image: "https://daivikreddy.com/dav-hero.jpg",
    jobTitle: "Creative Developer & AI Enthusiast",
    description:
      "Creative developer and AI enthusiast from Hyderabad, India. Building projects in AI, computer vision, and web development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    email: "mailto:daivik1520@gmail.com",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
