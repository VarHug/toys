import Layer from './components/layer/layer.js';
import './common/styles/common.css';

const App = function () {
  let app = document.getElementById('app');
  let layer = new Layer();
  app.innerHTML = layer.tpl;
}

new App();
