export const conveyorAPI =
  process.env.NODE_ENV === "production"
    ? "https://raa-conveyor.herokuapp.com/api"
    : "http://localhost:4000/api"

export const pingbackAddress =
  process.env.NODE_ENV === "production"
    ? "https://raa-scotty.herokuapp.com/api/pingback"
    : "http://localhost:3030/api/pingback"
