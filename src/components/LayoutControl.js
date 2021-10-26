import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles(() => ({
  root: {
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const DEFAULT_MAX_WIDTH_BREAKPOINT = 'xl';

const LayoutControl = ({ children, maxWidthBreakpoint = DEFAULT_MAX_WIDTH_BREAKPOINT }) => {
  const theme = useTheme();
  const classes = useStyles();
  const style = { maxWidth: theme.breakpoints.values[maxWidthBreakpoint] };

  if (maxWidthBreakpoint === 'none') {
    delete style.maxWidth;
  }

  return (
    <div className={classes.root} style={style}>
      {children}
    </div>
  );
};

export default LayoutControl;