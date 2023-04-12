import { Routes, Route } from "react-router-dom";

import BasicLayout from "components/Layouts/BasicLayout";
import Navigation from "components/Navigation";
import Settings from "./Settings";

import UserProvider from "providers/UserProvider";
import QuizProvider from "providers/QuizProvider";
import Quizzes from "./Quizzes";
import QuizBuiler from "components/QuizBuilder";

const Home = () => {
  return (
    <UserProvider>
      <Navigation />
      <BasicLayout>
        <Routes>
          <Route path="/settings" Component={Settings} />
          <Route path="/new" Component={QuizBuiler} />
          <Route
            path="/*"
            element={
              <QuizProvider>
                <Quizzes />
              </QuizProvider>
            }
          />
        </Routes>
      </BasicLayout>
    </UserProvider>
  );
};

export default Home;
