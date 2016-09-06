import React from 'react';
import styles from './<%= _.kebabCase(containerName) %>';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

lass <%= containerName %>(props) extends React.Component {
  render() {
    return (
      <span />
    );
  }
}

<%= containerName %>.propTypes = {

};

<%= containerName %> = connect(mapStateToProps, mapDispatchToProps)(<%= containerName %>);

export default <%= containerName %>;
