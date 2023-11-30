import './UserProfileModal.css';
import type { ChangeEvent, Dispatch } from 'react';
import { useState } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Typography, Divider, Flex, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FormInputField from './FormInputField';
const { Title } = Typography;

const UserProfileModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { email: authEmail } = useAuth();
  const [form] = Form.useForm();

  // Input fields for edit profile form
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(String(authEmail));
  const [contact, setContact] = useState('');
  const [courseAndYear, setCourseAndYear] = useState('');

  // TODO (Ian): Create a useEffect to fetch user data to prefill the inputs based on useAuth().userId

  const handleUploadNewPhoto = (): void => {
    // TODO (Ian): Integrate with backend when routes are ready.
    window.alert('Uploading new profile picture to the server.');
  };

  const handleRemovePhoto = (): void => {
    // TODO (Ian): Integrate with backend when routes are ready.
    window.alert('Removing profile picture from the server.');
  };

  const handleUpdateInfo = (): void => {
    // TODO (Ian): Integrate with backend when routes are ready.
    window.alert('Sending an update request with new user data to the server.');
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
                name="id"
                label="Student ID Number"
                value={id}
                onChange={(e) => {
                  handleChange(e, setId);
                }}
              />
              <FormInputField
                name="full-name"
                label="Full Name"
                value={fullName}
                onChange={(e) => {
                  handleChange(e, setFullName);
                }}
              />
              <FormInputField
                name="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  handleChange(e, setEmail);
                }}
              />
              <FormInputField
                name="contact"
                label="Contact Number"
                value={contact}
                onChange={(e) => {
                  handleChange(e, setContact);
                }}
              />
              <FormInputField
                name="course"
                label="Course & Year"
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
