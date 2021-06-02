import { useState, useEffect } from 'react';
import styles from './typing_panel.module.css';

const TypingPanel = () => {
  const fullText = "the quick brown fox jumps over the lazy dog";

  const [currentText, setCurrentText] = useState<string>("");
  const [cPos, setCPos] = useState(0);
  const [prevWords, setPrevWords] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [nextWords, setNextWords] = useState("");
  const [startTime, setStartTime] = useState<number>();
  const [isFinnished, setIsFinnished] = useState(false);
  const [speed, setSpeed] = useState<number>();

  useEffect(()=>{
  }, [])

  useEffect(()=>{
    setCPos(currentText.length);
    // the first render happens when the page first renderes, 
    // we don't want start time timer before the user has stated typing
    if (startTime === undefined) setStartTime(0);
    if (startTime === 0) setStartTime(Date.now());

    const wordEnd = fullText.indexOf(" ", cPos);

    if (currentText.length === 0) {
      setStartTime(0);
    }
    if (cPos < fullText.length && wordEnd > 0) { 
      setPrevWords(fullText.substring(0, cPos));
      setCurrentWord(fullText.substring(cPos, wordEnd));
      setNextWords(fullText.substring(wordEnd));
      setIsFinnished(false);
    } else {
      setPrevWords(fullText.substring(0));
      setCurrentWord("");
      setNextWords("");

      if (!isFinnished) {
        setIsFinnished(true);
        const endTime = Date.now();
        const textWordCount: number = Math.ceil(fullText.length / 5);
        const totalTimeMin: number = startTime ? (endTime - startTime) / (1000 * 60) : 0;
        const speed: number = textWordCount / totalTimeMin; 
        setSpeed(speed);
      }
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
          <div>
            <input type="text" 
              onChange={(e: any)=>setCurrentText(e.target.value)}
              className={styles.inputTextStyles}
              />
          </div>
        </div>
      </form>
      <div>
      Your speed is {speed} WPM
      </div>
    </div>
  );
};

export default TypingPanel;
