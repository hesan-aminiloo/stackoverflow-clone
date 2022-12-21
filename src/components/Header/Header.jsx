import React, { useState, useEffect } from 'react';

// Components
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MenuItem from './MenuItem';

// Hooks
import useDebounce from '../../hooks/useDebounce';

// i18n

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/search?query=${debouncedSearchTerm}`);
      return
    }

    if (!debouncedSearchTerm && location.pathname.includes('/search')) return navigate('/');

    if (location.pathname.includes('/search') && debouncedSearchTerm) {
      setSearchParams({ query: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, location.pathname, navigate, setSearchParams])
  

  return (
    <div className='flex justify-between items-center p-4 bg-gray-100 border-b mb-2'>
      <div className='flex flex-1'>
        <ul className="flex items-center justify-start mr-8">
          <MenuItem>
            <Link to="/">
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/questions">
              Questions
            </Link>
          </MenuItem>
        </ul>

        <div className='w-full'>
          <input
            type="search"
            placeholder='Search for questions'
            className='py-2 px-4 text-sm w-[500px] bg-white rounded'
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />
        </div>
      </div>

      <Link to="/profile">
        <div className="flex items-center justify-end cursor-pointer">
          <img src="https://avatars.githubusercontent.com/u/18223047?v=4" alt="Hesan Aminiloo" className="rounded-full mr-2 w-8 h-8 border border-gray-300" />
          <span className="text-sm">
            Hesan Aminiloo
          </span>
        </div>
      </Link>
    </div>
  )
};

export default Header;