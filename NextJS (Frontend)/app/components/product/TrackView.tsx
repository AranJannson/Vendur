"use client";
import { useEffect } from "react";
import { getSessionID } from "@/app/utils/session/utils";

export default function TrackView(item_id: string) {
  useEffect(() => {
    const sessionID = getSessionID();
    console.log(`Session ID: ${sessionID}\nItem ID: ${typeof(item_id)}`);
    if (!item_id) return;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionID, item_id: item_id.item_id }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Tracked view:", data))
      .catch((err) => console.error("Track-view error:", err));
  }, []);

  return null;
}