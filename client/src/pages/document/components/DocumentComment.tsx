import type CommentInterface from '@src/types/interfaces/comment';
import getAvatarImageUrlByEmail from '@src/utils/getAvatarImageUrlByEmail';
import { Avatar, Space, Tooltip, Typography } from 'antd';
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
    <div className="px-3 py-1 border border-solid border-gray-400 rounded-lg flex-col">
      <Space.Compact style={{ alignItems: 'center' }}>
        <Avatar size={32} src={getAvatarImageUrlByEmail(comment.user.email)} />
        <Space.Compact direction="vertical" className="ml-2">
          <Tooltip title={comment.user.email}>
            <Typography.Text className="block font-semibold">{comment.user.fullName}</Typography.Text>
          </Tooltip>
          <Typography.Text className="block text-gray-400">
            {convertDateToLocaleString(comment.createdAt)}
          </Typography.Text>
        </Space.Compact>
      </Space.Compact>
      <Typography.Text className="block ml-10">{comment.content}</Typography.Text>
    </div>
  );
};

export default DocumentComment;
