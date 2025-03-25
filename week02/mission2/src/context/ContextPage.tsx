import { useState } from "react";
import Navbar from "./Navbar";
import ThemeContent from "./themecontent";
import { ThemeProvider } from "./ThemeProvider";

export default function Contextpage() {
  const [counter] = useState(0);

  return (
    <ThemeProvider>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Navbar />
        <main className='flex-1 w-full'>
          <ThemeContent counter={counter} />
        </main>
      </div>
    </ThemeProvider>
  );
}