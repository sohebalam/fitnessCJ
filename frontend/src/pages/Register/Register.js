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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Register({ history }) {
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState(false)
  const [error, setError] = useState("false")
  const { register, handleSubmit } = useForm()
  const Submit = async (evt) => {
    const { email, password, firstName, lastName } = evt

    console.log("result of the submit", email, firstName, lastName)
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
      })
      const user = response.data.user || false
      const user_id = response.data.user_id || false

      if (user_id && user) {
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
    } else {
      setError(true)
      setErrorMessage("Please fill in all the fields")
      setTimeout(() => {
        setError(false)
        setErrorMessage("")
      }, 2000)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(Submit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                inputRef={register}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
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
      <Box mt={5}></Box>
    </Container>
  )
}
