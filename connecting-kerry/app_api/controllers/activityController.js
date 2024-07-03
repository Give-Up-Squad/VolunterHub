const getActivities = async (req, res) => {
    const activities = res.body;
    try {
      
      res.status(200).send("Retrive Success");
    } catch (error) {
      res.status(401).send("Retrive Failure");
    }
  };