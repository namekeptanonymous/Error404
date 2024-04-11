import React from 'react';
import { auth, db } from '../firebase';  
import { doc, setDoc, getDocs, collection, query, where, updateDoc } from 'firebase/firestore';  
import { updateProfile } from 'firebase/auth';  

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicGiven: false,
      username: '',
    };
    this.previewProfilePic = this.previewProfilePic.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.undoChanges = this.undoChanges.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);  
  }

  // Add a method to handle username changes
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  previewProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
      this.setState({ profilePicGiven: true });
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = 'Profile Picture Preview';
        img.classList.add('profile-pic-preview');
        document.querySelector('.profile-pics-container').appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ profilePicGiven: false });
    }
  }

  async saveChanges() {
    const saveConfirmation = document.getElementById('save-confirmation');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Simulate saving changes (setTimeout used as a placeholder for actual saving process)
    saveConfirmation.style.display = 'none'; // Hide save confirmation if visible
    loadingSpinner.style.display = 'block'; // Show loading spinner

    const { username } = this.state;

    await updateProfile(auth.currentUser, { displayName: username });

    // Update the user's name in Firestore
    await setDoc(doc(db, 'users', auth.currentUser.uid), { name: username }, { merge: true });

    // Fetch all channels
    const channelDocs = await getDocs(collection(db, 'channels'));
    const userChatsDocs = await getDocs(collection(db, 'userChats'));

    // For each channel, fetch all channelUsers and update the user's name if the uid matches
    for (const channelDoc of channelDocs.docs) {
      const channelUsersQuery = query(collection(db, 'channels', channelDoc.id, 'channelUsers'), where('uid', '==', auth.currentUser.uid));
      const adminUsersQuery = query(collection(db, 'channels', channelDoc.id, 'admins'), where('uid', '==', auth.currentUser.uid));
      const messagesUsersQuery = query(collection(db, 'channels', channelDoc.id, 'messages'), where('email', '==', auth.currentUser.email));
      const channelUsersSnapshot = await getDocs(channelUsersQuery);
      const adminUsersSnapshot = await getDocs(adminUsersQuery);
      const messagesUsersSnapshot = await getDocs(messagesUsersQuery);

      for (const channelUserDoc of channelUsersSnapshot.docs) {
        await updateDoc(channelUserDoc.ref, { name: username });
      }
      for (const adminUserDoc of adminUsersSnapshot.docs) {
        await updateDoc(adminUserDoc.ref, { name: username });
      }
      for (const messageUserDoc of messagesUsersSnapshot.docs) {
        await updateDoc(messageUserDoc.ref, { name: username });
      }
    }

    // for (const userChatsDoc of userChatsDocs.docs) {
    //   const channelUsersQuery = query(collection(db, 'userChats'), where('uid', '==', auth.currentUser.uid));

    //   for (const messageUserDoc of messagesUsersSnapshot.docs) {
    //     await updateDoc(messageUserDoc.ref, { name: username });
    //   }
    // }

    // After all the updates are done, hide the loading spinner and show the save confirmation
    loadingSpinner.style.display = 'none';
    saveConfirmation.style.display = 'block';
}

  undoChanges() {
    const saveConfirmation = document.getElementById('save-confirmation');
    saveConfirmation.style.display = 'none'; // Hide save confirmation

    // Reset input fields
    document.getElementById('profile-name').value = '';
    document.querySelector('.valid-feedback').style.display = 'none'; // Hide valid feedback
    document.querySelector('.invalid-feedback').style.display = 'none'; // Hide invalid feedback

    // Remove profile picture previews
    const profilePicPreviews = document.querySelectorAll('.profile-pic-preview');
    profilePicPreviews.forEach((preview) => preview.remove());
  }


  render() {
    return (
      
      <div className="space-y-2 p-4 text-white">
        <style dangerouslySetInnerHTML={{__html: "\n        body {\n            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n            background-color: #36393f;\n            color: #dcddde;\n            margin: 0;\n            padding: 0;\n            transition: background-color 0.3s ease, color 0.3s ease;\n        }\n\n        .container {\n            max-width: 400px;\n            margin: 50px auto;\n            background-color: #202225;\n            padding: 30px;\n            border-radius: 8px;\n            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);\n            transition: background-color 0.3s ease;\n        }\n\n        h1 {\n            text-align: center;\n            margin-bottom: 30px;\n            color: #7289da;\n        }\n\n        .setting {\n            margin-bottom: 20px;\n        }\n\n        label {\n            display: block;\n            margin-bottom: 8px;\n            color: #b9bbbe;\n            font-weight: bold;\n        }\n\n        input[type=\"text\"],\n        input[type=\"file\"] {\n            width: calc(100% - 20px);\n            padding: 10px;\n            border: 1px solid #72767d;\n            border-radius: 5px;\n            background-color: #2e3136;\n            color: #dcddde;\n            transition: border-color 0.3s ease;\n        }\n\n        input[type=\"text\"]:focus,\n        input[type=\"file\"]:focus {\n            border-color: #7289da;\n        }\n\n        .save-btn {\n            display: block;\n            width: 100%;\n            padding: 10px;\n            background-color: #7289da;\n            color: #fff;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n            transition: background-color 0.3s ease;\n        }\n\n        .save-btn:hover {\n            background-color: #5f73bc;\n        }\n\n        .error-message {\n            color: #ff6b6b;\n            margin-top: 5px;\n        }\n\n        /* Dynamic character count color */\n        #char-count {\n            color: #b9bbbe;\n        }\n\n        /* Real-time validation styles */\n        .valid-feedback,\n        .invalid-feedback {\n            display: none;\n            font-size: 12px;\n            margin-top: 5px;\n        }\n\n        .valid-feedback i.fa-check,\n        .invalid-feedback i.fa-times {\n            margin-right: 5px;\n        }\n\n        .valid-feedback {\n            color: #43b581; /* Green color for valid input */\n        }\n\n        .invalid-feedback {\n            color: #f04747; /* Red color for invalid input */\n        }\n\n        /* Save confirmation styles */\n        .save-confirmation {\n            color: #43b581; /* Green color for confirmation */\n            display: none;\n            margin-top: 10px;\n        }\n\n        .loading-spinner {\n            display: none;\n            margin-top: 10px;\n        }\n\n        /* Additional styles for profile picture preview */\n        .profile-pics-container {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 10px;\n            margin-top: 10px;\n        }\n\n        .profile-pic-preview {\n            width: 100px;\n            height: 100px;\n            object-fit: cover;\n            border-radius: 50%;\n        }\n    " }} />
        <div className="container">
          <h1 className="font-bold">Profile Settings</h1>
          <div className="setting">
            <label htmlFor="profile-name">Username:</label>
            <input type="text" id="profile-name" name="profile-name" placeholder="Enter a new username" maxLength={250} value={this.state.username} onChange={this.handleUsernameChange} />
          </div>
          <div className="setting">
            <label htmlFor="profile-pic">Profile Picture:</label>
            <input type="file" id="profile-pic" name="profile-pic" onChange={this.previewProfilePic} />
            {!this.state.profilePicGiven && <p className="text-red-500">Please provide a profile picture.</p>}
            <div className="profile-pics-container" />
          </div>
          <button className="save-btn" onClick={this.saveChanges}>Save Changes</button>
          <div id="save-confirmation" className="save-confirmation text-center mt-2">Changes saved!</div>
          <div className="loading-spinner text-center mt-2"><i className="fa fa-spinner fa-spin" />Saving...</div>
        </div>
      </div>
    );
  }
}

export default Settings;