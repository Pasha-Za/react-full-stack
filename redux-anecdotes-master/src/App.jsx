import React, {useEffect, useState} from 'react';
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
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { LocalizationProvider, Localized } from "@fluent/react";

//UI
import { Button, Icon, Input, Form, Checkbox, Card, Grid } from "semantic-ui-react";

// should be public/locale/en-US/content.ftl
// const MESSAGES_ALL = {
//   "ru-RU": `
// hello-world = Привет мир!
// just-met-you = Мы только встретились!
// it-s-crazy = И это круто…
// term-link = Я согласен с <links>условиями</links>
//   `,
//   "en-US": `
// hello-world = Hello, World!
// just-met-you = Hey, I just met you!
// it-s-crazy = And this is crazy…
// term-link = I agree with <links>terms</links>
//   `
// };

// Load locales from files.
async function getMessages(locale) {
    const url = `${process.env.PUBLIC_URL}/locale/${locale}/content.ftl`;
    const response = await fetch(url);
    return await response.text();
}

// List all available locales.
const AVAILABLE_LOCALES = ['ru-RU', 'en-US'];


// Negotiate user language.
const languages = negotiateLanguages(
    navigator.languages,
    AVAILABLE_LOCALES,
    { defaultLocale: 'en-US' },
);

const generateBundles = async () => {
    return languages.map( async locale => {
        const translations = await getMessages(locale);
        let resource = new FluentResource(translations);
        // console.log(locale, resource);
        
        const bundle = new FluentBundle(locale);
        bundle.addResource(resource);
        // console.log(bundle);
        
        return bundle;
    });
}

// const generateBundles = () => {
//     return languages.map(locale => {
//         const translations = MESSAGES_ALL[locale];
//         let resource = new FluentResource(translations);
//         console.log(locale, resource);
        
//         const bundle = new FluentBundle(locale);
//         bundle.addResource(resource);
//         console.log(bundle);
        
//         return bundle;
//     });
// }

// console.log(generateBundles());


// Show localized content.
const HelloWorld = ({children}) => {
    return (
      <div>
        <Grid centered={true}>
          <Grid.Row>
            <Grid.Column width={10}>
              {children}
              <Localized
                id="shared-photos"
                $userName={"Катя"}
                $photoCount={4}
                $userGender={"female"}
              >
                <p>
                  {`пользователь {$userName} {$photoCount ->
                        [one] добавил новое фото
                      *[other] добаил {$photoCount} новых фото
                    } to {$userGender ->
                        [male] в его альбом
                        [female] в её альбом
                      *[other] в их альбом
                    }.`}
                </p>
              </Localized>
              
              <Localized id="signin_wellcome" $appName={"Locarto"}>
                <h1>
                  {/* {"wellcome to {$appName}"} */}
                  {'wellcome'}
                </h1>
              </Localized>
              <Localized
                id="signin_already_registered"
                linkLogin={<Link to="/main">log in</Link>}
              >
                <p>
                  {"Already have an account? <linkLogin>Log in</linkLogin>"}
                </p>
              </Localized>

              <Card>
                <Card.Header>
                  <Localized id="signin_create_account_heading">
                    <h2>{"Create an account"}</h2>
                  </Localized>
                </Card.Header>

                <Card.Content>
                  <Form>
                    <Form.Field>
                      <Localized
                        id="signin_email_input"
                        attrs={{ placeholder: true }}
                      >
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={e => {
                            console.log(e.target.value);
                          }}
                        />
                      </Localized>
                    </Form.Field>
                    <Form.Field>
                      <Localized
                        id="signin_password_input"
                        attrs={{ placeholder: true }}
                      >
                        <Input type="password" placeholder="password" />
                      </Localized>
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        id="term"
                        label={
                          <Localized
                            id="signin_btn_terms"
                            linkTerms={<a href="/somwhere"></a>}
                            linkPolicy={<a href="/somwhere2"></a>}
                          >
                            <label htmlFor="term">
                              {
                                "Аgree to <linkTerms>Terms&Conditions</linkTerms> and <linkPolicy>Privacy Policy</linkPolicy>"
                              }
                            </label>
                          </Localized>
                        }
                      />
                    </Form.Field>
                    <Localized id="signin_btn_register">
                      <Button size="small" color="green">
                        <Icon name="download" />
                        {"register"}
                      </Button>
                    </Localized>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <form action="">
          <Localized id="signin_create_account_heading">
            <h2>{"Create an account"}</h2>
          </Localized>
          <Localized id="signin_email_input" attrs={{ placeholder: true }}>
            <Input
              type="text"
              placeholder="Email"
              onChange={e => {
                console.log(e.target.value);
              }}
            />
          </Localized>
          <Localized id="signin_password_input" attrs={{ placeholder: true }}>
            <Input type="password" placeholder="password" />
          </Localized>
          <div className="form-input">
            <input type="checkbox" id="term" />
            <Localized
              id="signin_btn_terms"
              linkTerms={<a href="/somwhere"></a>}
              linkPolicy={<a href="/somwhere2"></a>}
            >
              <label htmlFor="term">
                {
                  "Аgree to <linkTerms>Terms&Conditions</linkTerms> and <linkPolicy>Privacy Policy</linkPolicy>"
                }
              </label>
            </Localized>
          </div>
          <Localized id="signin_btn_register">
            <Button size="small" color="green">
              <Icon name="download" />
              {"register"}
            </Button>
          </Localized>
        </form> */}
      </div>
      // <div>
      //   <Localized id="log-in" $user={'Tom'}>
      //     <p>login</p>
      //   </Localized>
      //   <Localized id="hello-world">
      //     <p>Simple text</p>
      //   </Localized>
      //   <Localized id="just-met-you">
      //     <p>Hey, I just met you!</p>
      //   </Localized>
      //   <Localized id="it-s-crazy">
      //     <p>And this is crazy…</p>
      //   </Localized>
      //   <Localized id="term-link" links={<a href="google.com">terms</a>}>
      //     <p>{"I agree with <links>terms</links>"}</p>
      //   </Localized>
      // </div>
    );
}

