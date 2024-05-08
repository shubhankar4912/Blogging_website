import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Landing() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <div className="text-2xl font-bold">Medium</div>
        <Link
          to="/signup"
          className="transition ease-in-out delay-150 hover:scale-110 duration-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Sign Up
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="transition ease-in-out delay-150 hover:scale-110 text-black text-4xl mb-8">
          <TypingEffect text="Write your Blog" />
        </div>
      </div>
    </div>
  );
}

function TypingEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        if (currentIndex === text.length) {
          clearInterval(interval);
          return prevText;
        } else {
          currentIndex++;
          return text.slice(0, currentIndex);
        }
      });
    }, 100); // Adjust typing speed as needed

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

export default Landing;
