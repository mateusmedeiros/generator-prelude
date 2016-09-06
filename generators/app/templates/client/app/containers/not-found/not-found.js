import React from 'react';
import styles from './not-found.css';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className={styles.message}>
        "404 Not Found"
      </div>
    );
  }
}
