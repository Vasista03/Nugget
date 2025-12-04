import React from "react";
import sidebarLogo from "../../assets/sidebar-logo.png";

const NuggetTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <img
      src={sidebarLogo}
      alt="Nugget logo"
      className={className}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
        objectFit: "contain",
      }}
    />
  );
};

export default NuggetTextLogo;
