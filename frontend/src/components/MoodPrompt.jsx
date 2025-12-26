import React from "react";

const moods = [
  { label: "Motivated 💪", value: "motivated", className: "mood-red" },
  { label: "Tired 😴", value: "tired", className: "mood-gray" },
  { label: "Happy 😊", value: "happy", className: "mood-yellow" },
  { label: "Stressed 😰", value: "stressed", className: "mood-pink" },
  { label: "Focused 🎯", value: "focused", className: "mood-indigo" },
  { label: "Relaxed 😌", value: "relaxed", className: "mood-green" },
  { label: "Anxious 😟", value: "anxious", className: "mood-purple" },
  { label: "Bored 🥱", value: "bored", className: "mood-blue" },
];

const MoodPrompt = ({ onMoodSelect }) => {
  return (
    <div className="mood-overlay">
      <div className="mood-modal">
        <h2 className="mood-title">Hey friend! 👋</h2>
        <p className="mood-subtitle">How are you feeling today?</p>

        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => onMoodSelect(mood.value)}
              className={`mood-btn ${mood.className}`}
            >
              {mood.label}
            </button>
          ))}
        </div>

        <p className="mood-helper">
          You can change this anytime later
        </p>
      </div>
    </div>
  );
};

export default MoodPrompt;
