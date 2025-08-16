import { useState } from "react";
import { Button } from "@gravity-ui/uikit";
import { ModalWindow } from "./ModalWindow.tsx";

export const AddFolder = () => {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Новая папка</Button>
      <ModalWindow
        open={open}
        setOpen={setOpen}
        folder={folder}
        setFolder={setFolder}
        action={"add"}
      />
    </div>
  );
};
