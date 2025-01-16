interface NavButtonProps {
  setCurrentPage: (page: "home" | "blog" | "guestbook") => void;
  goal: string;
  children: React.ReactNode;
}

export const NavButton = ({
  setCurrentPage,
  goal,
  children,
}: NavButtonProps) => (
  <button
    onClick={() => setCurrentPage(goal as "home" | "blog" | "guestbook")}
    className="nav-button"
  >
    {children}
  </button>
);
