import React from 'react';
import { Box } from '@material-ui/core'
import { navStyles } from './styles'

const Header = () => {
    const classes = navStyles();
  return (
    <Box className={classes.containerDiv}>
      <Box className={classes.mainDiv}>
        <Box>Logo</Box>
        <Box>Links</Box>
      </Box>
    </Box>
  )
}

export default Header
