import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faWallet,
  faLightbulb,
  faHandshake,
  faBullseye,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [hover, setHover] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: '/', icon: faHome, label:  t('Home') },
    { to: '/budgeting', icon: faWallet, label: t('Budgeting') },
    { to: '/planning', icon: faLightbulb, label: t('Planning & Suggestions') },
    { to: '/goals', icon: faBullseye, label: t('Goals') },
    { to: '/inclusion', icon: faHandshake, label: t('Financial Inclusion') },
//     { to: '/profile', icon: faUser, label: t('Personal information') },
//     { to: '/contact', icon: faEnvelope, label: t('Contact Us') },
  ];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen transition-all duration-300 overflow-hidden transition-all duration-300 h-full overflow-hidden"
      style={{ width: hover ? '280px' : '60px' }}
    >
      <div className="p-6 flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-blue-100 dark:bg-blue-600 font-semibold' : ''
              }`
            }
          >
            <FontAwesomeIcon icon={link.icon} />
            {hover && <span className="whitespace-nowrap truncate">{link.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;