const keyStrokesSound = [
  new Audio("../public/sounds/keystroke1.mp3"),
  new Audio("../public/sounds/keystroke2.mp3"),
  new Audio("../public/sounds/keystroke3.mp3"),
  new Audio("../public/sounds/keystroke4.mp3"),
];

export default function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound =
      keyStrokesSound[Math.floor(Math.random() * keyStrokesSound.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch((err) => console.log("Error occured", err));
  };
  return { playRandomKeyStrokeSound };
}
