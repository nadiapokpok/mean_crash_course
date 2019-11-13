const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const multer = require ('multer');
const Issue = require ('./models/issue');

const app = express ();
app.use(express.static('public'));


//config multer
let storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb (null, 'public');
  },
  filename: (req, file, cb) => {
    cb (null, Date.now () + file.originalname);
  },
});

let upload = multer ({storage: storage});

const router = express.Router ();

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));

//utilisation de cors pour autoriser client externe à faire des requetes sur le server
app.use (cors ());

mongoose.connect ('mongodb://localhost:27017/issues');
const connection = mongoose.connection;
connection.once ('open', () => {
  console.log ('Miaou miaou mongo est là');
});

router.route('/issues').get ((req, res) => {
  Issue.find ((err, issues) => {
    if (err) console.log (err);
    else res.json (issues);
  });
});

router.route ('/issues/:id').get ((req, res) => {
  Issue.findById (req.params.id, (err, issue) => {
    if (err) console.log (err);
    else res.json (issue);
  });
});

router.route ('/issues/add').post (upload.single ('file'), (req, res) => {
  console.log (req.file);
  let issue = new Issue ({
    title: req.body.title,
    responsible: req.body.responsible,
    file: req.file.filename,
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
  });
  issue
    .save ()
    .then (issue => {
      res.status (200).json ({issue: 'Added successfully'});
    })
    .catch (err => {
      res.status (400).send ('Failed to create new record');
    });
});
router
  .route ('/issues/update/:id')
  .post (upload.single ('file'), (req, res) => {
    Issue.findById (req.params.id, (err, issue, next) => {
      if (!issue) {
        return next (new ERROR ('Could not load document'));
      } else {
        issue.title = req.body.title;
        issue.responsible = req.body.responsible;
        issue.file = req.file.filename;
        issue.description = req.body.description;
        issue.severity = req.body.severity;
        issue.status = req.body.status;
        issue
          .save ()
          .then (issue => {
            res.json ('update done');
            res.redirect ('/list');
          })
          .catch (err => {
            res.status (400).send ('Update failed');
          });
      }
    });
  });

router.route ('/issues/delete/:id').get ((req, res) => {
  Issue.findByIdAndRemove ({_id: req.params.id}, (err, issue) => {
    if (err) {
      res.json (err);
    } else {
      res.json ('Remove successfully');
    }
  });
});

app.use ('/', router);

app.listen (4000, () => console.log ("Allo j'écoute"));
