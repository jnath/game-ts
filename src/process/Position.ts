
import { Container } from 'pixi.js';

enum ResizeType {
  COVER,
  CONTAIN
}

export default class Position {

  static cover(container: Container, child: Container) {
    this.targetResize(ResizeType.COVER, container, child);
  }

  static contain(container: Container, child: Container) {
    this.targetResize(ResizeType.CONTAIN, container, child);
  }

  private static targetResize(type: ResizeType, container: Container, child: Container ) {
    let mathFunc: Function = type === ResizeType.COVER ? Math.max.bind(Math) : Math.min.bind(Math);

    let r: number = mathFunc(container.width / child.width, container.height / child.height);
    child.width = child.width * r;
    child.height = child.height * r;

    child.x = ( container.width - child.width ) / 2;
    child.y = ( container.height - child.height ) / 2;
  }

}