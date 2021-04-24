import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import "react-datepicker/dist/react-datepicker.css";

require("./style.css");

if (module.hot) {
    module.hot.accept();
}

ReactDom.render((
    <React.StrictMode>
        <App />
    </React.StrictMode>
), document.getElementById("root"));

