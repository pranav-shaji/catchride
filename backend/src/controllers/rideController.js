import Ride from "../models/riderModels.js"


//post a ride 
export const createRide = async(req,res)=>{
    try {
        const {startLocation ,endLocation}=req.body;
        const ride = await Ride.create({
            riderId:req.user._id,
            startLocation,
            endLocation

        });
        res.json(ride)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
};

//traveller searches for a ride

export const searchRides = async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.query;

    // Convert safely
    const sLat = Number(startLat);
    const sLng = Number(startLng);
    const eLat = Number(endLat);
    const eLng = Number(endLng);

    // Validate numbers
    if (
      isNaN(sLat) ||
      isNaN(sLng) ||
      isNaN(eLat) ||
      isNaN(eLng)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates. Use numeric lat/lng values.",
      });
    }

    const rides = await Ride.find({
      isActive: true,
      "startLocation.lat": { $gt: sLat - 0.1, $lt: sLat + 0.1 },
      "startLocation.lng": { $gt: sLng - 0.1, $lt: sLng + 0.1 },
      "endLocation.lat": { $gt: eLat - 0.1, $lt: eLat + 0.1 },
      "endLocation.lng": { $gt: eLng - 0.1, $lt: eLng + 0.1 },
    });

    res.json({
      success: true,
      results: rides.length,
      rides,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const confirmRide = async (req, res) => {
  try {
    const rideId = req.params.id;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    return res.json({
      success: true,
      ride
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
