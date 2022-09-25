import React, { ChangeEvent, useState } from "react";
import styles from "./WordCategories.module.css";

const DUMMY_WORDPACKS = ["Suomi", "Dota 2", "English", "Food"];

const WordCategories = () => {
  const [selectedPack, setSelectedPack] = useState<string>();

  const selectionHandler = (event: ChangeEvent) => {
    setSelectedPack(event.target.id);
  };
  return (
    <>
      <h2>Select Wordpack</h2>
      <div className={styles.wordpacks}>
        {DUMMY_WORDPACKS.map((pack, index) => (
          <div key={pack}>
            <input
              defaultChecked={index === 0}
              type="checkbox"
              name="wordpack"
              id={pack}
              value={pack}
              onChange={selectionHandler}
            />
            <label htmlFor={pack}>{pack}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default WordCategories;
