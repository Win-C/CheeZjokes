import { useState, useEffect } from "react";

/** Store object in local storage 
 * 
 *  Takes in a key for object saved in LocalStorage that's a string
 *  Returns item from localStorage and function to save to localStorage
*/

function useLocalStorage(key, defaultValue){
  // Get initial item from local storage
  const initialItem = JSON.parse(localStorage.getItem(key)) || defaultValue;
  const [ item, setItem ] = useState(initialItem);

  useEffect(function saveJokesToLocalStorage(){
    localStorage.setItem(key, JSON.stringify(item));
  }, [item, key]);

  return [ item, setItem ]; 
}

export default useLocalStorage;