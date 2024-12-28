import React from "react";

interface Props {
  children: React.ReactNode;
}
const ClassesLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ClassesLayout;
