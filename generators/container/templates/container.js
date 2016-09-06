import React from 'react';
import styles from './<%= _.kebabCase(componentName) %>.css';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class <%= containerName %>(props) extends React.Component {
  render() {
    return (
      <span />
    );
  }
}

<%= containerName %>.propTypes = {

};
