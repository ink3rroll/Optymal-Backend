import express from 'express'

import cors from 'cors'

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors({
    origin: ['http://localhost:5173/', 'https://optymal.vercel.app/']
}))

app.get('/', (req, res) => {
    res.send('Putanginamo')
})

app.get('/exercises', (req, res) => {
    res.json([
        {
            name: "From Server",
            musclePart: "Back",
            type: "Machine"
        },
        {
            name: "Lat Pulldown",
            musclePart: "Back",
            type: "Machine"
        },

        {
            name: "Bench Press",
            musclePart: "Chest",
            type: "Barbell"
        },

        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Shoulder Press",
            musclePart: "Shoulders",
            type: "Machine"
        },
        {
            name: "Stiff Leg Deadlift",
            musclePart: "Hamstrings",
            type: "Barbell"
        },
        {
            name: "Wide Grip Rows",
            musclePart: "Upper Back",
            type: "Machine"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
    ])
})

app.get('/exercises/:name', (req, res) => {
    const name = req.params.name
    const exercises = [
        {
            name: "Lat Pulldown",
            musclePart: "Back",
            type: "Machine"
        },

        {
            name: "Bench Press",
            musclePart: "Chest",
            type: "Barbell"
        },

        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Shoulder Press",
            musclePart: "Shoulders",
            type: "Machine"
        },
        {
            name: "Stiff Leg Deadlift",
            musclePart: "Hamstrings",
            type: "Barbell"
        },
        {
            name: "Wide Grip Rows",
            musclePart: "Upper Back",
            type: "Machine"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
        {
            name: "Lateral Raises",
            musclePart: "Shoulders",
            type: "Cable"
        },
    ]

    res.json(exercises.find((exercise) => name.toLowerCase() === exercise.name.toLowerCase()))
})

app.listen(PORT, () => {
    console.log("The server is running.")
})