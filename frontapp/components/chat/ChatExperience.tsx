"use client";

import { useState } from "react";
import { ChatThreadList } from "./ChatThreadList";
import { ChatWindow } from "./ChatWindow";

export function ChatExperience() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  return (
    <div className="grid two">
      <ChatThreadList onSelect={setSelectedRoom} />
      <ChatWindow roomId={selectedRoom} />
    </div>
  );
}
