"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@stackframe/stack";

interface TrackViewProps {
  item_id: number;
}

export default function TrackView({ item_id }: TrackViewProps) {
  const hasTracked = useRef(false);
  const user = useUser();
  const user_id = user?.id;

  useEffect(() => {
    if (!user_id || !item_id || hasTracked.current) return;
    hasTracked.current = true;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, item_id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Tracking failed");
        return res.json();
      })
      .then((data) => {
        console.log("Tracked view successfully:", data);
      })
      .catch((err) => {
        console.error("TrackView error:", err);
      });
  }, [user_id, item_id]);

  return null;
}
