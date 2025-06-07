import { useRef } from 'react';
import styles from '../../styles/Sidebar.module.css'
import { useGlobal } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import { PlusIcon, TrashCanIcon } from '../utils/FontAwesome';

/*
 * Sidebar for customizing the magic 8 ball
 * To let users have the "freedom"
 * 
 * @param {HumanSoul} yourSoul
*/
export default function SidebarEditor({ isCompacted }: { isCompacted: boolean }) {
  const { allAnswers, setAllAnswers } = useGlobal();
  const inputRef = useRef<HTMLInputElement[]>([]);

  function updateAnswer(index: number, value: string) {
    const next = [...allAnswers];
    next[index] = value;
    setAllAnswers(next);
  }

  function deleteAnswer(index: number) {
    const next = [...allAnswers];
    next.splice(index, 1);
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current.splice(index, 1);
    }, 1)
  }

  function addAnswer() {
    const next = [...allAnswers];
    next.push("");
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current[inputRef.current.length - 1].focus();
    }, 1)
  }

  function deleteAllAnswers() {
    if (allAnswers.length < 1) {
      toast.info("There are already no responses!", { toastId: "no-responses-deleted" });
      return;
    }

    setAllAnswers([]);
    toast.success("All responses deleted", { toastId: "all-responses-deleted" });
    setTimeout(() => {
      inputRef.current = [];
    }, 1)
  }

  function checkKeyThenAction(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Enter") {
      event.preventDefault();
      addAnswer();
    } else if (event.key === "Delete") {
      deleteAnswer(index);
    }
  }

  return (
    <>
      <div className={styles.editorHeader}>
        <button className='buttonGreen' onClick={addAnswer}>
          <PlusIcon size={16} /> Add a response
        </button>

        <button className='buttonRed' onClick={deleteAllAnswers}>
          <TrashCanIcon size={16} /> Delete all responses
        </button>
      </div>

      <div className={styles.editorContent}>
        {allAnswers.map((answer: string, index: number) => (
          <div key={index} className={styles.editorItem}>
            <input
              value={answer}
              style={{ flex: 1 }}
              ref={(el) => {
                if (el) {
                  inputRef.current[index] = el;
                  console.log(inputRef.current[index])
                }
              }}
              onChange={e => updateAnswer(index, e.target.value)}
              onKeyDown={e => { checkKeyThenAction(e, index) }}
              placeholder={"Add something quirky..."}
            />
            <button
              className="buttonRed"
              onClick={() => deleteAnswer(index)}
            >
              <TrashCanIcon size={20} color='#ffffff' />
              {!isCompacted ? '' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}