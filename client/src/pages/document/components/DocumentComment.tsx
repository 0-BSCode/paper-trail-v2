import { UserOutlined } from '@ant-design/icons';
import type CommentInterface from '@src/types/interfaces/comment';
import { Space, Typography } from 'antd';
import React from 'react';

const convertDateToLocaleString = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
  });
};

const DocumentComment = ({ comment }: { comment: CommentInterface }): JSX.Element => {
  return (
    <div className="px-3 py-1 border border-solid rounded-sm  flex-col">
      <Space.Compact>
        <UserOutlined />
        <Space.Compact direction="vertical" className="ml-2">
          {/* TODO (Bryan): Get username from email */}
          <Typography.Text className="block font-semibold">{comment.user.email}</Typography.Text>
          <Typography.Text className="block text-gray-400">
            {convertDateToLocaleString(comment.createdAt)}
          </Typography.Text>
        </Space.Compact>
      </Space.Compact>
      <Typography.Text className="block ml-6">{comment.content}</Typography.Text>
    </div>
  );
};

export default DocumentComment;
