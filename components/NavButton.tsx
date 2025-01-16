interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export const NavButton = ({ href, children }: NavButtonProps) => (
  <a href={href} className="nav-button">
    {children}
  </a>
);
