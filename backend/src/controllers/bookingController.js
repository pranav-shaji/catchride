import Booking from "../models/bookingModels.js"
import Ride from "../models/riderModels.js"
import User from "../models/userModels.js"


export const bookRideImmediate = async (req, res) => {
  try {
    const travellerId = req.user._id;
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({ message: "rideId required" });
    }

    // get the ride
    const ride = await Ride.findById(rideId).populate("riderId", "name phone");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // ONLY THIS CHECK IS ENOUGH for option A
    if (!ride.isActive || ride.status !== "available") {
      return res.status(400).json({ message: "Ride not available" });
    }

    // get traveller
    const traveller = await User.findById(travellerId).select("name phone");

    // update ride to matched
    ride.travellerId = travellerId;
    ride.status = "matched";
    ride.isActive = false;
    await ride.save();

    return res.json({
      success: true,
      message: "Ride booked successfully",
      rider: {
        id: ride.riderId._id,
        name: ride.riderId.name,
        phone: ride.riderId.phone
      },
      traveller: {
        id: traveller._id,
        name: traveller.name,
        phone: traveller.phone
      },
      rideId: ride._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};