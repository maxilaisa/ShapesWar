import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';
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
import { Nonagon } from './Nonagon';
import { Polygon } from './Polygon';
import { SHAPES_DATA } from '../data/shapes';

export class ShapeFactory {
  static createShape(id: string, type: ShapeType): Shape {
    const shapeData = SHAPES_DATA.find(s => s.type === type);
    const stats = shapeData?.stats || { hp: 100, dmg: 100, def: 100, spd: 100 };

    switch (type) {
      case 'circle':
        return new Circle(id, stats);
      case 'triangle':
        return new Triangle(id, stats);
      case 'square':
        return new Square(id, stats);
      case 'oval':
        return new Oval(id, stats);
      case 'hexagon':
        return new Hexagon(id, stats);
      case 'spiral':
        return new Spiral(id, stats);
      case 'rhombus':
        return new Rhombus(id, stats);
      case 'star':
        return new Star(id, stats);
      case 'heart':
        return new Heart(id, stats);
      case 'diamond':
        return new Diamond(id, stats);
      case 'crescent':
        return new Crescent(id, stats);
      case 'dodecahedron':
        return new Dodecahedron(id, stats);
      case 'nonagon':
        return new Nonagon(id, stats);
      case 'polygon':
        return new Polygon(id, stats);
      default:
        return new Circle(id, stats);
    }
  }
}
