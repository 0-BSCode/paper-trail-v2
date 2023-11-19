import React, { useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import useComments from '@src/hooks/useComments';
import { useParams } from 'react-router-dom';
import Spinner from '@src/components/Spinner';
import DocumentComment from './DocumentComment';
import { ArrowRightOutlined } from '@ant-design/icons';

const DocumentComments = (): JSX.Element => {
  const { id: documentId } = useParams();
  const { comments, loading: commentsLoading, createComment } = useComments(parseInt(documentId as string));
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col gap-y-3 bg-white shadow-md border-r-4 p-3">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Comments
      </Typography.Title>
      <Space
        direction="vertical"
        style={{
          overflowY: 'auto',
          maxHeight: '250px',
          rowGap: '8px',
          paddingBlock: '10px',
        }}
      >
        {commentsLoading && <Spinner size="lg" />}
        {comments.map((comment) => (
          <DocumentComment key={`comment_${comment.id}`} comment={comment} />
        ))}
      </Space>
      <Space.Compact style={{ alignItems: 'stretch', columnGap: 5 }}>
        <Input.TextArea
          rows={1}
          style={{ width: '80%' }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          icon={<ArrowRightOutlined />}
          type="primary"
          style={{
            flex: 1,
          }}
          onClick={() => {
            if (!content.length) return;

            void createComment(parseInt(documentId as string), content).then(() => {
              setContent('');
            });
          }}
        />
      </Space.Compact>
    </div>
  );
};

export default DocumentComments;
