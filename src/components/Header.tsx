import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import MediBridgeLogo from './MediBridgeLogo';
import { useAuth } from '../contexts/AuthContext';
import { navMenus, type NavChildItem } from '../data/homeContent';

function NavLink({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: React.ReactNode;
}) {
  return href.startsWith('/') ? (
    <Link className={className} to={href}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

function MenuSection({ child }: { child: NavChildItem }) {
  return (
    <div>
      <NavLink
        className="block font-body-md text-body-md font-semibold text-ink-black transition-colors hover:text-primary"
        href={child.href}
      >
        {child.label}
      </NavLink>
      {child.children && (
        <ul className="mt-2 space-y-2">
          {child.children.map((item) => (
            <li key={item.label}>
              <NavLink
                className="font-body-sm text-body-sm text-ink-secondary transition-colors hover:text-primary hover:underline"
                href={item.href}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const activeMenu = navMenus.find((menu) => menu.label === openMenu);
  const withChildren =
    activeMenu?.children?.filter((child) => child.children && child.children.length > 0) ?? [];
  const withoutChildren =
    activeMenu?.children?.filter((child) => !child.children?.length) ?? [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className="relative sticky top-0 z-50 w-full border-b border-hairline bg-secondary dark:bg-secondary"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="flex h-full items-center gap-8">
          <Link className="flex shrink-0 items-center gap-2 font-title text-title font-bold leading-none text-primary-fixed" to="/">
            <MediBridgeLogo className="h-7 w-7 shrink-0" />
            <span className="leading-none">MediBridge</span>
          </Link>
          <nav className="hidden h-full md:flex">
            {navMenus.map((menu) => {
              const hasDropdown = Boolean(menu.children && menu.children.length > 0);
              const className = `flex h-full items-center px-5 font-title text-title transition-colors ${
                openMenu === menu.label ? 'text-primary-fixed' : 'text-white hover:text-primary-fixed'
              }`;

              if (!hasDropdown && menu.href.startsWith('/')) {
                return (
                  <Link
                    key={menu.label}
                    className={className}
                    to={menu.href}
                    onMouseEnter={() => setOpenMenu(null)}
                  >
                    {menu.label}
                  </Link>
                );
              }

              return (
                <a
                  key={menu.label}
                  className={className}
                  href={menu.href}
                  onMouseEnter={() => hasDropdown && setOpenMenu(menu.label)}
                >
                  {menu.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-on-primary">
          {isLoggedIn ? (
            <>
              <button
                className="font-body-sm text-body-sm transition-colors hover:text-primary-fixed"
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
              <Link
                aria-label="My Page"
                className="inline-flex items-center p-2 transition-opacity hover:opacity-80"
                to="/mypage"
              >
                <Icon name="account_circle" filled />
              </Link>
            </>
          ) : (
            <>
              <Link
                className="font-body-sm text-body-sm transition-colors hover:text-primary-fixed"
                to="/login"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>

      {activeMenu && activeMenu.children && activeMenu.children.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 hidden border-t border-hairline bg-canvas-white shadow-lg md:block">
          <div className="mx-auto max-w-container-max px-margin-mobile py-7 md:px-margin-desktop">
            {withChildren.length > 0 ? (
              <div
                className="grid w-full"
                style={{
                  gridTemplateColumns: `repeat(${
                    withChildren.length + (withoutChildren.length > 0 ? 1 : 0)
                  }, minmax(0, 1fr))`,
                }}
              >
                {withChildren.map((child, columnIndex) => (
                  <div
                    key={child.label}
                    className={`px-6 ${
                      columnIndex < withChildren.length - 1 || withoutChildren.length > 0
                        ? 'border-r border-hairline'
                        : ''
                    }`}
                  >
                    <MenuSection child={child} />
                  </div>
                ))}
                {withoutChildren.length > 0 && (
                  <div className="px-6">
                    <div className="space-y-5">
                      {withoutChildren.map((leaf) => (
                        <MenuSection key={leaf.label} child={leaf} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="grid w-full"
                style={{
                  gridTemplateColumns: `repeat(${withoutChildren.length}, minmax(0, 1fr))`,
                }}
              >
                {withoutChildren.map((leaf, columnIndex) => (
                  <div
                    key={leaf.label}
                    className={`px-6 ${
                      columnIndex < withoutChildren.length - 1 ? 'border-r border-hairline' : ''
                    }`}
                  >
                    <MenuSection child={leaf} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
