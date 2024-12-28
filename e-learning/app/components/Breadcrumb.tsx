"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const label = path.charAt(0).toUpperCase() + path.slice(1);

    return {
      href,
      label: path === "staff" ? "Nhân viên" : label,
    };
  });

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href}>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
