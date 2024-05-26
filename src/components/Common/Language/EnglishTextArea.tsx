import React from "react";
import cx from "classnames";

interface Props {
  id: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  setValue: (str: string) => void;
  value: string | undefined;
}

const EnglishTextArea = (props: Props) => {
  const {
    setValue,
    placeholder,
    disabled = false,
    value,
    className,
    id,
  } = props;
  return (
    <textarea
      id={id}
      value={value}
      disabled={disabled}
      onChange={e => setValue(e.target.value)}
      className={cx(
        "min-h-16 w-full resize-none whitespace-pre-wrap border-none bg-transparent text-2xl text-[rgb(60,64,67)] outline-none",
        className,
      )}
      aria-label="translation"
      aria-autocomplete="list"
      placeholder={placeholder}
      aria-expanded="false"
      autoComplete="off"
      autoCorrect="off"
      role="combobox"
      rows={1}
      spellCheck={false}
      name={id}
    ></textarea>
  );
};

export default EnglishTextArea;
