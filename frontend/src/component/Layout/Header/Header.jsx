import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, navIcons} from './navData';
import logo from './logo.png';
import Search from '../Home/Search';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  // const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks ? `${linksRef.current.scrollHeight}px` : '0px',
  };

  return (
    <nav className='nav'>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
            <Search/>
        <div
          className='links-container'
          style={linkStyles}
        >
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social icons */}
        <ul className='social-icons'>
          {navIcons.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;