import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Label from './label.jsx'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class CreateGroup extends React.Component {
  state = {
    group_label: '',
    repos: [{name: '', label: ''}],
    labels: {},
  }
  handleChange = e => {
    this.setState({ group_label: e.target.value })
  }
  handleAddRepo = () => {
    this.setState({
      repos: this.state.repos.concat([{ name: '' }])
    });
  }
  handleRepoNameChange = (idx) => (e) => {
    const newRepos = this.state.repos.map((repo, sidx) => {
      if (idx !== sidx) return repo;
      return { ...repo, name: e.target.value };
    });
    this.setState({ repos: newRepos });
  }
  handleRepoLabelChange = (idx) => (e) => {
    const newRepos = this.state.repos.map((repo, sidx) => {
      if (idx !== sidx) return repo;
      return { ...repo, label: e.target.value }
    });
    this.setState({ repos: newRepos });
  }
  handleGetLabel = (idx) => (e) => {
    const [owner, repository] = e.target.value.split('/')
    this.props.client.query({
      query: LabelQuery,
      variables: { owner, repository },
    }).then((data) => {
      let labels = []
      data.data.repository.labels.edges.map(o => {
        labels.push(o.node.name)
      })
      this.setState({
        labels: Object.assign(this.state.labels, { [idx]: labels })
      })
    })
  }
  handleSave = () => {
    const {group_label, repos} = this.state
    const groups = JSON.parse(localStorage.getItem('groups')) || {}
    let newGroups = { [group_label]: repos }
    newGroups = Object.assign(groups, newGroups)
    localStorage.setItem('groups', JSON.stringify(newGroups))
    this.props.history.replace('/groups')
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="group-label">Group Label</InputLabel>
          <Input id="group-label" value={this.state.group_label}
            onChange={this.handleChange}
          />
        </FormControl>
        <Button className={classes.button} raised dense
          onClick={this.handleAddRepo}>
          Add
        </Button>
        {this.state.repos.map((repo, idx) =>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor={idx}>repo</InputLabel>
            <Input id={idx} placeholder="owner/repository" value={repo.name}
              onChange={this.handleRepoNameChange(idx)}
              onBlur={this.handleGetLabel(idx)}
            />
            <Label key={idx} labels={this.state.labels[idx] || []} handleRepoLabelChange={this.handleRepoLabelChange(idx)} label={repo.label || ''}/>
          </FormControl>
        )}
        <Button className={classes.button} raised dense onClick={this.handleSave}>
          <Save className={classes.leftIcon} />
          Save
        </Button>
      </div>
    )
  }
}

const LabelQuery = gql`
  query LabelQuery($owner: String!, $repository: String!){
    repository(owner: $owner, name: $repository) {
      labels(first: 100) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`
export default withStyles(styles)(withApollo(CreateGroup))
