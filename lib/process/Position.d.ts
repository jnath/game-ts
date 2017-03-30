import { Container } from 'pixi.js';
export default class Position {
    static cover(container: Container, child: Container): void;
    static contain(container: Container, child: Container): void;
    private static targetResize(type, container, child);
}
