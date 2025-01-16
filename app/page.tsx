import { NavButton } from "@/components/NavButton";
import { Marquee } from "@/components/Marquee";
import { MidiPlayer } from "@/components/MidiPlayer";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-slate-100">
      <div
        className="h-full w-full bg-gradient-to-tr from-fuchsia-500 via-cyan-500 to-fuchsia-500 p-5 shadow-[10px_10px_5px_rgba(0,0,0,0.5)]"
        style={{ border: "8px ridge #ff0000" }}
      >
        <nav className="flex flex-col justify-between items-center">
          <div className="header w-full">
            <h1>Welcome to my awesome cool site!</h1>
          </div>
          <div className="marquee-container w-full mb-4 -mt-3">
            <Marquee scrollamount={10} direction="right">
              🦄 Welcome to my awesome website! Last updated: 01/16/2014 🦄
            </Marquee>
            <Marquee scrollamount={5} direction="left">
              💫 Don&apos;t forget to sign my guestbook! 💫
            </Marquee>
            <Marquee scrollamount={15} behavior="alternate">
              🔥 Best viewed in Netscape Navigator 4.0 at 800x600 🔥
            </Marquee>
          </div>
          <div className="flex gap-8 -ml-52">
            <NavButton href="#">My Blog</NavButton>
            <NavButton href="#">Free iPod!</NavButton>
            <NavButton href="#">Guestbook</NavButton>
            <NavButton href="#">Home</NavButton>
          </div>
        </nav>
        <MidiPlayer />
      </div>
    </div>
  );
}
