import './UserProfileModal.css';
import type { ChangeEvent, Dispatch } from 'react';
import { useState, useEffect, useContext } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Typography, Divider, Flex, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FormInputField from './FormInputField';
import UserService from '@src/services/user-service';
import { ToastContext } from '@src/context/ToastContext';
const { Title } = Typography;

const UserProfileModal = (): JSX.Element => {
  const { error } = useContext(ToastContext);
  const [isOpen, setIsOpen] = useState(false);
  const { email: authEmail, accessToken, userId } = useAuth();
  const [form] = Form.useForm();

  // Input fields for edit profile form
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(String(authEmail));
  const [contactNumber, setContactNumber] = useState('');
  const [courseAndYear, setCourseAndYear] = useState('');

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

  useEffect(() => {
    void fetchUserDetails();
  }, []);

  const handleOpen = (): void => {
    void fetchUserDetails();
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
        onCancel={handleClose}
        width={1000}
        className="UserProfileModal"
        footer={[
          <Button key="back" onClick={handleClose}>
            Close
          </Button>,
        ]}
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
          </Flex>
          {/* Right Side */}
          <Flex vertical justify="center" align="center" gap="middle">
            <Form form={form} layout="vertical" autoComplete="off">
              <FormInputField
                disabled
                name="student-id-number"
                label="Student ID Number"
                type="number"
                value={studentIdNumber}
                onChange={(e) => {
                  handleChange(e, setStudentIdNumber);
                }}
              />
              <FormInputField
                disabled
                name="full-name"
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  handleChange(e, setFullName);
                }}
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
                disabled
                name="contact-number"
                label="Contact Number"
                type="tel"
                value={contactNumber}
                onChange={(e) => {
                  handleChange(e, setContactNumber);
                }}
              />
              <FormInputField
                disabled
                name="course-and-year"
                label="Course & Year"
                type="text"
                value={courseAndYear}
                onChange={(e) => {
                  handleChange(e, setCourseAndYear);
                }}
              />
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default UserProfileModal;
