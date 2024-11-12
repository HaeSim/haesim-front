import { useEffect, useState } from 'react';

/*
  In this hook, we use the  window.matchMedia  method to create a media query object. 
  We then set up an event listener to listen for changes in the media query. When the media query changes, 
  we update the state of the hook. 
  Now, we can use this hook in our components to conditionally render content based on the size of the screen. 
*/
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange(); // Set the initial state

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
