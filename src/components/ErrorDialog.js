import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ErrorDialog = ({ errorMessage, onDismiss, onRetry }) => (
  <Dialog
    actions={<div>
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={onDismiss}
      />
      <FlatButton
        label="Retry"
        primary
        onTouchTap={onRetry}
      />
    </div>
    }
    modal={false}
    style={{ color: '#fff', zIndex: '3000' }}
    open
    onRequestClose={onDismiss}
  >
    {errorMessage}
  </Dialog>
);

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDialog;

