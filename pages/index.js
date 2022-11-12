import React from "react";
import { CSSReset } from "../src/components/CSSReset";
import config from "../config.json";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import Timeline from "../src/components/Timeline";
import { videoService } from "../src/components/services/videoService";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://nwvjeubzjdrznkhhttpv.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dmpldWJ6amRyem5raGh0dHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzQ3MTIsImV4cCI6MTk4Mzc1MDcxMn0.c5vZW1iqDrwBfyyTob3xUNVEUDKl0KO6kYqTi7wvntg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});
  const service = videoService({ playlists, setPlaylists });

  React.useEffect(() => {
    geraTimeline(service, setPlaylists);
    service.refresh();
  }, []);

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
          searchValue={valorDoFiltro}
          favorites={config.favorites}
          playlists={{ ...playlists, ...config.playlists }}
        ></Timeline>
      </div>
    </>
  );
}

export default HomePage;

export function geraTimeline(service, setPlaylists) {
  service.getAllVideos().then((dados) => {
    const novasPlaylists = {};
    dados.data?.forEach((video) => {
      if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
      novasPlaylists[video.playlist] = [
        video,
        ...novasPlaylists[video.playlist],
      ];
    });

    setPlaylists(novasPlaylists);
  });
}
