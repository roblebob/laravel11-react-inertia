import {Link} from "@inertiajs/react";

export default function Pagination({links}) {
  return (
    <nav className="text-center mt-4">
      {links.map(link => (
        <Link>
          
        </Link>
      ))}
    </nav>
  )
}
