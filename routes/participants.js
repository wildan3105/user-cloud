var express     = require('express')
var app         = express()
var Participant = require('../models/participant')
var router      = express.Router()

router.get('/', function(req,res){
  res.json({message: 'Welcome to userCloud API'})
})

router.use(function(req, res, next){
  // console out
  console.log('something is happening')
  next() // go to next route and not stop here
})

router.route('/participants')
  // post single participant
  .post(function(req,res){
    var user = new Participant()
    user.email    = req.body.email
    user.password = req.body.password

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
.put(function(req, res){
  Participant.findOne({email: req.params.email}, function(err, user){
    if(err){
      res.send(err)
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
