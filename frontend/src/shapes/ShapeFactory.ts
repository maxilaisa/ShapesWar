import { Shape } from './Shape';
import { Circle } from './Circle';
import { Triangle } from './Triangle';
import { Square } from './Square';
import { Oval } from './Oval';
import { Hexagon } from './Hexagon';
import { Spiral } from './Spiral';
import { Rhombus } from './Rhombus';
import { Star } from './Star';
import { Heart } from './Heart';
import { Diamond } from './Diamond';
import { Crescent } from './Crescent';
import { Dodecahedron } from './Dodecahedron';
import { ShapeType } from '../types';

export class ShapeFactory {
  static createShape(id: string, type: ShapeType): Shape {
    switch (type) {
      case 'circle':
        return new Circle(id);
      case 'triangle':
        return new Triangle(id);
      case 'square':
        return new Square(id);
      case 'oval':
        return new Oval(id);
      case 'hexagon':
        return new Hexagon(id);
      case 'spiral':
        return new Spiral(id);
      case 'rhombus':
        return new Rhombus(id);
      case 'star':
        return new Star(id);
      case 'heart':
        return new Heart(id);
      case 'diamond':
        return new Diamond(id);
      case 'crescent':
        return new Crescent(id);
      case 'dodecahedron':
        return new Dodecahedron(id);
      default:
        return new Circle(id);
    }
  }
}
