import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'

// TODO add style for add icon
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Groups extends React.Component {
  render() {
    let gs = [];
    const { classes } = this.props
    const groups = JSON.parse(localStorage.getItem('groups'))
    for (var key in groups || {}) {
      gs.push(
        // data struct will be handled with graphql query and its object
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              group: {key}
            </Typography>
            <Typography type="body1" className={classes.title}>
              repos: {groups[key][0].name}
            </Typography>
            <Button className={classes.button}>
              <Link to="/issues">
                issue
              </Link>
            </Button>
          </CardContent>
        </Card>
      )
    }
    return (
      <div className={classes.root}>
        {gs}
        <Link to="/group/new">
          <Button fab color="primary" aria-label ="add">
            <AddIcon />
          </Button>
        </Link>
      </div>
    )
  }
}
export default withStyles(styles)(Groups)