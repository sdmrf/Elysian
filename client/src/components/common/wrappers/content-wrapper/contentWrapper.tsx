// Imports
import React, { ReactNode } from "react";

// Interfaces
interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
