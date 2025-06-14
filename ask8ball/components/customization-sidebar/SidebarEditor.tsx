import { useRef, forwardRef } from 'react';
import styles from '../../styles/Sidebar.module.css'
import { useGlobal } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import { PlusIcon, TrashCanIcon } from '../utils/FontAwesome';

type SidebarEditorItemProps = {
  answer: string;
  index: number;
  updateAnswer: (index: number, value: string) => void;
  deleteAnswer: (index: number) => void;
  addAnswer: () => void;
  isCompacted: boolean;
  ballCurrentState: string;
}

/**
 * The footer of the sidebar editor
 * 
 * @param {string[]} allAnswers - the list of answers
 * @returns {JSX.Element} - the footer of the sidebar editor
 */
export function SidebarEditorFooter({ allAnswers }: { allAnswers: string[] }) {
  return (
    <p
      style={{ textAlign: 'center', fontSize: '0.8em' }}
    >
      {allAnswers.length} response{allAnswers.length === 1 ? '' : 's'} - Version 1 (Alpha)
    </p>
  )
}

/**
 * A single item in the sidebar editor
 * 
 * @param {SidebarEditorItemProps} props - the props for the item
 * @returns {JSX.Element} - the sidebar editor item
 */
export const SidebarEditorItem = forwardRef<HTMLInputElement, SidebarEditorItemProps>(
  ({ answer, index, updateAnswer, deleteAnswer, addAnswer, isCompacted, ballCurrentState }, ref) => {

    /**
     * Checks if the key pressed is Enter or Delete and performs the corresponding action
     * @param {React.KeyboardEvent<HTMLInputElement>} event - the keyboard event
     * @param {number} index - the index of the item
     */
    function checkKeyThenAction(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
      if (event.key === "Enter") {
        event.preventDefault();
        addAnswer();
      } else if (event.key === "Delete") {
        deleteAnswer(index);
      }
    }

    return (
      <div className="flex gap-2">
        <input
          value={answer}
          className='flex-1 dark:bg-slate-700'
          ref={ref}  // just assign the forwarded ref here
          onChange={e => updateAnswer(index, e.target.value)}
          onKeyDown={e => checkKeyThenAction(e, index)}
          disabled={ballCurrentState === "shaking"}
          placeholder="Add something quirky..."
        />
        <button
          className="buttonRed"
          disabled={ballCurrentState === "shaking"}
          onClick={() => deleteAnswer(index)}
        >
          <TrashCanIcon size={24} color='#ffffff' />
        </button>
      </div>
    )
  }
);

/**
 * The main component for the sidebar editor
 * 
 * @param {boolean} isCompacted - a boolean indicating whether the sidebar is compacted
 * @returns {JSX.Element} - the sidebar editor
 */
export default function SidebarEditor({ isCompacted }: { isCompacted: boolean }) {
  const { allAnswers, setAllAnswers, ballCurrentState } = useGlobal();
  const inputRef = useRef<HTMLInputElement[]>([]);

  /**
   * Updates the answer at the given index with a new value
   * @param {number} index - the index of the answer to be updated
   * @param {string} value - the new value for the answer
   */
  function updateAnswer(index: number, value: string) {
    const next = [...allAnswers];
    next[index] = value;
    setAllAnswers(next);
  }

  /**
   * Deletes the answer at the given index
   * @param {number} index - the index of the answer to be deleted
   */
  function deleteAnswer(index: number) {
    const next = [...allAnswers];
    next.splice(index, 1);
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current.splice(index, 1);
    }, 1)
  }

  /**
   * Adds a new answer to the list
   */
  function addAnswer() {
    const next = [...allAnswers];
    next.push("");
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current[inputRef.current.length - 1].focus();
    }, 1)
  }

  /**
   * Deletes all answers
   */
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

  return (
    <>
      <div className="flex flex-wrap gap-2 text-[0.7em]">
        <button className='buttonNormal buttonPaddingSmall' onClick={deleteAllAnswers} disabled={ballCurrentState === "shaking" || allAnswers.length < 1}>
          <TrashCanIcon size={16} /> Delete all responses
        </button>
      </div>

      <div className={styles.editorContent}>
        {allAnswers.map((answer: string, index: number) => (
          <SidebarEditorItem
            key={index}
            answer={answer}
            index={index}
            updateAnswer={updateAnswer}
            deleteAnswer={deleteAnswer}
            addAnswer={addAnswer}
            isCompacted={isCompacted}
            ballCurrentState={ballCurrentState}
            ref={el => {
              if (el) inputRef.current[index] = el;
            }}
          />
        ))}
      </div>
        <button className='buttonGreen' onClick={addAnswer} disabled={ballCurrentState === "shaking"}>
          <PlusIcon size={16} /> Add a response
        </button>
      <SidebarEditorFooter allAnswers={allAnswers} />
    </>
  )
}

