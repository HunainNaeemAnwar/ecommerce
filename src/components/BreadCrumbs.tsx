"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.slice(0, 3).map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    return { href, label };
  });

  return (
    <div className="Breadcrumb relative top-[160px] left-[40px] md:flex  hidden font-SatoshiBold lg:text-[18px] text-[16px]">
      <ol className="breadcrumb  flex  justify-center item-center ">
        {pathname === "/" ? null : (
          <li>
            <Link
              href="/"
              className="ml-[4px] hover:text-gray-500 hover:cursor-pointer hover:underline"
            >
              Home
            </Link>
          </li>
        )}
        {pathname === "/" ? null : <span className="ml-[3px]">{"/"}</span>}

        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="">
            <div className="flex gap-1 items-center">
              {index > 0 && <span className="ml-[3px]">{"/"}</span>}
              {/* Add separator for all crumbs except the first */}
              {index === breadcrumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="ml-[4px] hover:text-gray-500 hover:cursor-pointer hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumbs;
