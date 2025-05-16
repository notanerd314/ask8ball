import { useState } from "react";
import "../index.css";
import { useGlobal } from "./GlobalContext";


export const OptionsDialogResponses = () => {
    const { allAnswers, setAllAnswers } = useGlobal();

    return (
        <textarea id="options-textarea" placeholder="Click enter for next response"></textarea>
    )
}


export const OptionsDialog: React.FC = () => {
    return (
        <dialog id="options-modal">
            <h1>Options</h1>
            <br />
            <p>Name of the magic 8 ball:</p>
            <br />
            <input id="title-textarea" placeholder="Magic 8 Ball" />
            <br />
            <br />
            <p>All possible responses:</p>
            <br />
            <textarea id="options-textarea" placeholder="Click enter for next response"></textarea>
            <button className="dialog__close" data-dialog-id="options-modal">x</button>
        </dialog>
    )
}