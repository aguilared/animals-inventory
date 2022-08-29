import Link from "next/link";

const links = [
  { href: "/animals/", label: "Admin" },
  { href: "/bitacora", label: "Ganados" },
  { href: "/bitacora/bitacoras", label: "Caballos" },
  { href: "/animals/animalsCard", label: "ListAnimalCard" },
  { href: "/animals/animalsCardOwners", label: "ListAnimalCardQuery" },
  { href: "/animals/animalsCardPaginated", label: "ListAnimalPage" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => (
  <nav className="flex rounded items-center justify-between flex-wrap bg-gray-700 p-2 py-1">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <svg
        className="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
      </svg>
      <span className="font-semibold text-xl tracking-tight">
        Animals Inventory
      </span>
    </div>
    <div className="block sm:hidden">
      <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
      <div className="text-sm sm:flex-grow">
        <Link href="/">
          <a className="block mt-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4">
            Home
          </a>
        </Link>

        {links.map(({ key, href, label }) => (
          <Link key={key} href={href}>
            <a className="block mt-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4">
              {label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  </nav>
);

export default Navigation;
