import React from 'react'
import './DashBoard.css'

import useWindowDimensions from '../../hooks/useWindowScreen'

const DashBoard = ({ children }) => {
  
  const { width } = useWindowDimensions();

  const isMobile = width <= 768 ? 'dashboard__mobile' : 'dashboard';

  return <div className={isMobile}>{children}</div>;
}

export default DashBoard