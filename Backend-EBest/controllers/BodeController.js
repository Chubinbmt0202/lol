const BodeModel = require("../model/BodeModel");

const addBodeThuCong = async (req, res) => {
    const newBode = req.body;
    console.log("New Bode:", newBode);  
    try {
        const results = await BodeModel.addBodeThuCong(newBode);
        res.status(200).json({ message: 'Bode đã được thêm thành công' });
        console.log("Results:", results);
        return;
    } catch (err) {
        console.error("Error in addBodeThuCong:", err);
        return res.status(500).json({ message: "An unexpected error occurred", err });
    }
}

const layBodeTheoIdCourse = async (req, res) => {
    const {id} = req.params;
    console.log("Id Course:", id);
    try {
        const results = await BodeModel.layBodeTheoIdCourse(id);
        res.status(200).json(results);
        console.log("Results:", results);
        return;
    } catch (err) {
        console.error("Error in layBodeTheoIdCourse:", err);
        return res.status(500).json({ message: "An unexpected error occurred", err });
    }
}

const layCauHoiTheoBodeController = async (req, res) => {
    const {id} = req.params;
    console.log("Id bode:", id);
    try {
        const results = await BodeModel.layCauHoiTheoBode(id);
        res.status(200).json(results);
        console.log("Results:", results);
        return;
    } catch (err) {
        console.error("Error in layBodeTheoIdCourse:", err);
        return res.status(500).json({ message: "An unexpected error occurred", err });
    }
}

module.exports = {
    addBodeThuCong,
    layBodeTheoIdCourse,
    layCauHoiTheoBodeController
}