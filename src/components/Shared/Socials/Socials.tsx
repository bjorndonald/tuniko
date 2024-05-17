import React, { HTMLAttributes } from "react";
import cx from "classnames";

interface SocialsProps extends HTMLAttributes<HTMLDivElement> {
  small?: boolean;
}

const Socials = ({
  className,
  small,
  ...otherProps
}: SocialsProps): JSX.Element => {
  return (
    <div className={cx("flex space-x-4", className)} {...otherProps}></div>
  );
};

export default Socials;
