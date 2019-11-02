import React from 'react';
import { Fragment } from 'react';
import { Modal, Button, Paper } from '@material-ui/core';
import axios from "axios";

export default function ApplyModal({props}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const apply = async () => {
    handleClose()
   try {
      const response = await axios.post('/applied', {
         jobId: props.original.jobId,
       })
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <a href={props.value} rel="noopener noreferrer" target='_blank' style={{textDecoration: 'none'}}>
         <Button variant="contained" color="primary" size='small' onClick={handleOpen}>
            Apply!
         </Button>
      </a>
      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <Paper style={{ top: '50%', left: '50%', width: '25%', transform: 'translate(130%, 200%)', padding: '20px'}} square>
          <h2>Did You Apply?</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={apply}>
               Yes!
            </Button>
            <Button style={{margin: '10px'}} variant="contained" color="secondary" onClick={handleClose}>
               No!
            </Button>
          </div>
        </Paper>
      </Modal>
    </Fragment>
  );
}