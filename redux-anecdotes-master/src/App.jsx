import React, {useEffect} from 'react';
import {initNotes} from './reducers/anecdoteReducer';
import { connect } from 'react-redux';
import MainPage from './components/pages/MainPage';
import NewNotePage from "./components/pages/NewNotePage";
import {
  BrowserRouter as Router,
  Route, Link, Redirect,
} from 'react-router-dom'
import Note from './components/Note';
import NotesList from './components/NotesList';
import NoResultPage from './components/pages/NoResultPage';

//localization
import { FluentBundle } from "fluent";
import { negotiateLanguages } from "fluent-langneg";
import { LocalizationProvider, Localized } from "fluent-react";

// should be public/locale/en-US/content.ftl
const MESSAGES_ALL = {
  "ru-RU": `
hello-world = Привет мир!
just-met-you = Мы только встретились!
it-s-crazy = И это круто…
term-link = устовиями
term-link2 = Я согласен с <links>условиями</links>
  `,
  "en-US": `
hello-world = Hello, World!
just-met-you = Hey, I just met you!
it-s-crazy = And this is crazy…
term-link = terms
term-link2 = I agree with <links>terms</links>
  `
};

// Load locales from files.
// async function getMessages(locale) {
//     const url = `${process.env.PUBLIC_URL}/locale/${locale}/content.ftl`;
//     const response = await fetch(url);
//     return await response.text();
// }

// List all available locales.
const AVAILABLE_LOCALES = ['en-US'];


// Negotiate user language.
const languages = negotiateLanguages(
    navigator.languages,
    AVAILABLE_LOCALES,
    { defaultLocale: 'en-US' },
);

// async function generateBundles() {
//     return LOCALES_ALL.map(locale => {
//         const translations = await getMessages(locale);
//         const bundle = new FluentBundle(locale);
//         bundle.addMessages(translations);
//         return bundle;
//     });
// }

const generateBundles = () => {
    return languages.map(locale => {
        const translations = MESSAGES_ALL[locale];
        console.log(locale, translations);
        
        const bundle = new FluentBundle(locale);
        bundle.addMessages(translations);
        console.log(bundle);
        
        return bundle;
    });
}

console.log(generateBundles());


// Show localized content.
const HelloWorld = () => {
    return (
      <div>
        <Localized id="hello-world">
          <p>Simple text</p>
        </Localized>
        <Localized id="just-met-you">
          <p>Hey, I just met you!</p>
        </Localized>
        <Localized id="it-s-crazy">
          <p>And this is crazy…</p>
        </Localized>
        <p>
          ознакомится с{" "}
          <Localized id="term-link">
            <a href="#"> link somewhere</a>
          </Localized>
        </p>
        <Localized id="term-link2" links={<a href="#"></a>}>
          <p>{"I agree with <links>terms</links>"}</p>
        </Localized>
      </div>
    );
}

const App = ({ initNotes, anecdotes }) => {
  useEffect(() => {
    initNotes();
  }, [initNotes]);

  const getNoteById = id =>
    anecdotes.find(anecdote => anecdote.id === id);

  return (
    <div>
      <Router>
        <nav>
          <Link to="/">main</Link>
          <Link to="/create">create new</Link>
          <Link to="/anecdotes">anecdotes</Link>
        </nav>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/create" render={() => <NewNotePage />} />
        <Route path="/noresult" render={() => <NoResultPage />} />
        <Route exact path="/anecdotes" render={() => {
          return <NotesList anecdotes={anecdotes}/>;
        }} />
        <Route exact path="/anecdotes/:id" render={({match}) => {
          return <Note anecdote={getNoteById(match.params.id)} />;
        }} />
        <Route path="/admin" render={() => {
          return false ? <MainPage /> : <Redirect to="/noresult" />;
        }}/>
      </Router>
      <LocalizationProvider bundles={ generateBundles() }>
          <HelloWorld />
      </LocalizationProvider>
      <footer>
        <hr />
        Dummy footer
      </footer>
    </div>
  );
};

const mapStateToProps = ({anecdotes}) => {
  return {
    anecdotes
  };
}

export default connect(mapStateToProps, { initNotes })(App);