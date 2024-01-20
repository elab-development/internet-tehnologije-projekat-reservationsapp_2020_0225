import { useState } from 'react';

function useCopy() {
  const [copied, setCopied] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500); // Resetovanje stanja "copied" nakon 1.5 sekunde
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };
   

  return [copied, copyText];
}

export default useCopy;