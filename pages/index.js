import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import Timeline, { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
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
        <Menu />
        <Header />
        <Timeline playlists={config.playlists} favorites={config.favorites}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;
