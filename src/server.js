import express from 'express'

import cors from 'cors'

const PORT = process.env.PORT || 3000;

const app = express()

let exercises = [
        {
            id: crypto.randomUUID(),
            name: "From Server",
            musclePart: "Back",
            type: "Machine"
        },
        {
            id: crypto.randomUUID(),
            name: "Lat Pulldown",
            musclePart: "Back",
            type: "Machine"
        },
    ]

let currentSession = null;

app.use(cors({
    origin: ['http://localhost:5173', 'https://optymal.vercel.app']
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Putanginamo')
})

app.get('/exercises', (req, res) => {
    res.json(exercises)
})

app.post('/exercises', (req, res) => {
    const {name, musclePart, type} = req.body
    const exercise = {
        id: crypto.randomUUID(),
        name,
        musclePart,
        type,
    };

    if (!name || !musclePart || !type) {
        res.status(400).json({ error: 'Missing required fields!'})
    }

    console.log("Received: ", exercise);

    exercises.push(exercise)

    res.status(201).json({ message: "Data received!", data: exercise});
})

app.put('/exercises/:id', (req, res) => {
    const { newName, newMusclePart, newType } = req.body;
    const id = req.params.id
    if (!newName || !newMusclePart || !newType) {
        return res.status(400).json({ error: 'Missing required fields'})
    }
    const exerciseToEdit = exercises.find((ex) => ex.id === id)

    if (!exerciseToEdit) return res.status(404).json({message: 'Exercise not found.'})
    
    exercises = exercises.map((ex) => {
        if (ex.id === id) {
            return ex = {
                id: id,
                name: newName,
                musclePart: newMusclePart,
                type: newType
            }
        } else {
            return ex
        }
    })

    res.status(200).json({message: 'Exercise successfully edited.', data: {
        id,
        name: newName,
        musclePart: newMusclePart,
        type: newType
    }})
})

app.get('/exercises/:id', (req, res) => {
    const id = req.params.id
    const exercise = exercises.find((ex) => ex.id === id)

    if (!exercise) return res.status(404).json({message: 'Exercise not found.'})
    res.json(exercise)
})

app.delete('/exercises/:id', (req, res) => {
    const id = req.params.id
    const exercise = exercises.find((ex) => ex.id === id)

    

    if (!exercise) return res.status(404).json({message: 'Exercise not found.'})

    exercises = exercises.filter((ex) => ex.id !== id)

    res.json({message: "Successfuly deleted: " + exercise})
})

app.get('/currentsession', (req, res) => {
    res.json(currentSession)
})

app.post('/currentsession', (req, res) => {
    console.log("Started new session.")
    currentSession = {
        "startTime": Date.now(),
        "currentExercises": []
    }

    res.status(201).json({message: "Started workout session. ", data: currentSession})      
})

app.put('/currentsession', (req, res) => {
    console.log("Update session: " + JSON.stringify(req.body))
    const { startTime, currentExercises } = req.body

    if (!startTime || !currentExercises) {
        return res.status(404).json({message: "Invalid session update."})
    }

    currentSession = {
        startTime,
        currentExercises
    }

    res.status(200).json({message: "Successful update.", data: currentSession})
})

app.listen(PORT, () => {
    console.log("The server is running.")
})