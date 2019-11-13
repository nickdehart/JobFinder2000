import React, { Fragment } from 'react';
import { Modal, Button, Paper } from '@material-ui/core';
import CoverLetter from './CoverLetter.js';
import axios from "axios";
import QuestionModal from './QuestionModal.js';

export default function DetailModal({props, getData}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notInterested = async () => {
   handleClose()
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

 const notAvailable = async () => {
  handleClose()
  try {
     const response = await axios.post('/not_available', {
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
      <Button variant="contained" color="primary" size='small' onClick={handleOpen}>
        Details
      </Button>
      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
          <Paper style={{ top: '50%', left: '20%', width: '70%', transform: 'translate(20%, 20%)', padding: '20px'}} square>
          { props && props.original &&
          <Fragment>
            <h2>{props.original.title ? props.original.title : 'Not Available'}</h2>
            {props.original.company && <h3>{props.original.company}</h3>}
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div style={{display: 'flex', width: '50%'}}>
                <b>Perks:&nbsp;
                  {props.original.perks && props.original.perks.map((entry, index) => 
                    <Button key={`perk-${index}`} style={{margin: '5px'}} variant="outlined" size='small'>{`${entry}`}</Button>
                  )}
                  {props.original.perks.length === 0 && 'None'}
                </b>
              </div>
              <div style={{display: 'flex', width: '50%'}}>
                <b>Tags:&nbsp;
                  {props.original.tags.map((entry, index) => 
                    <Button key={`tag-${index}`} style={{margin: '5px'}} variant="outlined" size='small'>{`${entry}`}</Button>
                  )}
                  {props.original.tags && props.original.tags.length === 0 && 'None'}
                </b>
              </div>
            </div>
            <CoverLetter text={props.original.cv}/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <QuestionModal props={props} getData={getData} />
              <Button style={{margin: '10px', backgroundColor: '#FFBB28', color: 'white'}} variant="contained" color="inherit" onClick={notInterested}>
                Not Interested
              </Button>
              <Button style={{margin: '10px', backgroundColor: '#FF8042', color: 'white'}} variant="contained" color="inherit" onClick={notAvailable}>
                Not Available
              </Button>
              <Button style={{margin: '10px'}} variant="contained" color="secondary" onClick={handleClose}>
                Maybe Later
              </Button>
            </div>
          </Fragment>}
        </Paper>
      </Modal>

    </Fragment>
  );
}