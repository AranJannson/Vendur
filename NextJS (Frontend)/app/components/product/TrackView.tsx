"use client";

import { useEffect, useRef } from "react";
import { getSessionID } from "@/app/utils/session/utils";

interface TrackViewProps {
  item_id: string;
}

export default function TrackView({ item_id }: TrackViewProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    if (!item_id) return;

    const sessionID = getSessionID();
    console.log(`Session ID: ${sessionID} | Item ID: ${item_id}`);

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionID, item_id }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => console.log("Tracked view:", data))
      .catch((err) => console.error("Track-view error:", err));
  }, [item_id]);

  return null;
}
