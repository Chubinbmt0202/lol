import React from "react";
import Tab from "./_components/Tab";

interface Props {
  params:Promise<{ id: string }>;
  children: React.ReactNode;
}
const ClassDetailLayout = async ({ children, params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <Tab id={id} />
      {children}
    </div>
  );
};

export default ClassDetailLayout;
