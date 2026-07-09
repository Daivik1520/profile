"use client";

import NavMenu from "@/components/NavMenu";
import EmailFab from "@/components/EmailFab";
import PageTransition from "@/components/PageTransition";



interface ListItem {
  title: string;
  genre: string;
  year: string;
  linkLabel: string;
  link: string;
}

interface ListCategory {
  id: string;
  title: string;
  items: ListItem[];
}

// TODO: keep adding entries — this is meant to grow over time.
const categories: ListCategory[] = [
  {
    id: "films",
    title: "Films",
    items: [
      {
        title: "Dhurandhar",
        genre: "Action",
        year: "2025",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=dhurandhar+trailer",
      },
      {
        title: "Oppenheimer",
        genre: "Drama",
        year: "2023",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/watch?v=uYPbbksJxIg",
      },
      {
        title: "KGF",
        genre: "Action",
        year: "2018",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=kgf+chapter+1+trailer",
      },
      {
        title: "Your Name",
        genre: "Anime",
        year: "2016",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=your+name+kimi+no+na+wa+trailer",
      },
      {
        title: "Baahubali",
        genre: "Epic",
        year: "2015",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=baahubali+the+beginning+trailer",
      },
      {
        title: "Interstellar",
        genre: "Sci-Fi",
        year: "2014",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      },
      {
        title: "The Avengers",
        genre: "Superhero",
        year: "2012",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=the+avengers+2012+trailer",
      },
      {
        title: "Inception",
        genre: "Sci-Fi",
        year: "2010",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=inception+trailer",
      },
      {
        title: "The Social Network",
        genre: "Drama",
        year: "2010",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=the+social+network+trailer",
      },
      {
        title: "3 Idiots",
        genre: "Comedy",
        year: "2009",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=3+idiots+trailer",
      },
      {
        title: "American Psycho",
        genre: "Thriller",
        year: "2000",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=american+psycho+trailer",
      },
      {
        title: "Fight Club",
        genre: "Thriller",
        year: "1999",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=fight+club+trailer",
      },
      {
        title: "The Godfather",
        genre: "Crime",
        year: "1972",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=the+godfather+trailer",
      },
    ],
  },
  {
    id: "tv-series",
    title: "TV Series",
    items: [
      {
        title: "Demon Slayer",
        genre: "Anime",
        year: "2019",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/results?search_query=demon+slayer+trailer",
      },
      {
        title: "Mr. Robot",
        genre: "Thriller",
        year: "2015",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/watch?v=xIBiJ_SzJTA",
      },
      {
        title: "Black Mirror",
        genre: "Sci-Fi",
        year: "2011",
        linkLabel: "Trailer",
        link: "https://www.youtube.com/watch?v=jDiYGjp5iFg",
      },
    ],
  },
];

export default function ListPage() {
  return (
    <PageTransition>
    <div className="list-page">
      <NavMenu />
      <main>
        <div className="list-grid">
          <aside className="list-side">
            <div>
              <h1 className="list-title">List</h1>
              <p className="list-intro">
                A running list of the things I keep coming back to — films,
                series, and whatever else earns a spot. If you ever need a
                recommendation, start here. Updated often.
              </p>
            </div>
            <nav className="list-cats">
              {categories.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className="list-cat-link">
                  {cat.title}
                </a>
              ))}
            </nav>
          </aside>

          <div>
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="list-section">
                <div className="list-section-rule" />
                <h2 className="list-section-title">{cat.title}</h2>
                {cat.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="list-row"
                  >
                    <span className="list-row-title">{item.title}</span>
                    <span className="list-row-meta">{item.genre}</span>
                    <span className="list-row-meta year">{item.year}</span>
                    <span className="list-row-link">{item.linkLabel} ↗</span>
                  </a>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <EmailFab />
    </div>
    </PageTransition>
  );
}
