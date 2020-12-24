import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import moment from "moment"
import { Button } from "@material-ui/core"
// import { Button } from "@material-ui/core"
// import api from "../../services/api"
const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
})

export default function FeaturedPost(props) {
  const classes = useStyles()
  const { post, user_id } = props
  // const [events, setEvents] = useState([])

  // useEffect(() => {
  //   getEvents()
  // }, [])

  // const getEvents = async (filter) => {
  //   const url = filter ? `/dashboard/${filter}` : "/dashboard"

  //   const response = await api.get(url, { headers: { user_id } })

  //   setEvents(response.data)
  // }
  // const deleteEventHandler = () => {}
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={post.thumbnail}
            title={post.imageTitle}
          />
          {/* {events.map((post) =>
            post.user === user_id ? (
              <div>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => deleteEventHandler(post._id)}
                >
                  Delete
                </Button>
              </div>
            ) : (
              ""
            )
          )} */}
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(post.date).format("Do MMMM  YYYY")}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                description
              </Typography>
              <Button
                style={{ marginLeft: "11rem" }}
                color="primary"
                variant="outlined"
              >
                Subscribe
              </Button>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
}
