import { createClient } from "@supabase/supabase-js";
import { geraTimeline } from "../../../pages";

const PROJECT_URL = "https://nwvjeubzjdrznkhhttpv.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dmpldWJ6amRyem5raGh0dHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzQ3MTIsImV4cCI6MTk4Mzc1MDcxMn0.c5vZW1iqDrwBfyyTob3xUNVEUDKl0KO6kYqTi7wvntg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService({ playlists, setPlaylists }) {
  return {
    getAllVideos() {
      return supabase.from("playlistVideos").select("*");
    },
    refresh() {
      supabase
        .channel("*")
        .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
          geraTimeline(this, setPlaylists);
        })
        .subscribe();
    },
  };
}
