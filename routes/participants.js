var express     = require('express')
var app         = express()
var Participant = require('../models/participant')
var router      = express.Router()

router.use(function(req, res, next){
  console.log('%s %s [%s]', req.method, req.url, res.statusCode.toString())
  next() // go to next route and not stop here
})

function isLoggedIn(req, res, next){
  if(req.session.username){
      return next();
  }
  res.send('not logged in')
}

router.get('/', function(req,res, next){
  res.json({
    'message': 'Welcome to userCloud API',
    'features': 'GET, POST, PUT, DELETE'
  })
})

// test handler
router.get('/test', function(req,res){
  if(req.session.username){
    res.send('testing')
  }
  res.send('unauthorized')
})

router.route('/participants')
  // post single participant
  .post(function(req,res){
    var user = new Participant()
    user.email    = req.body.email
    user.password = req.body.password

    Participant.findOne({email: user.email}, function(err, exist){
      if(exist){
        console.log('email exist!')
        res.json({
          "Status":"Error",
          "Message":"Email exist!"
        })
        return err;
      } else {
        user.save(function(err){
          if(err){
            res.send(err)
          }
          else {
            res.format({
              json: function(){
                res.send({
                  "Status":"OK",
                  "Message":"Participant created"
                })
              },
              html: function(){
                res.send("OK")
              }
            })
          }
        })
      }
    })
  })

  // get all participants
  .get(function(req,res){
    Participant.find(function(err, users){
      if(err){
        res.send(err)
      } else {
        res.format({
          json: function(){
            res.json(users)
          },
          html: function(){
            res.send('showing all users')
          }
        });
      }
    })
  })


// update single participant
router.route('/participant/:email')
// get single
.get(function(req,res){
  Participant.find({email: req.params.email}, function(err, user){
    if(err){
      res.status(204).send('no content')
    } else {
      res.format({
        json: function(){
          res.status(200).json(user)
        },
        html: function(){
          res.send('single user')
        }
      });
    }
  })
})

.put(function(req, res){
  Participant.findOne({email: req.params.email}, function(err, user){
    if(err){
      res.json({'message':'no user found'})
    } else {
      user.email = req.body.email
      user.save(function(err){
        if(err){
          res.send(err)
        }
        res.format({
          json: function(){
            res.send({message: 'Participant updated! New email : ' + user.email})
          },
          html: function(){
            res.send('updated')
          }
        })
      })
    }
  })
})

// delete single participant
router.route('/participant?')
.delete(function(req,res){
  Participant.remove({
      email: req.query.email
      },
      function(err, temp){
        if(err){
          res.send("error")
        }
        res.format({
          json: function(){
            res.send({message: 'Participant deleted : '})
          },
          html: function(){
            res.send('deleted')
          }
        })
      }
    )
  })

module.exports = router;
