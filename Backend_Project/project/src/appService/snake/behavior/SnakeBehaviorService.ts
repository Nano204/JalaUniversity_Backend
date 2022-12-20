import { SnakeDomain } from "../../../domain/entities/SnakeDomain";
import { Direction, Position } from "../../../domain/types/types";
import RandomNumberSupportService from "../../support/RandomNumberUnitOfWorkService";
import { NodeDomain } from "../../../domain/entities/NodeDomain";
import { SnakeBehaviorServiceInterface } from "./SnakeBehaviorServiceInterface";

const randomNumber = new RandomNumberSupportService().randomNumber;
export default class SnakeBehaviorService implements SnakeBehaviorServiceInterface {
  private snake: SnakeDomain;

  constructor(snake: SnakeDomain) {
    this.snake = snake;
  }

  setOwner(ownerId: number): void {
    this.snake.ownerId = ownerId;
  }

  changeDirection(direction: Direction): void {
    if (
      !(
        (this.snake.direction == Direction.Up && direction == Direction.Down) ||
        (this.snake.direction == Direction.Down && direction == Direction.Up) ||
        (this.snake.direction == Direction.Left && direction == Direction.Right) ||
        (this.snake.direction == Direction.Right && direction == Direction.Left)
      )
    ) {
      this.snake.direction = direction;
    }
  }

  moveFollowingNodes(nodes: NodeDomain, position: Position): void {
    const nextPosition = nodes.position;
    nodes.position = position;
    if (nodes.node) {
      this.moveFollowingNodes(nodes.node, nextPosition);
    }
  }

  getLastNodePosition(): Position {
    let nextPosition: Position;
    if (!this.snake.nodes) {
      nextPosition = this.snake.head;
    } else {
      nextPosition = this.findLastNode(this.snake.nodes).position;
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

  setShadow(shadow: Position): void {
    this.snake.shadow = shadow;
  }

  moveStep(boundary: number): void {
    this.setShadow(this.getLastNodePosition());
    let { x, y } = this.snake.head;
    const followingNodesNextPosition = this.snake.head;
    if (this.snake.direction == Direction.Up) {
      y = y < boundary ? ++y : 0;
    } else if (this.snake.direction == Direction.Down) {
      y = y > 0 ? --y : boundary;
    } else if (this.snake.direction == Direction.Right) {
      x = x < boundary ? ++x : 0;
    } else if (this.snake.direction == Direction.Left) {
      x = x > 0 ? --x : boundary;
    }
    this.snake.head = { x, y };
    if (this.snake.nodes) {
      this.moveFollowingNodes(this.snake.nodes, followingNodesNextPosition);
    }
  }

  growUp(): void {
    if (!this.snake.shadow) throw new Error("Not shadow");
    ++this.snake.length;
    const newNode: NodeDomain = {
      position: this.snake.shadow,
      node: null,
    };
    if (!this.snake.nodes) {
      this.snake.nodes = newNode;
    } else {
      const lastNode = this.findLastNode(this.snake.nodes);
      lastNode.node = newNode;
    }
  }

  setHeadPosition(boundary: number): void {
    this.snake.head = { x: randomNumber(boundary), y: randomNumber(boundary) };
  }

  killSnake(): void {
    this.snake.status = "Death";
  }

  getNodePostionArray(nodes: NodeDomain): number[][] {
    if (nodes.node) {
      const { x, y } = nodes.position;
      const position = [x, y];
      return [position, ...this.getNodePostionArray(nodes.node)];
    } else {
      const { x, y } = nodes.position;
      return [[x, y]];
    }
  }
}
