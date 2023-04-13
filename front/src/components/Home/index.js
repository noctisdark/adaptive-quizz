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
      <QuizProvider>
        <Navigation />
        <BasicLayout>
          <Routes>
            <Route path="/settings" Component={Settings} />
            <Route path="/new" Component={QuizBuiler} />
            <Route path="/edit/:id" Component={QuizBuiler} />
            <Route path="/*" element={<Quizzes />} />
          </Routes>
        </BasicLayout>
      </QuizProvider>
    </UserProvider>
  );
};

export default Home;
