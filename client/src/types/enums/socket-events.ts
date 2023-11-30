enum SocketEvent {
  SEND_CHANGES = 'send-changes',
  RECEIVE_CHANGES = 'receive-changes',
  CURRENT_USERS_UPDATE = 'current-users-update',
  SEND_COMMENT = 'send-comment',
  RECEIVE_COMMENT = 'receive-comment',
  SEND_STATUS = 'send-status',
  RECEIVE_STATUS = 'receive-status',
  SEND_ASSIGNEE = 'send-assignee',
  RECEIVE_ASSIGNEE = 'receive-assignee',
}

export default SocketEvent;
