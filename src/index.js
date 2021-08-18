import { StrictMode } from 'react';
import { render } from 'react-dom';
import ThemeApp from './ThemeApp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

render(
  <StrictMode>
      <ThemeApp />
  </StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register({
  onUpdate: () => {
    const shouldReload = window.confirm("New version available. Please completely reload this app.");
    shouldReload && window.location.reload();
  },
});