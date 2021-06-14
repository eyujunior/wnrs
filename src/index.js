import React from 'react';
import ReactDOM from 'react-dom';
import ThemeApp from './ThemeApp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
      <ThemeApp />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register({
  onUpdate: () => {
    const shouldReload = window.confirm("New version available. Please completely reload this app.");
    shouldReload && window.location.reload();
  },
});