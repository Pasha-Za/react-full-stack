import React from 'react';
import NotesList from "../NotesList";
import Notification from "../Notification";
import Filter from "../Filter";

const MainPage = () => {
    return (
      <>
        <Notification />
        <Filter />
        <NotesList />
      </>
    );
}
 
export default MainPage;