import React from 'react';
import styles from './not-found-page.css';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className={styles.message}>
        404 Not Found
      </div>
    );
  }
}
