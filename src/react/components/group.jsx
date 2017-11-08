import React from 'react'
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { Link } from 'react-router-dom'

// TODO add style for add icon
const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
});

// TODO grid layout
// TODO without for of
class Group extends React.Component {
  render() {
    let gs = [];
    const { classes } = this.props
    const groups = localStorage.getItem('groups')
    for (var g of groups || []) {
      gs.push(
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              group: {g}
            </Typography>
          </CardContent>
        </Card>
      )
    }
    return (
      <div>
        {gs}
        <Link to="/issue">
          <Button fab color="primary" aria-label ="add">
            <AddIcon />
          </Button>
        </Link>
      </div>
    )
  }
}
export default withStyles(styles)(Group)
