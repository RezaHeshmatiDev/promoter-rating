import { useState, ChangeEvent, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  OutlinedInput,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { apiPatchPromoters } from "../../services/api/PromotersApi";

interface Props {
  notes?: string;
  promoterID: number;
  invoiceID: number;
  onSubmitSuccess(note: string): void;
}

const NotesModal = forwardRef(
  ({ notes, promoterID, invoiceID, onSubmitSuccess }: Props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [note, setNote] = useState<string>(notes || "");
    const [loading, setLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      toggleModal() {
        toggleModal();
      },
    }));

    const toggleModal = () => {
      if (!loading) {
        setOpen(!open);
      }
    };

    const submit = () => {
      setLoading(true);
      apiPatchPromoters(promoterID, invoiceID, note)
        .then((result) => {
          onSubmitSuccess(result.notes);
          toggleModal();
        })
        .finally(() => setLoading(false));
    };

    const onChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
      setNote(event.target.value);
    };

    return (
      <Modal open={open} onClose={toggleModal} sx={{ display: "flex" }}>
        <Card
          sx={{
            margin: "auto",
            width: "60%",
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        >
          <CardHeader
            title={"ثبت ملاحظات"}
            action={<CloseIcon onClick={toggleModal} />}
          />
          <CardContent>
            <OutlinedInput
              type="text"
              placeholder={"ملاحظات"}
              value={note}
              onChange={onChangeNote}
              multiline
              fullWidth
              inputProps={{
                style: {
                  maxHeight: "200px",
                },
              }}
            />
          </CardContent>
          <CardActions>
            <LoadingButton
              variant={"contained"}
              loading={loading}
              onClick={submit}
              fullWidth
            >
              {"ثبت"}
            </LoadingButton>
          </CardActions>
        </Card>
      </Modal>
    );
  }
);

export default NotesModal;
