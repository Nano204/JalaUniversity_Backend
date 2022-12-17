import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { Direction, Position } from "../../domain/types/types";
import RandomNumberSupportService from "../support/RandomNumberUnitOfWorkService";
import { NodeDomain } from "../../domain/entities/NodeDomain";
import { SnakeBehaviorServiceInterface } from "./SnakeBehaviorServiceInterface";

const randomNumber = new RandomNumberSupportService().randomNumber;
export default class SnakeBehaviorService implements SnakeBehaviorServiceInterface {
  changeDirection(snake: SnakeDomain, direction: Direction): void {
    if (
      !(
        (snake.direction == Direction.Up && direction == Direction.Down) ||
        (snake.direction == Direction.Down && direction == Direction.Up) ||
        (snake.direction == Direction.Left && direction == Direction.Right) ||
        (snake.direction == Direction.Right && direction == Direction.Left)
      )
    ) {
      snake.direction = direction;
    }
  }

  moveFollowingNodes(nodes: NodeDomain, position: Position): void {
    const nextPosition = nodes.position;
    nodes.position = position;
    if (nodes.node) {
      this.moveFollowingNodes(nodes.node, nextPosition);
    }
  }

  getLastNodePosition(snake: SnakeDomain): Position {
    let nextPosition: Position;
    if (!snake.nodes) {
      nextPosition = snake.head;
    } else {
      nextPosition = this.findLastNode(snake.nodes).position;
    }
    return nextPosition;
  }

  findLastNode(nodes: NodeDomain): NodeDomain {
    if (nodes.node) {
      return this.findLastNode(nodes.node);
    } else {
      return nodes;
    }
  }

  setShadow(snake: SnakeDomain, shadow: Position): void {
    snake.shadow = shadow;
  }

  moveStep(snake: SnakeDomain, boundary: number): void {
    this.setShadow(snake, this.getLastNodePosition(snake));
    let { x, y } = snake.head;
    const followingNodesNextPosition = snake.head;
    if (snake.direction == Direction.Up) {
      y = y < boundary ? ++y : 0;
    } else if (snake.direction == Direction.Down) {
      y = y > 0 ? --y : boundary;
    } else if (snake.direction == Direction.Right) {
      x = x < boundary ? ++x : 0;
    } else if (snake.direction == Direction.Left) {
      x = x > 0 ? --x : boundary;
    }
    snake.head = { x, y };
    if (snake.nodes) {
      this.moveFollowingNodes(snake.nodes, followingNodesNextPosition);
    }
  }

  growUp(snake: SnakeDomain): void {
    if (!snake.shadow) throw new Error("Not shadow");
    ++snake.length;
    const newNode: NodeDomain = {
      position: snake.shadow,
      node: null,
    };
    if (!snake.nodes) {
      snake.nodes = newNode;
    } else {
      const lastNode = this.findLastNode(snake.nodes);
      lastNode.node = newNode;
    }
  }

  setHeadPosition(snake: SnakeDomain, boundary: number): void {
    snake.head = { x: randomNumber(boundary), y: randomNumber(boundary) };
  }

  killSnake(snake: SnakeDomain): void {
    snake.status = "Death";
  }
}
