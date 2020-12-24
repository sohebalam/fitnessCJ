import React, { useEffect, useState } from "react"
import api from "../../services/api"
import useStyles from "../styles"
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import FileBase from "react-file-base64"
import { useForm } from "react-hook-form"
import { Alert } from "@material-ui/lab"

export default function Dashboard({ history }) {
  const [postData, setPostData] = useState({ selectedFile: "" })
  const [errorMessage, setErrorMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit } = useForm()
  const user = localStorage.getItem("user")

  useEffect(() => {
    if (!user) history.push("/login")
  }, [])

  const Submit = async (evt) => {
    const { title, description, price, sport, date } = evt
    const { selectedFile } = postData

    const eventData = Object.assign(evt, postData)

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "" &&
        date !== "" &&
        selectedFile !== null
      ) {
        const response = await api.post("/event", eventData, {
          headers: { user },
        })
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      } else {
        setErrorMessage(true)
        setTimeout(() => {
          setErrorMessage(false)
        }, 2000)
      }
    } catch (error) {
      Promise.reject(error)
      console.log(error)
    }
    console.log(eventData)
  }

  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit(Submit)}
      >
        <Typography align="center" variant="h6">
          Creating an Event
        </Typography>
        {/* <Grid item>
          <Button
            className={classes.buttonSubmit}
            color="primary"
            variant="contained"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Sport
          </Button>
          <Menu
            id="sport"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem name="cycling" inputRef={register} onClick={handleClose}>
              Cycling
            </MenuItem>
            <MenuItem name="swimming" inputRef={register} onClick={handleClose}>
              Swimming
            </MenuItem>
            <MenuItem name="running" inputRef={register} onClick={handleClose}>
              Running
            </MenuItem>
          </Menu>
        </Grid> */}
        <TextField
          name="sport"
          variant="outlined"
          inputRef={register}
          label="Sport"
          fullWidth
        />{" "}
        <TextField
          name="title"
          variant="outlined"
          inputRef={register}
          label="Title"
          fullWidth
        />{" "}
        <TextField
          name="description"
          variant="outlined"
          inputRef={register}
          label="description"
          fullWidth
        />{" "}
        <TextField
          name="price"
          variant="outlined"
          inputRef={register}
          label="Event Price £0.00"
          fullWidth
        />{" "}
        <TextField
          name="date"
          variant="outlined"
          inputRef={register}
          fullWidth
          type="date"
        />{" "}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            // name="file"
            multiple={false}
            // inputRef={register}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => history.push("/dashboard")}
            fullWidth
          >
            Dashboard
          </Button>
        </div>
      </form>
      {errorMessage ? (
        <Alert style={{ marginTop: 10 }} variant="outlined" severity="error">
          {" "}
          Missing required information
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert style={{ marginTop: 10 }} variant="outlined" severity="success">
          {" "}
          Success in creating the event
        </Alert>
      ) : (
        ""
      )}
    </Paper>
  )
}
