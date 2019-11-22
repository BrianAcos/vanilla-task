const React = require('react');
const { Link } = require('react-router-dom');

class Task extends React.Component {
  render() {
    return (
      <li>
        <Link to={`to-do-list/task/${this.props.id}`}>
          <h2>{this.props.id}: {this.props.name}</h2>
        </Link>
      </li>
    );
  }
};

module.exports = Task;