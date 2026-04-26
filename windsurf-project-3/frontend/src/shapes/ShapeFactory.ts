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
  static createShape(id: string, shapeType: ShapeType): Shape {
    switch (shapeType) {
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

  static getShapeColor(shapeType: ShapeType): number {
    const colors: Record<ShapeType, number> = {
      circle: 0xffffff,
      triangle: 0xff6b6b,
      square: 0x4ecdc4,
      oval: 0xffe66d,
      hexagon: 0x95e1d3,
      spiral: 0xf38181,
      rhombus: 0xaa96da,
      star: 0xfcbad3,
      heart: 0xff69b4,
      diamond: 0x00bfff,
      crescent: 0xc9b1ff,
      dodecahedron: 0xffd700
    };
    return colors[shapeType] || 0xffffff;
  }
}
