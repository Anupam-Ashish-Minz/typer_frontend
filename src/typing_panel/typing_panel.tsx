import { useState, useEffect } from 'react';
import styles from './typing_panel.module.css';

const TypingPanel = () => {
  const [fullText, setFullText] = useState<string>("the quick brown fox jumps over the lazy dog");
  const [currentText, setCurrentText] = useState<string>("");

  const [cPos, setCPos] = useState<number>(0);

  const [prevWords, setPrevWords] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [nextWords, setNextWords] = useState<string>("");

  useEffect(()=>{
  }, [])

  useEffect(()=>{
    setCPos(currentText.length);

    const wordEnd = fullText.indexOf(" ", cPos);

    if (cPos < fullText.length && wordEnd > 0) { 
      setPrevWords(fullText.substring(0, cPos));
      setCurrentWord(fullText.substring(cPos, wordEnd));
      setNextWords(fullText.substring(wordEnd));
    } else {
      setPrevWords(fullText.substring(0));
      setCurrentWord("");
      setNextWords("");
    }

    let elem = document.getElementById("currentWord")
    let elem2 = document.getElementById("prevWords")

    if (elem && elem2) {
      let a = fullText.substring(0, currentText.length) 
      if (a == currentText) {
        elem.style.color = "#2AE55C";
        elem2.style.color = "#2AE55C";
      } else {
        elem.style.color = "#FB4934";
        elem2.style.color = "#FB4934";
      }
    }
  }, [currentText])

  return (
    <div>
      <form>
        <div className={styles.displayText}>
          <div>
            <span id="prevWords">{prevWords}</span>
            <span id="currentWord">{currentWord}</span>
            <span id="nextWords">{nextWords}</span>
          </div>

          <div id="currentText">{currentText}</div>
        </div>
        <div>
          <textarea rows={10} cols={50} className={styles.textStyles}
            onChange={(e: any)=>setCurrentText(e.target.value)}
          > </textarea>
        </div>
      </form>
    </div>
  );
};

export default TypingPanel;
