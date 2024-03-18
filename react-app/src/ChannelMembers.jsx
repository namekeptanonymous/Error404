/* eslint-disable react/prop-types */

import styles from './ChannelMembers.module.css';

const ChannelMembers = ({ admins, members }) => {
  return (
    <div className={styles.container}>
      <div className={styles['user-list-section']}>
        <h4>Admins</h4>
        <ul className={styles['user-list']}>
          {admins.map((admin) => (
            <li key={admin.name} className={`${styles.user} ${styles[admin.status]}`}>
              <img src={admin.profilePic} alt={admin.name} className={styles['profile-pic']} />
              <span className={styles['user-name']}>{admin.name}</span>
              <span className={`${styles.status} ${styles[admin.status]}`}></span>
            </li>
          ))}
        </ul>

        <h4>Members</h4>
        <ul className={styles['user-list']}>
          {members.map((member) => (
            <li key={member.name} className={`${styles.user} ${styles[member.status]}`}>
              <img src={member.profilePic} alt={member.name} className={styles['profile-pic']} />
              <span className={styles['user-name']}>{member.name}</span>
              <span className={`${styles.status} ${styles[member.status]}`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelMembers;
