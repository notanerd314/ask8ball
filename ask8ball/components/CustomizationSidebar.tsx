"use client";

import { useRef, useState, useEffect } from 'react';
import { useGlobal } from './context/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from './common/FontAwesome';
import { useMediaQuery } from 'react-responsive';

import styles from '../styles/Sidebar.module.css'
import '../styles/globals.css'

export default function CustomizationSidebar() {
  const { setAllAnswers } = useGlobal();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setisOpen] = useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isCompacted = useMediaQuery({ maxWidth: 1000 });

  if (!mounted) return null;

  const plainTextResponses = `It is certain
  It is decidedly so
  Without a doubt
  Yes definitely
  You may rely on it
  As I see it yes
  Most likely
  Outlook good
  Yes
  Signs point to yes
  Reply hazy try again
  Ask again later
  Better not tell you now
  Cannot predict now
  Concentrate and ask again
  Don't count on it
  My reply is no
  My sources say no
  Outlook not so good
  Very doubtful`;

  function saveResponses() {
    const listAnswers = textareaRef.current?.value.split('\n')
      .map(line => line.trim())
      .filter(line => line);
    setAllAnswers(listAnswers);
  }

  function toggleSidebar() {
    setisOpen(prev => {
      const next = !prev;
      if (next && isCompacted) {
        setTimeout(() => {
          sidebarRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 1);
      }
      return next;
    });
  }

  return (
    <>
      <button className={styles.sidebarToggle + ' buttonTransparent'} onClick={toggleSidebar} title='Toggle sidebar'>
        {!isOpen ?
          isCompacted ? <ChevronDownIcon /> : <ChevronLeftIcon />
          :
          isCompacted ? <ChevronUpIcon /> : <ChevronRightIcon />
        }
        &nbsp;
        {isCompacted ? 'Customize' : ''}
      </button>
      <aside ref={sidebarRef} className={styles.sidebar + " " + (!isOpen ? styles.sidebarHidden : "")}>
        {/* <textarea
          ref={textareaRef}
          onChange={saveResponses}
          placeholder="Click enter for next response..."
          defaultValue={plainTextResponses}
        ></textarea> */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magna aliqua. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaeci cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magna aliqua.</p>
      </aside>
    </>
  )
}