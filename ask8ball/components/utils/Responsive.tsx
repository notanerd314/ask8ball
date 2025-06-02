import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Tablet = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}

const Mobile = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const LandscapeMobile = ({ children }: { children: React.ReactNode }) => {
  const isLandscape = useMediaQuery({ orientation: 'landscape' })
  return isLandscape ? children : null
}

const Default = ({ children }: { children: React.ReactNode }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export { Desktop, Tablet, Mobile, Default, LandscapeMobile }