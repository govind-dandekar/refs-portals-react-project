import { useState, useRef } from 'react';

export default function Player() {
  const nameInput = useRef();
  
  const [playerName, setPlayerName] = useState(null);

  function handleClick(){
   setPlayerName(nameInput.current.value)
   // reset input field
   // this is imperative code though --
   // directly instructing browser to set value to null
   // React is not handling the interaction
   // but is ok because value not connected to state
   nameInput.current.value = null;
  }
  
  return (
    <section id="player">
      <h2>Welcome {(playerName !== null) ? playerName : 'unknown entity'}</h2>
      <p>
        <input
          ref={nameInput} // connects input element to const set 
                          // by useRef() & gives access to all props
          type="text"     // remove value prop; ref manages value
          required
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
