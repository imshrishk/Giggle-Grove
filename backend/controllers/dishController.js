const Dish = require("../models/Dish");

const fetchAllDishes = async () => {
    return await Dish.find().lean();
};

const fetchDishById = async (id) => {
    return await Dish.findById(id).lean();
};

exports.getDishes = async (req, res) => {
    try {
        const dishes = await fetchAllDishes();
        res.status(200).json(dishes);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: false,
            message: "Error Fetching Dishes",
        });
    }
};

exports.getDishById = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await fetchDishById(id);

        if (!dish) {
            return res.status(404).json({
                status: false,
                error: "Dish Not Found",
                message: `No dish found with ID ${id}`,
            });
        }

        res.status(200).json({
            status: true,
            data: dish,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            error: err.message,
            message: "Error retrieving the dish by ID.",
        });
    }
};