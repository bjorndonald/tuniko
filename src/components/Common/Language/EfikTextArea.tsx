"use client";
import cx from "classnames";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  setValue: (str: string) => void;
  value: string | undefined;
}

const EfikTextArea = (props: Props) => {
  const {
    setValue,
    placeholder,
    disabled = false,
    value,
    className,
    id,
  } = props;
  const [caretPosition, setCaretPosition] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [currentletter, setCurrentletter] = useState("");

  const tones: {
    [key: string]: string[];
  } = {
    a: ["a", "á", "â", "à", "ǎ", "ā"],
    A: ["A", "Á", "Â", "À", "Ǎ", "Ā"],
    e: ["e", "ẹ", "é", "ê", "è", "ě", "ē"],
    E: ["E", "É", "Ê", "È", "Ě", "Ē"],
    i: ["i", "ị", "í", "î", "ì", "ǐ", "ī"],
    I: ["I", "Í", "Î", "Ì", "Ǐ", "Ī"],
    o: ["o", "ọ", "ó", "ô", "ò", "ǒ", "ō", "ọ́", "ọ̀", "ọ̄"],
    O: ["O", "Ọ", "Ó", "Ô", "Ò", "Ǒ", "Ō", "Ọ́", "Ọ̀", "Ọ̄"],
    u: ["u", "ụ", "ú", "û", "ù", "ǔ", "ū"],
    U: ["U", "Ú", "Û", "Ù", "Ǔ", "Ū"],
    n: ["n", "ñ"],
    N: ["N", "Ñ"],
  };

  function setCharAt(str: string | undefined, index: number, chr: string) {
    if (!str) return "";
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  useEffect(() => {
    if (!value) {
      setCaretPosition(0);
      setCurrentletter("");
      setSelectedTone(0);
    }

    return () => {};
  }, [value]);

  return (
    <div className="efik-editor relative grow">
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        value={value}
        onKeyDown={e => {
          if (currentletter) {
            switch (e.key) {
              case "Enter":
              case "Space":
                e.preventDefault();

                setValue(
                  setCharAt(
                    value,
                    caretPosition,
                    tones[currentletter][selectedTone],
                  ),
                );

                setSelectedTone(0);

                setCurrentletter("");
                break;
              case "ArrowLeft":
                e.preventDefault();
                setSelectedTone(
                  selectedTone === 0
                    ? tones[currentletter].length - 1
                    : selectedTone - 1,
                );
                break;
              case "ArrowRight":
                e.preventDefault();
                setSelectedTone(
                  selectedTone === tones[currentletter].length - 1
                    ? 0
                    : selectedTone + 1,
                );
                break;
              default:
                return;
            }
          }
        }}
        onChange={e => {
          setCaretPosition(e.target.selectionStart - 1);
          setValue(e.target.value);

          // var letter = e.target.value.slice(-1)
          const letter = e.target.value[e.target.selectionStart - 1];
          if (tones[letter]) setCurrentletter(letter);
          else {
            setCurrentletter("");
          }
        }}
        className={cx(
          "min-h-16 w-full resize-none whitespace-pre-wrap border-none bg-transparent text-2xl text-base-content outline-none ring-0 focus:border-none",
          className,
        )}
        aria-label="corpus"
        aria-autocomplete="list"
        aria-expanded="false"
        autoComplete="off"
        autoCorrect="off"
        role="combobox"
        rows={1}
        spellCheck={false}
        name="corpus"
      />
      {!!currentletter && (
        <div className="tones  bg-background absolute -top-[52px] left-0 flex h-10 items-center divide-x border border-base-300">
          {tones[currentletter].map((x, i) => (
            <div
              key={i}
              onClick={() => {
                setValue(setCharAt(value, caretPosition, x));
                setCurrentletter("");
                setSelectedTone(0);
              }}
              className={`hover:bg-hover flex h-full w-10 cursor-pointer items-center justify-center ${selectedTone === i ? "bg-hover text-base-content" : ""}`}
            >
              {x}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EfikTextArea;
