import type CommentInterface from '@src/types/interfaces/comment';
import { Typography } from 'antd';
import React from 'react';

const DocumentComment = ({ comment }: { comment: CommentInterface }): JSX.Element => {
  return (
    <div>
      {/* TODO (Bryan): Get username from email */}
      <Typography.Text className="block">{comment.user.email}</Typography.Text>
      <Typography.Text>{comment.content}</Typography.Text>
    </div>
  );
};

export default DocumentComment;
