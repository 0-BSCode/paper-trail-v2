import { useContext, useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import useComments from '@src/hooks/useComments';
import { useParams } from 'react-router-dom';
import Spinner from '@src/components/Spinner';
import DocumentComment from './DocumentComment';
import { ArrowRightOutlined } from '@ant-design/icons';
import { DocumentContext } from '@src/context/DocumentContext';
import StatusEnum from '@src/types/enums/status-enum';

const DocumentComments = (): JSX.Element => {
  const { id: documentId } = useParams();
  const { document } = useContext(DocumentContext);
  const { comments, loading: commentsLoading, createComment } = useComments(parseInt(documentId as string));
  const [content, setContent] = useState('');

  const hasCommentPermission = document?.status !== StatusEnum.RESOLVED;

  const handleAddComment = (): void => {
    if (!content.length) return;

    void createComment(parseInt(documentId as string), content).then(() => {
      setContent('');
    });
  };

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' && event.ctrlKey) handleAddComment();
  };

  return (
    <div onKeyDown={handleOnKeyPress} className="flex flex-col gap-y-3 bg-white shadow-md border-r-4 p-3 w-full">
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
        {!comments.length ? (
          <Typography.Paragraph italic style={{ margin: 0, color: 'grey', textAlign: 'center' }}>
            No comments yet
          </Typography.Paragraph>
        ) : (
          comments.map((comment) => <DocumentComment key={`comment_${comment.id}`} comment={comment} />)
        )}
      </Space>
      <Space direction="vertical" style={{ alignItems: 'stretch', rowGap: 5 }}>
        <Input.TextArea
          placeholder="Leave a comment..."
          disabled={!hasCommentPermission}
          rows={1}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          disabled={!hasCommentPermission || !content.length}
          type="primary"
          onClick={handleAddComment}
          style={{ width: '100%' }}
        >
          Send
          <ArrowRightOutlined />
        </Button>
      </Space>
    </div>
  );
};

export default DocumentComments;
