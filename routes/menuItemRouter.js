const express = require('express')
const router = express.Router();

const MenuItem = require("../models/MenuItem.js");
// const { route } = require('./personRuter.js');

// for Menu

router.post('/', async (req, res) => {

  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save()
    console.log("Menu saved");
    res.status(200).json(response)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Menu can't saved, Internal error...."})
  }
})


router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find()
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Cannot give menu, Internal error..."})
  }
})

router.get('/:taste', async (req, res) => {
    try {
        const typeOfTaste = req.params.taste;
        if (typeOfTaste === 'spicy' || typeOfTaste === 'sweet' || typeOfTaste === 'sour') {
            const response = await MenuItem.find({ taste: typeOfTaste })
            console.log('menuItem taste fetched');
            res.status(200).send(response)
        } else {
            console.log('cannot fetch menuTem taste');
            res.status(404).send('404 Not found')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error, cannot fetch"})
    }
})


//update
router.put('/:id', async(req, res) =>{
    try {
        const itemId = req.params.id;
        const updatedMenuData = req.body

        const response = await MenuItem.findByIdAndUpdate(itemId, updatedMenuData, {
            new: true,
            runValidators: true
        });

        if (!updatedMenuData) {
            res.status(404).json({message: "404 error cannot update"})
        }

        console.log("data uploaded");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Cannot update data" });
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
    
        const response = await MenuItem.findByIdAndDelete(menuId);
    
        if (!response) {
          return res.status(404).json({ error: "Person not found" });
        }
    
        console.log("deleted menu data");
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error", error);
    }
})

module.exports = router