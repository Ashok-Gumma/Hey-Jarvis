import React, { useEffect, useRef, useState } from "react";

const Chat = ({ profile, todayMood }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);
  const chatEndRef = useRef(null);

  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  const synth = window.speechSynthesis;

  /* 🔽 Auto scroll */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 🎙 Voice input */
  useEffect(() => {
    if (!recognition) return;

    if (voiceMode) {
      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        handleSend(text);
      };
      recognition.start();
    }

    return () => recognition?.stop();
  }, [voiceMode]);

  const generateResponse = (userMessage) => {
    let response = `Hey friend! About "${userMessage}" — `;

    const moodMap = {
      motivated: "Love that energy! Let’s crush it. ",
      tired: "Take it slow today. ",
      happy: "Your vibe is contagious! ",
      stressed: "Breathe. You’ve got this. ",
      focused: "Stay in the zone. ",
      relaxed: "Chill vibes only. ",
      anxious: "One step at a time. ",
      bored: "Let’s make things interesting. ",
    };

    response += moodMap[todayMood] || "";

    if (profile?.hobbies?.length)
      response += `Since you enjoy ${profile.hobbies[0]}, try using that as motivation. `;

    if (profile?.strengths?.includes("Creative"))
      response += "Your creativity will help here. ";

    if (profile?.weaknesses?.includes("Procrastination"))
      response += "Start small — progress beats perfection. ";

    return response;
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text }]);

    const aiText = generateResponse(text);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "ai", text: aiText }]);

      if (voiceMode) {
        const utter = new SpeechSynthesisUtterance(aiText);
        utter.rate = todayMood === "relaxed" ? 0.85 : 1.1;
        synth.speak(utter);
      }
    }, 500);

    setInput("");
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div>
          <h2>Your AI Friend</h2>
          <p>Mood today: {todayMood}</p>
        </div>

        <button
          className={`voice-btn ${voiceMode ? "active" : ""}`}
          onClick={() => setVoiceMode(!voiceMode)}
        >
          🎙 {voiceMode ? "Voice ON" : "Voice OFF"}
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.type === "user" ? "user" : "ai"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type or speak..."
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
