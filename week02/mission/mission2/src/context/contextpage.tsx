import { useState } from "react";
import Navbar from "./navbar";
import Themecontent from "./themecontent";
import { ThemeProvider } from "./themeprovider";

export default function Contextpage() {
  const [counter, setCounter] = useState(0);

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
          <Themecontent counter={counter} />
        </main>
      </div>
    </ThemeProvider>
  );
}
