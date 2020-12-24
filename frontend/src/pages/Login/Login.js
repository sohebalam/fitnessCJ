import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useForm } from "react-hook-form"
import api from "../../services/api"
import { Alert } from "@material-ui/lab"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login({ history }) {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [errorMessage, setErrorMessage] = useState(false)
  const [error, setError] = useState("false")

  const Submit = async (evt) => {
    const { email, password } = evt
    console.log("result of the submit", email, password)

    const response = await api.post("/login", { email, password })
    const user_id = response.data.user_id || false
    const user = response.data.user || false

    try {
      if (user && user_id) {
        localStorage.setItem("user", user)
        localStorage.setItem("user_id", user_id)
        history.push("/dashboard")
      } else {
        const { message } = response.data
        setError(true)
        setErrorMessage(message)

        setTimeout(() => {
          setError(false)
          setErrorMessage("")
        }, 2000)
      }
    } catch (error) {
      setError(true)
      setErrorMessage("The server returned an error")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(Submit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={register}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={register}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </form>
        {errorMessage ? (
          <Alert style={{ marginTop: 10 }} variant="outlined" severity="error">
            {" "}
            {errorMessage}
          </Alert>
        ) : (
          ""
        )}
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}
