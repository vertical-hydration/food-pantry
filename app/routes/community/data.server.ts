const getOpenPrograms = async () => {
  const programs = [
    {
      id: 1,
      name: "Food Pantry Box",
      description: "For reserving food box pickups",
    },
    {
      id: 2,
      name: "Drive Thru Events",
      description: "For occasionally monthly drive thru events",
    },
  ];

  return { programs };
};

export { getOpenPrograms };
