import React from 'react';
import { Fragment } from 'react';
import { Modal, Button, Paper } from '@material-ui/core';
import axios from "axios";

export default function ApplyModal({props, getData}) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
   setOpen2(true);
 };

 const handleClose2 = () => {
   setOpen2(false);
 };

  const apply = async () => {
    handleClose()
   try {
      const response = await axios.post('/applied', {
         jobId: props.original.jobId,
       })
      if(response.status === 200){
         getData()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const notInterested = async () => {
   handleClose()
   handleClose2()
   try {
      const response = await axios.post('/not_interested', {
         jobId: props.original.jobId,
         })
      if(response.status === 200){
         getData()
      }
      } catch (error) {
      console.error(error);
      }
 };

  return (
    <Fragment>
      <div style={{display: 'flex'}}>
         <Button style={{marginRight: '10px'}} variant="contained" color="secondary" size='small' onClick={handleOpen2}>
            No
         </Button>
         <a href={props.value} rel="noopener noreferrer" target='_blank' style={{textDecoration: 'none'}}>
            <Button variant="contained" color="primary" size='small' onClick={handleOpen}>
               Apply!
            </Button>
         </a>
      </div>
      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <Paper style={{ top: '50%', left: '50%', width: '25%', transform: 'translate(130%, 200%)', padding: '20px'}} square>
          <h2>Did You Apply?</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={apply}>
               Yes
            </Button>
            <Button style={{margin: '10px', backgroundColor: '#FFBB28', color: 'white'}} variant="contained" color="inherit" onClick={notInterested}>
               Not Interested
            </Button>
            <Button style={{margin: '10px'}} variant="contained" color="secondary" onClick={handleClose}>
               No
            </Button>
          </div>
        </Paper>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open2}
      >
        <Paper style={{ top: '50%', left: '50%', width: '25%', transform: 'translate(130%, 200%)', padding: '20px'}} square>
          <h2>Are You Sure?</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={notInterested}>
               Yes
            </Button>
            <Button style={{margin: '10px'}} variant="contained" color="secondary" onClick={handleClose2}>
               No
            </Button>
          </div>
        </Paper>
      </Modal>
    </Fragment>
  );
}