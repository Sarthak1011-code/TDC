import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className = '' }: NavLinkProps) {
  // Check if the href is a hash link
  const isHashLink = href.startsWith('#');
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const baseClasses = "text-gray-600 hover:text-gray-900 transition-colors duration-200";
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return isHashLink ? (
    <a href={href} className={combinedClasses} onClick={handleClick}>
      {children}
    </a>
  ) : (
    <Link to={href} className={combinedClasses}>
      {children}
    </Link>
  );
}