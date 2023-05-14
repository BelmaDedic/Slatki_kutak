import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ImageDialog({ url, isOpen, closingDialog }) {
  const [open, setOpen] = React.useState(isOpen);
  const noImageFound =
    "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";
    
  const handleClose = () => {
    setOpen(false);
    closingDialog();
    isOpen = false;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Slika proizvoda
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p
              style={{
                backgroundImage: `url(${url === "" ? noImageFound : url})`,
                width: 550,
                height: 400,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {" "}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
