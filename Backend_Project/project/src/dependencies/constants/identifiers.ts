const SERVICE_IDENTIFIER = {
  USER_SERVICE: Symbol.for("User_service"),
  USER_DB_REPOSITORY: Symbol.for("User_DB_repository"),
  BOARD_DB_REPOSITORY: Symbol.for("Board_DB_repository"),
  BOARD_SERVICE: Symbol.for("Board_service"),
  SNAKE_DB_REPOSITORY: Symbol.for("Snake_DB_repository"),
  SNAKE_SERVICE: Symbol.for("Snake_service"),
};

export default SERVICE_IDENTIFIER;
