import React from 'react'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import RepoLabelForm from './RepoLabelForm.jsx'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  flexCol: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
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

class GroupForm extends React.Component {
  state = {
    group_label: '',
    repos: [{name: '', label: ''}],
    labels: {},
    unclickable: false,
  }
  handleChange = e => {
    this.setState({ group_label: e.target.value })
  }
  handleAddRepo = () => {
    this.setState({
      repos: this.state.repos.concat([{ name: '' }])
    });
  }
  handleDelRepo = (idx) => () => {
    this.state.repos.splice(idx, 1);
    this.setState({ repos: this.state.repos })
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
    this.props.history.replace('/')
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.flexCol}>
        <div className={classes.container}>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="group-label">Group Label</InputLabel>
            <Input id="group-label" value={this.state.group_label}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button className={classes.button} raised dense
            onClick={this.handleAddRepo}>
            Add
          </Button>
          <Button className={classes.button} raised dense onClick={this.handleSave}
            disabled={this.state.unclickable}
          >
            <Save className={classes.leftIcon} />
            Save
          </Button>
        </div>
        <div className={classes.container}>
          {this.state.repos.map((repo, idx) =>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor={idx}>repo</InputLabel>
                <Input id={idx} placeholder="owner/repository" value={repo.name}
                  onChange={this.handleRepoNameChange(idx)}
                  onBlur={this.handleGetLabel(idx)}
                />
                <RepoLabelForm key={idx} labels={this.state.labels[idx] || []}
                  handleRepoLabelChange={this.handleRepoLabelChange(idx)}
                  label={repo.label || ''}
                />
              </FormControl>
              <Button className={classes.button} raised dense onClick={this.handleDelRepo(idx)}>
                Delete
              </Button>
            </div>
          )}
      </div>
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
export default withStyles(styles)(withApollo(GroupForm))
