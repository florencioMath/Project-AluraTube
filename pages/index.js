import React from "react";
import { CSSReset } from "../src/components/CSSReset";
import config from "../config.json";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import Timeline, { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline
          playlists={config.playlists}
          favorites={config.favorites}
          searchValue={valorDoFiltro}
        >
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;
