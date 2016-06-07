import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ErrorDialog = (errorMessage, onDismiss, onRetry) => (
  <Dialog
    actions={
      [<FlatButton
        label="Cancel"
        primary
        onTouchTap={onDismiss}
      />, <FlatButton
        label="Retry"
        primary
        onTouchTap={onRetry}
      />]
    }
    modal={false}
    style={{ color: '#fff', zIndex: '3000' }}
    open
    onRequestClose={onDismiss}
  >
    {errorMessage}
  </Dialog>
);

export default ErrorDialog;

