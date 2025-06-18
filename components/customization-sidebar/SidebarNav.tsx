import { Dispatch, SetStateAction } from "react"

import styles from '../../styles/Sidebar.module.css'

export default function SidebarNavigation(
  { pages, setPage, currentPage }:
    { pages: string[], setPage: Dispatch<SetStateAction<number>>, currentPage: number }
) {
  return (
    <div className={styles.sidebarNavigation}>
      {pages.map((page, index) => (
        <button key={index} onClick={() => setPage(index)} className={'buttonNav' + (currentPage === index ? ' active' : '')}>
          {page}
        </button>
      ))}
    </div>
  )
}