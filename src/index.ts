import express from 'express'
import * as fs from 'fs';
import { Converter as Markdown2Html } from 'devextreme-showdown';
import path from 'path'
const app = express();
const port = 3000;

type TutStep = { title: string, explanation: string, example: string, winConditions: string };
const tutSteps: Map<number, TutStep> = (() => {
  const md2html = new Markdown2Html();
  const conPath = (p: string) => path.join(path.join(path.dirname(__dirname), 'content'), p);
  return new Map(fs.readdirSync(conPath('./')).map(dir => {
    const match = dir.match(/^(\d{2}):(.*)/);
    if (!match)
      throw new Error("Couldn't parse content dir name: " + dir);

    const [, number, title] = match;
    return [parseInt(number), {
      title: title,
      explanation: md2html.makeHtml(fs.readFileSync(
        conPath(`${dir}/explanation.md`),
        'utf-8'
      )) as string,
      example: fs.readFileSync(conPath(`/${dir}/example.html`), 'utf-8'),
      winConditions: fs.readFileSync(conPath(`/${dir}/winConditions.json`), 'utf-8'),
    }];
  }));
})();

app.use(express.static(path.join(__dirname, 'pub')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pub/index.html'));
});

const tutStepFields: Set<keyof TutStep> = new Set(
  ['title', 'explanation', 'example', 'winConditions']
);
for (const field of tutStepFields) {
  app.get(`/${field}/:stepIndex`, (req, res) => {
    const step = tutSteps.get(parseInt(req.params.stepIndex));
    if (!step)
      return res.status(404).send(`<h1>404</h1><hr/> no such ${field}.`);
    res.send(step[field]);
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
