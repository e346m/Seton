import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import classnames from 'classnames';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justify: 'flex-start'
  },
  card: {
    width: 300,
    hight: 300,
    marginTop: 16,
  },
  body: {
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  footer: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2rem',
    zIndex: -1,
  },
  add: {
    zIndex: 3,
  },
});

class Groups extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    let gs = []
    const { classes } = this.props
    const groups = JSON.parse(localStorage.getItem('groups'))
    for (var key in groups || {}) {
      gs.push(
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="body1">
                <Button className={classes.button}>
                  <Link to={{
                    pathname: "/issues",
                    state: { repos: groups[key] }
                  }}>
                  { key }
                </Link>
              </Button>
              </Typography>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                <ul>
                  { groups[key].map(repo =>
                    <Typography type="body2" className={classes.body}>
                      <li>{ repo.name } \\ { repo.label }</li>
                    </Typography>
                  )}
                </ul>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      )
    }
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={16}>
            {gs}
          </Grid>
        </Grid>
        <Grid container justify="flex-end" alignments="flex-end" className={classes.footer}>
          <Link to="/group/new">
            <Button fab color="primary" aria-label ="add" className={classes.add}>
              <AddIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(Groups)
