import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.previewProfilePic = this.previewProfilePic.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.undoChanges = this.undoChanges.bind(this);
  }

  previewProfilePic(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = 'Profile Picture Preview';
      img.classList.add('profile-pic-preview');
      document.querySelector('.profile-pics-container').appendChild(img);
    };
    reader.readAsDataURL(file);
  }

  saveChanges() {
    const saveConfirmation = document.getElementById('save-confirmation');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Simulate saving changes (setTimeout used as a placeholder for actual saving process)
    saveConfirmation.style.display = 'none'; // Hide save confirmation if visible
    loadingSpinner.style.display = 'block'; // Show loading spinner

    setTimeout(() => {
      // Hide loading spinner and show save confirmation after 2 seconds (simulating save delay)
      loadingSpinner.style.display = 'none';
      saveConfirmation.style.display = 'block';

      // Add an undo button after saving
      const undoBtn = document.createElement('button');
      undoBtn.textContent = 'Undo Changes';
      undoBtn.classList.add('undo-btn');
      undoBtn.onclick = this.undoChanges;
      document.querySelector('.container').appendChild(undoBtn);
    }, 2000); // Simulating a 2-second delay for saving changes
  }

  undoChanges() {
    const undoBtn = document.querySelector('.undo-btn');
    undoBtn.remove(); // Remove undo button
    const saveConfirmation = document.getElementById('save-confirmation');
    saveConfirmation.style.display = 'none'; // Hide save confirmation

    // Reset input fields
    document.getElementById('about-me').value = ''; // Clear About Me input
    document.getElementById('char-count').textContent = 'Characters left: 250'; // Reset character count display
    document.getElementById('phone-number').value = ''; // Clear phone number input
    document.querySelector('.valid-feedback').style.display = 'none'; // Hide valid feedback
    document.querySelector('.invalid-feedback').style.display = 'none'; // Hide invalid feedback

    // Remove profile picture previews
    const profilePicPreviews = document.querySelectorAll('.profile-pic-preview');
    profilePicPreviews.forEach((preview) => preview.remove());
  }

  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile Settings</title>
        <style dangerouslySetInnerHTML={{__html: "\n        body {\n            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n            background-color: #36393f;\n            color: #dcddde;\n            margin: 0;\n            padding: 0;\n            transition: background-color 0.3s ease, color 0.3s ease;\n        }\n\n        .container {\n            max-width: 400px;\n            margin: 50px auto;\n            background-color: #202225;\n            padding: 30px;\n            border-radius: 8px;\n            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);\n            transition: background-color 0.3s ease;\n        }\n\n        h1 {\n            text-align: center;\n            margin-bottom: 30px;\n            color: #7289da;\n        }\n\n        .setting {\n            margin-bottom: 20px;\n        }\n\n        label {\n            display: block;\n            margin-bottom: 8px;\n            color: #b9bbbe;\n            font-weight: bold;\n        }\n\n        input[type=\"text\"],\n        input[type=\"file\"] {\n            width: calc(100% - 20px);\n            padding: 10px;\n            border: 1px solid #72767d;\n            border-radius: 5px;\n            background-color: #2e3136;\n            color: #dcddde;\n            transition: border-color 0.3s ease;\n        }\n\n        input[type=\"text\"]:focus,\n        input[type=\"file\"]:focus {\n            border-color: #7289da;\n        }\n\n        .save-btn {\n            display: block;\n            width: 100%;\n            padding: 10px;\n            background-color: #7289da;\n            color: #fff;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n            transition: background-color 0.3s ease;\n        }\n\n        .save-btn:hover {\n            background-color: #5f73bc;\n        }\n\n        .error-message {\n            color: #ff6b6b;\n            margin-top: 5px;\n        }\n\n        /* Dynamic character count color */\n        #char-count {\n            color: #b9bbbe;\n        }\n\n        /* Real-time validation styles */\n        .valid-feedback,\n        .invalid-feedback {\n            display: none;\n            font-size: 12px;\n            margin-top: 5px;\n        }\n\n        .valid-feedback i.fa-check,\n        .invalid-feedback i.fa-times {\n            margin-right: 5px;\n        }\n\n        .valid-feedback {\n            color: #43b581; /* Green color for valid input */\n        }\n\n        .invalid-feedback {\n            color: #f04747; /* Red color for invalid input */\n        }\n\n        /* Save confirmation styles */\n        .save-confirmation {\n            color: #43b581; /* Green color for confirmation */\n            display: none;\n            margin-top: 10px;\n        }\n\n        .loading-spinner {\n            display: none;\n            margin-top: 10px;\n        }\n\n        /* Additional styles for profile picture preview */\n        .profile-pics-container {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 10px;\n            margin-top: 10px;\n        }\n\n        .profile-pic-preview {\n            width: 100px;\n            height: 100px;\n            object-fit: cover;\n            border-radius: 50%;\n        }\n    " }} />
        <div className="container">
          <h1>Profile Settings</h1>
          <div className="setting">
            <label htmlFor="about-me">About Me:</label>
            <input type="text" id="about-me" name="about-me" placeholder="Enter a brief description about yourself" maxLength={250} />
            <div id="char-count">Characters left: 250</div>
          </div>
          <div className="setting">
            <label htmlFor="profile-pic">Profile Picture:</label>
            <input type="file" id="profile-pic" name="profile-pic" onChange={this.previewProfilePic} />
            <div className="profile-pics-container" />
          </div>
          <div className="setting">
            <label htmlFor="phone-number">Phone Number:</label>
            <input type="text" id="phone-number" name="phone-number" placeholder="Enter your phone number" />
            <div className="valid-feedback"><i className="fa fa-check" />Valid phone number</div>
            <div className="invalid-feedback"><i className="fa fa-times" />Please enter a valid phone number</div>
          </div>
          <button className="save-btn" onClick={this.saveChanges}>Save Changes</button>
          <div id="save-confirmation" className="save-confirmation">Changes saved!</div>
          <div className="loading-spinner"><i className="fa fa-spinner fa-spin" />Saving...</div>
        </div>
      </div>
    );
  }
}

export default Settings;