const App = ({ initNotes, anecdotes }) => {

  const [bundles, setBundles] = useState(null);
  const [currentLang, setCurrentLang] = useState(null);

  useEffect(() => {
    generateBundles().then(response => {
      Promise.all(response).then(values => {
        setCurrentLang([values[0]]);
        setBundles(values);
        console.log(values);
      });
    });

    initNotes();
  }, [initNotes]);

  const selectLang = (lang, e) => {
    e.preventDefault();
    
    const langBundle = bundles.find(locale => locale.locales[0] === lang);
    setCurrentLang([langBundle]);
    // console.log(langBundle);
    // console.log(currentLang);
    
  }


  const getNoteById = id =>
    anecdotes.find(anecdote => anecdote.id === id);

  if (!bundles) {
    return <p>LOADING...</p>
  }
    return (
      <div>
        <Router>
          {/* <nav>
            <Link to="/">main</Link>
            <Link to="/create">create new</Link>
            <Link to="/anecdotes">anecdotes</Link>
          </nav>
          <Route exact path="/" render={() => <MainPage />} />
          <Route path="/create" render={() => <NewNotePage />} />
          <Route path="/noresult" render={() => <NoResultPage />} />
          <Route
            exact
            path="/anecdotes"
            render={() => {
              return <NotesList anecdotes={anecdotes} />;
            }}
          />
          <Route
            exact
            path="/anecdotes/:id"
            render={({ match }) => {
              return <Note anecdote={getNoteById(match.params.id)} />;
            }}
          />
          <Route
            path="/admin"
            render={() => {
              return false ? <MainPage /> : <Redirect to="/noresult" />;
            }}
          /> */}
          <LocalizationProvider bundles={currentLang}>
            <HelloWorld>
              <button onClick={(e) => {selectLang("en-US", e)}}>en</button>
              <button onClick={(e) => {selectLang("ru-RU", e)}}>ru</button>
            </HelloWorld>
          </LocalizationProvider>
        </Router>
        {/* <footer>
          <hr />
          Dummy footer
        </footer> */}
      </div>
    );
};

const mapStateToProps = ({anecdotes}) => {
  return {
    anecdotes
  };
}

export default connect(mapStateToProps, { initNotes })(App);