import Game from "../models/Game.js";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games" });
  }
};

export const addGame = async (req, res) => {
  const { title, description, difficulty } = req.body;
  try {
    const newGame = await Game.create({ title, description, difficulty });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: "Error adding game" });
  }
};
