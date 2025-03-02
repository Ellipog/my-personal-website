import { NavButton } from "@/components/NavButton";
import { Marquee } from "@/components/Marquee";
import { VisitorCounter } from "@/components/VisitorCounter";
import { GuestbookPreview } from "@/components/GuestbookPreview";
import { WebRing } from "@/components/WebRing";
import Image from "next/image";
import { siteUpdates } from "@/data/siteUpdates";

export default function Home({
  setCurrentPage,
}: {
  setCurrentPage: (page: "home" | "blog" | "guestbook") => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className="h-full w-full mb-20 bg-gradient-to-tr from-fuchsia-500 via-cyan-500 to-fuchsia-500 p-5 shadow-[10px_10px_5px_rgba(0,0,0,0.5)]"
        style={{ border: "8px ridge #ff0000" }}
      >
        <nav className="flex flex-col justify-between">
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
          <Image
            src="/gifs/shark_surf.gif"
            alt="Logo"
            width={100}
            height={100}
            className="absolute top-20 right-20 h-52 w-52"
          />
          <div className="flex gap-8 ml-[20%]">
            <NavButton setCurrentPage={setCurrentPage} goal="blog">
              My Blog
            </NavButton>
            <NavButton setCurrentPage={setCurrentPage} goal="free-ipod">
              Free iPod!
            </NavButton>
            <NavButton setCurrentPage={setCurrentPage} goal="guestbook">
              Guestbook
            </NavButton>
            <NavButton setCurrentPage={setCurrentPage} goal="home">
              Home
            </NavButton>
            <NavButton setCurrentPage={setCurrentPage} goal="questions">
              Ask Me!
            </NavButton>
          </div>
          {/* -- UNDER CONSTRUCTION DIV BELOW -- */}
          <div className="under-construction-div">
            <div className="construction-banner">
              <p>🚧 UNDER CONSTRUCTION! 🚧</p>
              <p style={{ fontSize: "16px", marginTop: "5px" }}>
                Please excuse our dust! We&apos;re working hard to make this
                site awesome!
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="w-1/3 flex flex-col items-end">
              <div className="updates-section w-full h-fit">
                <span style={{ color: "#ff00ff" }}>★ Site updates ★</span>
                {siteUpdates.map((update) => (
                  <ul key={update.date}>
                    <li>
                      {update.date}: {update.description}
                    </li>
                  </ul>
                ))}
              </div>
              <VisitorCounter />
              <div className="w-full flex justify-start">
                <WebRing />
              </div>
            </div>
            <div className="w-2/3 gap-5 flex flex-col">
              <div className="welcome-section w-2/3 ml-[10%]">
                <div className="glitter-text">★ Welcome to my site! ★</div>
                <div className="bouncing-text">
                  {"This is my site!".split("").map((char, index) => (
                    <span
                      key={index}
                      style={{ "--letter-index": index } as React.CSSProperties}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
                <div className="flame-text">HOT NEW UPDATES DAILY!!! 🔥</div>
                <p className="sparkle-text">
                  I&apos;m so glad you&apos;re here! 🌟
                </p>
              </div>
              <GuestbookPreview setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
