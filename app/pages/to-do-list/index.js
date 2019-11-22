const router = require('express').Router();
const React = require('react');
const { renderToString } = require('react-dom/server');
const Task = require('../../../models/task');
const View = require('./view');
const { StaticRouter } = require('react-router-dom');


router.get('/', (req, res, next) => {
  Task.getAllTasks()
    .then(tasks => {
      const initialState = {
        tasks,
      };
      const context = {};

      // const content = renderToString(<View initialState={initialState}/>);
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <View initialState={initialState} />
        </StaticRouter>
      );

      res.render('template', {
        pageName: 'to-do-list',
        pageTitle: 'TO-DO List',
        initialState,
        content
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;