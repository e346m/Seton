import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'

import Grid from 'material-ui/Grid'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import classnames from 'classnames';

const styles = theme => ({
  card: {
    width: 300,
    hight: 300,
    marginTop: 16,
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
});

class GroupItem extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { repos, classes } = this.props
    return(
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1">
              <Button className={classes.button}>
                <Link to={{ pathname: "/issues", state: { repos: repos } }}>
                  {this.props.groupName}
                </Link>
              </Button>
            </Typography>
            <IconButton onClick={this.handleExpandClick} aria-label="Show more"
              aria-expanded={this.state.expanded}
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
              <ul>
                { repos.map(repo =>
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
}

export default withStyles(styles)(GroupItem)
