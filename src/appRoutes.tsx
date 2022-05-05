import React from 'react';
import {Switch, Route} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import UserChatPage from "./pages/userChatPage";
import ModerPage from "./pages/moderPage";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path={'/'} exact component={LoginPage} />
            <Route path={'/moder'} exact component={ModerPage} />
            <Route path={'/help-chat'} exact component={UserChatPage} />
        </Switch>
    );
};

export default AppRoutes;