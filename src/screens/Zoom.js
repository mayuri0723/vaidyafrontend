import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


function Zoom() {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const eassbuzz = () => {
    // const para = {
    //   "txnid": "T31Q6J1HM",
    //   "amount": "788.00",
    //   "name": "EASE BUZZ PVT LTD",
    //   "email": "xyz@gmail.com",
    //   "phone": "9527336026",
    //   "productinfo": "Laptop",
    //   "surl": "http://localhost:5000/api/easebuzz/easebuzz_reponse",
    //   "furl": "http://localhost:5000/api/easebuzz/easebuzz_reponse",
    //   "udf1": "",
    //   "udf2": "",
    //   "udf3": "",
    //   "udf4": "",
    //   "udf5": "",
    //   "address1": "",
    //   "address2": "",
    //   "city": "",
    //   "state": "",
    //   "country": "",
    //   "zipcode": "",
    //   "sub_merchant_id": "",
    //   "unique_id": "",
    //   "split_payments": "",
    //   "customer_authentication_id": "",
    //   "udf6": "",
    //   "udf7": "",
    //   "udf8": "",
    //   "udf9": "",
    //   "udf10": ""
    // }
    //   const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmYyZDQ2ZDU3ZjE5MjFiZjU4MzJlZiIsImlhdCI6MTY2Njg3MDA2NSwiZXhwIjoxNjY5NDYyMDY1fQ.f85xBMw5hM1eoVTZlqby0OxCTg7nQBZRm40lfZvdX8M`,
    //     },
    // }
    //   axios.post("http://localhost:3000/api/easebuzz/initiate_payment", config)

    //   .then((response) => {
    //     console.log("Response is",response.data)
    //     window.location.href = response.data


    //   })


  }

  const zoomMeeting = () => {
    //meta width tag 
    // let viewMode = getCookie("view-mode");
    // if (viewMode == "desktop") {
    //   viewport.setAttribute('content', 'width=1024');
    // } else if (viewMode == "mobile") {
    //   viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
    // }

    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === "viewport") {
        metas[i].setAttribute('content', "width=1024, initial-scale=1");
        break;
      }
    }

    const data = {
      // email: "mayurichavan842@gmail.com",
      email: "info@mindvein.com"
    };
    console.log(username);
    axios
      .post(`https://testzoomapi-mayuri0723.vercel.app/meeting`, data)
      .then((response) => {
        let URL =
          response.data.join_url.replaceAll(
            "https://us04web.zoom.us/j/",
            "http://localhost:9996/?"
          ) + `?role=1?name=${username}`;
        console.log(URL);
        // window.innerWidth = 1024;
        // window.open(`${URL}`,'_blank',"width=1268");
        const meetingLinkWitoutPassword = response.data.join_url.split("?")[0];
        const webClinetMeetingLink = meetingLinkWitoutPassword.replaceAll("/j/", "/wc/") + "/join";
        console.log(webClinetMeetingLink);
        window.open(`${webClinetMeetingLink}`, '_self');

        // window.location.replace(`${URL}`);

      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">

      <header className="App-header">

        {/* <Student /> */}
        <h1>Zoom Meeting</h1>
        <div className="card">
          <h5>
            Name&nbsp;&nbsp;
            <input
              type="text"
              name="name"
              style={{
                width: "300px",
                borderRadius: "5px",
                padding: "8px 12px",
                fontSize: "18px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </h5>

          <div className="row" style={{ margin: "10px" }}>
            <div className="column">
              <div
                className="row"
                style={{ margin: "10px", marginTop: "120px" }}
              >
                <button
                  className="btn btn-info"
                  style={{
                    width: "290px",
                    height: "80px",
                    fontSize: "20px",
                    fontFamily: "cursive",
                  }}
                  onClick={zoomMeeting}
                >
                  Create Meeting
                </button>
              </div>
            </div>
            <div className="column" style={{ float: "right" }}>
              <img
                src="\meeting.png"
                height="330px"
                width="400px"
                style={{
                  margin: "10px",
                  borderRadius: "50px",
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
      <div>
        <button
          onClick={eassbuzz}>
          Easebuzz
        </button>
      </div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Zoom;
