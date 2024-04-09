import React from 'react';
import { shallow } from 'enzyme';
import NewComponent from './NewComponent'; // Assuming the component file is named NewComponent.js

describe('NewComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewComponent />);
  });

  it('renders the component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with the correct state values', () => {
    expect(wrapper.state('aboutMe')).toBe('');
    expect(wrapper.state('phoneNumber')).toBe('');
    expect(wrapper.state('profilePic')).toBe(null);
    expect(wrapper.state('charCount')).toBe(250);
    expect(wrapper.state('validPhoneNumber')).toBe(false);
  });

  it('updates the character count correctly when typing in the About Me input', () => {
    const aboutMeInput = wrapper.find('#about-me');
    aboutMeInput.simulate('change', { target: { value: 'Test about me text' } });

    expect(wrapper.state('aboutMe')).toBe('Test about me text');
    expect(wrapper.state('charCount')).toBe(235); // 250 - 15 characters typed
  });

  it('updates the phone number state and validation correctly', () => {
    const phoneNumberInput = wrapper.find('#phone-number');
    phoneNumberInput.simulate('change', { target: { value: '1234567890' } });

    expect(wrapper.state('phoneNumber')).toBe('1234567890');
    expect(wrapper.state('validPhoneNumber')).toBe(true);
  });

  it('updates the profile picture state correctly when selecting a file', () => {
    const file = new File(['(⌐□_□)'], 'profile-picture.jpg', { type: 'image/jpeg' });
    const profilePicInput = wrapper.find('#profile-pic');
    profilePicInput.simulate('change', { target: { files: [file] } });

    expect(wrapper.state('profilePic')).toBe(file);
  });

  it('simulates saving changes and displays confirmation after 2 seconds', (done) => {
    const saveBtn = wrapper.find('.save-btn');
    saveBtn.simulate('click');

    expect(wrapper.state('saving')).toBe(true);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.state('saving')).toBe(false);
      expect(wrapper.state('changesSaved')).toBe(true);
      done();
    }, 2000);
  });

  it('undoes changes correctly and resets the state', () => {
    wrapper.setState({
      aboutMe: 'Test about me text',
      phoneNumber: '1234567890',
      profilePic: new File(['(⌐□_□)'], 'profile-picture.jpg', { type: 'image/jpeg' }),
      charCount: 235,
      validPhoneNumber: true,
      saving: false,
      changesSaved: true,
    });

    const undoBtn = wrapper.find('.undo-btn');
    undoBtn.simulate('click');

    expect(wrapper.state('aboutMe')).toBe('');
    expect(wrapper.state('phoneNumber')).toBe('');
    expect(wrapper.state('profilePic')).toBe(null);
    expect(wrapper.state('charCount')).toBe(250);
    expect(wrapper.state('validPhoneNumber')).toBe(false);
    expect(wrapper.state('saving')).toBe(false);
    expect(wrapper.state('changesSaved')).toBe(false);
  });
});
