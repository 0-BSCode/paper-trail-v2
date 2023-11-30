import './UserProfileModal.css';
import type { ChangeEvent, Dispatch } from 'react';
import { useState, useEffect, useContext } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Typography, Divider, Flex, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FormInputField from './FormInputField';
import UserService from '@src/services/user-service';
import { ToastContext } from '@src/context/ToastContext';
import isValid from './isValid.helper';
const { Title } = Typography;

const UserProfileModal = (): JSX.Element => {
  const { success, error } = useContext(ToastContext);
  const [isOpen, setIsOpen] = useState(false);
  const { email: authEmail, accessToken, userId } = useAuth();
  const [form] = Form.useForm();

  // Input fields for edit profile form
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(String(authEmail));
  const [contactNumber, setContactNumber] = useState('');
  const [courseAndYear, setCourseAndYear] = useState('');

  // Booleans for input validation
  const isValidFullName = isValid.fullName(fullName);
  const isValidStudentIdNumber = isValid.studentNumber(studentIdNumber);
  const isValidContactNumber = isValid.contactNumber(contactNumber);
  const isValidCourseAndYear = isValid.courseAndYear(courseAndYear);
  const isValidFormDetails = isValidFullName && isValidStudentIdNumber && isValidContactNumber && isValidCourseAndYear;

  useEffect(() => {
    const fetchUserDetails = async (): Promise<void> => {
      if (accessToken === null || userId === null) {
        error('Please log in.');
        return;
      }

      const fetchedUser = await UserService.getUserById(accessToken, userId);

      setStudentIdNumber(fetchedUser.studentIdNumber);
      setFullName(fetchedUser.fullName);
      setContactNumber(fetchedUser.contactNumber);
      setCourseAndYear(fetchedUser.courseAndYear);
    };

    void fetchUserDetails();
  }, []);

  const handleUploadNewPhoto = (): void => {
    // TODO (Ian): Integrate with backend when routes are ready.
    window.alert('Uploading new profile picture to the server.');
  };

  const handleRemovePhoto = (): void => {
    // TODO (Ian): Integrate with backend when routes are ready.
    window.alert('Removing profile picture from the server.');
  };

  const handleUpdateInfo = async (): Promise<void> => {
    if (accessToken === null || userId === null) {
      error('Please log in.');
      return;
    }

    if (!isValidFormDetails) {
      error('Invalid form details, please input correctly.');
      return;
    }

    const newDetails = { studentIdNumber, fullName, contactNumber, courseAndYear };

    try {
      await UserService.updateUserDetails(accessToken, userId, newDetails);
      success('Successfully updated personal information!');
    } catch (e) {
      error((e as Error).message);
    }
  };

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleChange = (e: ChangeEvent<Element>, setFn: Dispatch<string>): void => {
    setFn((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <Button type="link" size="middle" onClick={handleOpen}>
        <UserOutlined />
      </Button>
      <Modal
        title="Student Profile"
        open={isOpen}
        okText={'Update Info'}
        /* eslint-disable @typescript-eslint/no-misused-promises */
        onOk={handleUpdateInfo}
        cancelText={'Close'}
        onCancel={handleClose}
        width={1000}
        className="UserProfileModal"
      >
        <Divider />
        <Title style={{ fontWeight: '700' }} level={3}>
          Department of Computer, Information Sciences, and Mathematics
        </Title>
        <Divider />
        <Flex justify="center" align="center" gap={64} style={{ margin: '32px 0 32px 0' }}>
          {/* Left Side */}
          <Flex vertical justify="start" align="center" gap="middle">
            <Avatar size={256} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`} />
            <Button onClick={handleUploadNewPhoto} type="primary" style={{ minWidth: '60%' }}>
              Upload New Photo
            </Button>
            <Button onClick={handleRemovePhoto} type="primary" danger style={{ minWidth: '60%' }}>
              Remove Photo
            </Button>
          </Flex>
          {/* Right Side */}
          <Flex vertical justify="center" align="center" gap="middle">
            <Form form={form} layout="vertical" autoComplete="off">
              <FormInputField
                name="student-id-number"
                label="Student ID Number"
                type="number"
                placeholder="ex. 22101295"
                value={studentIdNumber}
                isValid={isValidStudentIdNumber}
                onChange={(e) => {
                  handleChange(e, setStudentIdNumber);
                }}
              />
              <FormInputField
                name="full-name"
                label="Full Name"
                type="text"
                placeholder="ex. John Doe"
                value={fullName}
                onChange={(e) => {
                  handleChange(e, setFullName);
                }}
                isValid={isValidFullName}
              />
              <FormInputField
                disabled
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  handleChange(e, setEmail);
                }}
              />
              <FormInputField
                name="contact-number"
                label="Contact Number"
                type="tel"
                placeholder="ex. +1234567890"
                value={contactNumber}
                onChange={(e) => {
                  handleChange(e, setContactNumber);
                }}
                isValid={isValidContactNumber}
              />
              <FormInputField
                name="course-and-year"
                label="Course & Year"
                type="text"
                placeholder="ex. BSCS-2"
                value={courseAndYear}
                onChange={(e) => {
                  handleChange(e, setCourseAndYear);
                }}
                isValid={isValidCourseAndYear}
              />
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default UserProfileModal;
