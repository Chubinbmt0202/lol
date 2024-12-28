import React from "react";
import Drawer from "./_components/TeacherDrawer";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Drawer>{children}</Drawer>
    </div>
  );
};

export default TeacherLayout;
