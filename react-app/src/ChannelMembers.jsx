import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChannelMembers.module.css';

const ChannelMembers = ({ admins, members }) => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles['channel-members-heading']}>Channel Members</h2>
      <section>
        <h4 className={styles['user-list-title']}>Admins</h4>
        <ul className={styles['user-list']}>
          {admins.map((admin) => (
            <li key={admin.name} className={`${styles.user} ${styles[admin.status]}`}>
              <img src={admin.profilePic} alt={admin.name} className={styles['profile-pic']} />
              <span className={styles['user-name']}>{admin.name}</span>
              <span className={`${styles.status} ${styles[admin.status]}`}></span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className={styles['user-list-title']}>Members</h4>
        <ul className={styles['user-list']}>
          {members.map((member) => (
            <li key={member.name} className={`${styles.user} ${styles[member.status]}`}>
              <img src={member.profilePic} alt={member.name} className={styles['profile-pic']} />
              <span className={styles['user-name']}>{member.name}</span>
              <span className={`${styles.status} ${styles[member.status]}`}></span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

ChannelMembers.propTypes = {
  admins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    })
  ).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChannelMembers;
