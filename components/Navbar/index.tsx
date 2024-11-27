import Link from "next/link";

interface NavbarProps {
  links: { href: string; label: string }[];
}

const Navbar: React.FC<NavbarProps> = ({links}) => {
  return (
    <nav className="flex gap-4 space-between items-center p-4 bg-slate-700"
    >
      <div>
        <h1 className="m-0">GG WP</h1>
      </div>
      <div className="flex gap-4">
        {links.map((link, index) => {
          return (
            <Link
              className="text-white"
              key={index}
              href={link?.href}>{link?.label}</Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;