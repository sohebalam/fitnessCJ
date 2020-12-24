import React, { useEffect, useState } from "react"
import api from "../../services/api"
import useStyles from "../styles"
import Grid from "@material-ui/core/Grid"
import { Button, ButtonGroup, CssBaseline, Box } from "@material-ui/core"
import socketio from "socket.io-client"

import FeaturedPost from "./FeaturedPost"
import { Alert } from "@material-ui/lab"

const Dashboard = ({ history }) => {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const user_id = localStorage.getItem("user_id")
  const user = localStorage.getItem("user")
  const [rselected, setRselected] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    const socket = socketio("http://localhost:8000")
  }, [])

  const filterHandler = (query) => {
    setRselected(query)
    getEvents(query)
  }

  const myEventsHandler = async () => {
    try {
      setRselected("myevents")

      const response = await api.get("/user/events", {
        headers: { user: user },
      })
      setEvents(response.data.events)
    } catch (error) {
      history.push("/login")
    }
  }

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/dashboard/${filter}` : "/dashboard"

      const response = await api.get(url, { headers: { user: user } })

      setEvents(response.data.events)
    } catch (error) {
      history.push("/login")
    }
  }

  const deleteEventHandler = async (eventId) => {
    try {
      await api.delete(`/event/${eventId}`, { headers: { user: user } })
      setSuccess(true)
      setTimeout(() => {
        filterHandler(null)
        setSuccess(false)
      }, 1000)
    } catch (error) {
      setErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(false)
      }, 2000)
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("user")
    history.push("/login")
  }

  return (
    <>
      <div>
        Filter:
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button
            onClick={() => filterHandler(null)}
            active={rselected === null}
          >
            All Sports
          </Button>
          <Button onClick={myEventsHandler} active={rselected === "myevents"}>
            My Events
          </Button>

          <Button
            onClick={() => filterHandler("running")}
            active={rselected === "running"}
          >
            {" "}
            Running
          </Button>
          <Button
            onClick={() => filterHandler("cycling")}
            active={rselected === "cycling"}
          >
            Cycling
          </Button>
          <Button
            onClick={() => filterHandler("swimming")}
            active={rselected === "swimming"}
          >
            Swimming
          </Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginLeft: "5rem", marginBottom: "2rem" }}>
          <Button color="secondary" onClick={() => history.push("events")}>
            Events{" "}
          </Button>
          <Button color="secondary" onClick={logoutHandler}>
            Logout{" "}
          </Button>
        </ButtonGroup>
      </div>
      <CssBaseline />
      <main>
        <Grid container spacing={4} className={classes.mainGrid}>
          {events.map((post) => (
            <FeaturedPost key={post._id} post={post} />
            // <Dashboard key={post.title} post={post} />
          ))}{" "}
          <Grid container style={{ marginLeft: "2rem", marginBottom: "3rem" }}>
            {" "}
            {events.map((post) =>
              post.user === user_id ? (
                <div key={post._id}>
                  <Box style={{ marginLeft: "2rem", marginTop: "2rem" }}>
                    Event Title: {post.title}
                    <Button
                      style={{ marginLeft: "1.5rem" }}
                      color="secondary"
                      variant="outlined"
                      onClick={() => deleteEventHandler(post._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </div>
              ) : (
                ""
              )
            )}
          </Grid>
        </Grid>
      </main>
      <Grid container spacing={4} className={classes.mainGrid}></Grid>
      <Grid item style={{ marginTop: 10 }}>
        {" "}
        {errorMessage ? (
          <Alert
            style={{ marginTop: 10, marginBottom: "5rem" }}
            variant="outlined"
            severity="error"
          >
            {" "}
            Missing required information
          </Alert>
        ) : (
          ""
        )}
      </Grid>
      <Grid item style={{ marginTop: 10, marginBottom: "5rem" }}>
        {success ? (
          <Alert
            style={{ marginTop: 10 }}
            variant="outlined"
            severity="success"
          >
            {" "}
            Success in creating the event
          </Alert>
        ) : (
          ""
        )}
      </Grid>
    </>
  )
}

export default Dashboard
