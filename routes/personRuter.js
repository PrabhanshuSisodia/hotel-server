const express = require('express')
const router = express.Router();
const Person = require("../models/Person.js");


// POST route to add a person
router.post('/', async (req, res) => {

  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person using Mongoose model
    const newPerson = new Person(data);

    // Save the newPerson in the database

    const response = await newPerson.save()
    console.log("data saved");
    res.status(200).json(response)
  
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"})
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Person.find()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Cannot get data, server error"})
  }
})


//for Person with Work
router.get('/:workType', async (req, res) => {
  try {
    
    const workType = req.params.workType; //extract the work type 
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
      const response = await Person.find({ work: workType })
      console.log('response fetched');
      res.status(200).send(response)
    } else {
      res.status(404).send("404 Not found")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'cannot fetch work...'})
  }
})

// Update - PUT
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true // Run Mongoose validators
        })

        if (!updatedPersonData) {
            return res
              .status(404)
              .json({ error: "404 error, cannot update" });
        }
        console.log('data uploaded');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Cannot update data"})
    }
})

// Delete - DELETE
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        // Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
          return res.status(404).json({ error: "Person not found" });
        }

        console.log("deleted person data");
        res.status(200).json({message: "Person deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error', error)
    }
})

module.exports = router;